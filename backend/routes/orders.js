const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const { sendSMS } = require('../sms');

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

  if (!name || !phone || !shop || !items || !address) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([{
        name, phone, shop, items, address, status: 'pending'
      }])
      .select();

    if (error) throw error;

    const order = data[0];

    // SMS to manager
    const managerMsg = `New Order - NearBy! Name: ${name}, Phone: ${phone}, Shop: ${shop}, Items: ${items}, Address: ${address}. Login to dashboard to confirm.`;
    await sendSMS(MANAGER_PHONE, managerMsg);

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      order
    });

  } catch (error) {
    console.error('Full error:', JSON.stringify(error, null, 2));
    res.status(500).json({
      success: false,
      message: 'Failed to save order. Try again.',
      debug: error.message
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
    console.error('Supabase error:', JSON.stringify(error));
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
    const customerMsg = `Hi ${order.name}! Your order has been confirmed by NearBy. Shop: ${order.shop}, Items: ${order.items}. Our delivery boy is on the way! Please keep cash/UPI ready. Thank you!`; await sendSMS(order.phone, customerMsg);

    res.json({ success: true, message: 'Order confirmed!', order });

  } catch (error) {
    console.error('Confirm error:', JSON.stringify(error));
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
    const customerMsg = `Hi ${order.name}! Your order has been delivered by NearBy. Please pay the delivery boy. Thank you for using NearBy!`;
    await sendSMS(order.phone, customerMsg);

    res.json({ success: true, message: 'Order delivered!', order });

  } catch (error) {
    console.error('Delivered error:', JSON.stringify(error));
    res.status(500).json({ success: false, message: 'Failed to update order.' });
  }
});

module.exports = router;