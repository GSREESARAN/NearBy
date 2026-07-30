const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const rateLimit = require('express-rate-limit')

const JWT_SECRET = process.env.JWT_SECRET;

// Compares two strings in constant time to avoid leaking match-length
// via response timing. Returns false safely if lengths differ.
function timingSafeCompare(a, b) {
  const bufA = Buffer.from(String(a ?? ''));
  const bufB = Buffer.from(String(b ?? ''));
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

// Limits brute-force attempts against admin credentials/PIN.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many attempts. Please try again in 15 minutes.' },
});

// POST /api/auth/login — username + password
router.post('/login', authLimiter, (req, res) => {
  const { username, password } = req.body;

  if (
    timingSafeCompare(username, process.env.ADMIN_USERNAME) &&
    timingSafeCompare(password, process.env.ADMIN_PASSWORD)
  ) {
    const token = jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: '24h' });
    return res.json({ success: true, token });
  }

  res.status(401).json({ success: false, message: 'Invalid username or password' });
});

// POST /api/auth/pin — PIN login
router.post('/pin', authLimiter, (req, res) => {
  const { pin } = req.body;

  if (timingSafeCompare(pin, process.env.ADMIN_PIN)) {
    const token = jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: '24h' });
    return res.json({ success: true, token });
  }

  res.status(401).json({ success: false, message: 'Invalid PIN' });
});

// POST /api/auth/verify — check if token is valid
router.post('/verify', (req, res) => {
  const { token } = req.body;

  try {
    jwt.verify(token, JWT_SECRET);
    res.json({ success: true });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
});

module.exports = router;