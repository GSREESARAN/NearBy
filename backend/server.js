const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Trust the first proxy hop (Render sits behind one) so express-rate-limit
// reads the real client IP instead of the proxy's internal address.
app.set('trust proxy', 1);

// Middleware
app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500', 'https://near-by-blush.vercel.app', 'https://nearby-backend-pkni.onrender.com'],
  methods: ['GET', 'POST', 'PATCH'],
  credentials: true
}));
app.use(express.json());

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
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});