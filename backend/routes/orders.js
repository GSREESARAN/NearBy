const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const notify = require('../services/notifications');
const { validateOrderPayload } = require('../utils/validation');

// Connect to Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Manager number
const MANAGER_PHONE = process.env.MANAGER_PHONE;

// POST /api/orders — save new order + notify manager
router.post('/', async (req, res) => {
  const { name, phone, shop, items, address } = req.body;

  const errors = validateOrderPayload({ name, phone, shop, items, address });
  if (errors.length) {
    return res.status(400).json({
      success: false,
      message: errors[0],
      errors
    });
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([{
        name: name.trim(),
        phone: phone.trim(),
        shop: shop.trim(),
        items: items.trim(),
        address: address.trim(),
        status: 'pending'
      }])
      .select();

    if (error) throw error;

    const order = data[0];

    // SMS to manager
    await notify.orderPlaced({
      name,
      phone,
      shop,
      items,
      address,
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      order
    });

  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save order. Try again.'
    });
  }
});

// GET /api/orders — fetch all orders
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ success: true, orders: data });

  } catch (error) {
    console.error('Fetch orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders.'
    });
  }
});

// PATCH /api/orders/:id/confirm
router.patch('/:id/confirm', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ status: 'confirmed' })
      .eq('id', id)
      .select();

    if (error) throw error;

    const order = data[0];

    // SMS to customer
    await notify.orderConfirmed(order);

    res.json({ success: true, message: 'Order confirmed!', order });

  } catch (error) {
    console.error('Confirm order error:', error);
    res.status(500).json({ success: false, message: 'Failed to confirm order.' });
  }
});

// PATCH /api/orders/:id/delivered
router.patch('/:id/delivered', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ status: 'delivered' })
      .eq('id', id)
      .select();

    if (error) throw error;

    const order = data[0];

    // SMS to customer
    await notify.orderDelivered(order);

    res.json({ success: true, message: 'Order delivered!', order });

  } catch (error) {
    console.error('Delivered order error:', error);
    res.status(500).json({ success: false, message: 'Failed to update order.' });
  }
});

module.exports = router;