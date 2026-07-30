const { sendSMS } = require('../../sms');

module.exports = {
  async orderPlaced(order) {
    const managerMsg = `New Order - NearBy! Name: ${order.name}, Phone: ${order.phone}, Shop: ${order.shop}, Items: ${order.items}, Address: ${order.address}. Login to dashboard to confirm.`;

    return sendSMS(process.env.MANAGER_PHONE, managerMsg);
  },

  async orderConfirmed(order) {
    const customerMsg = `Hi ${order.name}! Your order has been confirmed by NearBy. Shop: ${order.shop}, Items: ${order.items}. Our delivery boy is on the way! Please keep cash/UPI ready. Thank you!`;

    return sendSMS(order.phone, customerMsg);
  },

  async orderDelivered(order) {
    const customerMsg = `Hi ${order.name}! Your order has been delivered by NearBy. Please pay the delivery boy. Thank you for using NearBy!`;

    return sendSMS(order.phone, customerMsg);
  },
};