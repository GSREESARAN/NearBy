const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PATCH'],
  credentials: true
}));
app.use(express.json());

// WhatsApp Client Setup
const whatsappClient = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

// Show QR code in terminal
whatsappClient.on('qr', (qr) => {
  console.log('📱 Scan this QR code with your WhatsApp:');
  qrcode.generate(qr, { small: true });
});

// When WhatsApp is ready
// When WhatsApp is ready
whatsappClient.on('ready', () => {
  console.log('✅ WhatsApp connected successfully!');
  app.set('whatsappReady', true);
});

// When auth fails
whatsappClient.on('auth_failure', (msg) => {
  console.error('❌ WhatsApp auth failed:', msg);
});

// Initialize WhatsApp
whatsappClient.initialize();

// Export client so routes can use it
app.set('whatsappClient', whatsappClient);

// Routes
const ordersRouter = require('./routes/orders');
app.use('/api/orders', ordersRouter);

const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);

// Test route
app.get('/', (req, res) => {
  res.json({ message: '✅ NearBy backend is running!' });
});

// Start server
const PORT = process.env.PORT || 3000;

// Test WhatsApp message route
app.get('/test-whatsapp', async (req, res) => {
  try {
    const isReady = req.app.get('whatsappReady');
    if (!isReady) {
      return res.json({ success: false, message: 'WhatsApp not ready yet, wait a few seconds and try again' });
    }

    const client = req.app.get('whatsappClient');
    const number = '918008753839@c.us'; // ← your personal number here
    
    await client.sendMessage(number, '✅ NearBy WhatsApp is working!');
    res.json({ success: true, message: 'WhatsApp message sent!' });
  } catch (error) {
    console.error('WhatsApp error:', error);
    res.json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});