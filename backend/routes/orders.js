const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

// Connect to Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Your manager WhatsApp number (NearBy number with country code)
const MANAGER_NUMBER = '918008753839@c.us'; // ← replace this

// POST /api/orders — save new order + notify manager
router.post('/', async (req, res) => {
  const { name, phone, shop, items, address } = req.body;

  // Basic validation
  if (!name || !phone || !shop || !items || !address) {
    return res.status(400).json({ 
      success: false, 
      message: 'All fields are required' 
    });
  }

  try {
    // 1. Save order to Supabase
    const { data, error } = await supabase
      .from('orders')
      .insert([{ 
        name, 
        phone, 
        shop, 
        items, 
        address, 
        status: 'pending' 
      }])
      .select();

    if (error) throw error;

    const order = data[0];

    // 2. Send WhatsApp to manager
    try {
      const client = req.app.get('whatsappClient');
      const isReady = req.app.get('whatsappReady');

      if (client && isReady) {
        const message = 
`🛵 *New Order — NearBy*

📋 *Order ID:* ${order.id}
👤 *Name:* ${name}
📞 *Phone:* ${phone}
🏪 *Shop:* ${shop}
📦 *Items:* ${items}
📍 *Address:* ${address}

⏰ *Time:* ${new Date().toLocaleString('en-IN')}

👆 Login to dashboard to confirm.`;

        await client.sendMessage(MANAGER_NUMBER, message);
        console.log('✅ Manager notified on WhatsApp');
      }
    } catch (whatsappError) {
      console.error('WhatsApp error:', whatsappError.message);
      // Don't fail the order if WhatsApp fails
    }

    res.status(201).json({ 
      success: true, 
      message: 'Order placed successfully!', 
      order 
    });

  } catch (error) {
    console.error('Full error:', JSON.stringify(error, null, 2));
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Error details:', error.details);
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

    res.json({ 
      success: true, 
      orders: data 
    });

  } catch (error) {
    console.error('Supabase error:', JSON.stringify(error));
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch orders.' 
    });
  }
});

// PATCH /api/orders/:id/confirm — confirm order + notify customer
router.patch('/:id/confirm', async (req, res) => {
  const { id } = req.params;

  try {
    // 1. Update status in Supabase
    const { data, error } = await supabase
      .from('orders')
      .update({ status: 'confirmed' })
      .eq('id', id)
      .select();

    if (error) throw error;

    const order = data[0];

    // 2. Send WhatsApp to customer
    try {
      const client = req.app.get('whatsappClient');
      const isReady = req.app.get('whatsappReady');

      if (client && isReady) {
        const customerNumber = `91${order.phone}@s.whatsapp.net`;
        const message =
`✅ *Order Confirmed — NearBy*

Hi ${order.name}! Your order has been confirmed. 🎉

🏪 *Shop:* ${order.shop}
📦 *Items:* ${order.items}
📍 *Address:* ${order.address}

🛵 Our delivery boy is on the way!
💵 Please keep cash/UPI ready.

Thank you for using NearBy! 🙏`;

        await client.sendMessage(customerNumber, message);
        console.log('✅ Customer notified — order confirmed');
      }
    } catch (whatsappError) {
      console.error('WhatsApp error:', whatsappError.message);
    }

    res.json({ 
      success: true, 
      message: 'Order confirmed!', 
      order 
    });

  } catch (error) {
    console.error('Confirm error:', JSON.stringify(error));
    res.status(500).json({ 
      success: false, 
      message: 'Failed to confirm order.' 
    });
  }
});

// PATCH /api/orders/:id/delivered — mark delivered + notify customer
router.patch('/:id/delivered', async (req, res) => {
  const { id } = req.params;

  try {
    // 1. Update status in Supabase
    const { data, error } = await supabase
      .from('orders')
      .update({ status: 'delivered' })
      .eq('id', id)
      .select();

    if (error) throw error;

    const order = data[0];

    // 2. Send WhatsApp to customer
    try {
      const client = req.app.get('whatsappClient');
      const isReady = req.app.get('whatsappReady');

      if (client && isReady) {
        const customerNumber = `91${order.phone}@s.whatsapp.net`;
        const message =
`🎉 *Order Delivered — NearBy*

Hi ${order.name}! Your order has been delivered! 

🏪 *Shop:* ${order.shop}
📦 *Items:* ${order.items}

💵 Please pay the delivery boy.
⭐ Hope you enjoyed our service!

Thank you for using NearBy! 🙏`;

        await client.sendMessage(customerNumber, message);
        console.log('✅ Customer notified — order delivered');
      }
    } catch (whatsappError) {
      console.error('WhatsApp error:', whatsappError.message);
    }

    res.json({ 
      success: true, 
      message: 'Order marked as delivered!', 
      order 
    });

  } catch (error) {
    console.error('Delivered error:', JSON.stringify(error));
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update order.' 
    });
  }
});

module.exports = router;