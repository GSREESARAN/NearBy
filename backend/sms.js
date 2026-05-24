const axios = require('axios');

const API_KEY = process.env.HTTPSMS_API_KEY;
const PHONE = process.env.HTTPSMS_PHONE;

async function sendSMS(phone, message) {
  // Clean phone number — remove +91, spaces, dashes
  const cleanPhone = phone.replace(/\D/g, '').slice(-10);
  const formattedPhone = `+91${cleanPhone}`;

  try {
    const response = await axios.post(
      'https://api.httpsms.com/v1/messages/send',
      {
        content: message,
        from: PHONE,
        to: formattedPhone
      },
      {
        headers: {
          'x-api-key': API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('✅ SMS sent successfully:', response.data);
    return true;
  } catch (error) {
    console.error('❌ SMS error:', error.response?.data || error.message);
    return false;
  }
}

module.exports = { sendSMS };