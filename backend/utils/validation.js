// Validates order submission data before it reaches the database.
// Returns an array of error messages — empty array means valid.
function validateOrderPayload({ name, phone, shop, items, address }) {
  const errors = [];

  if (!name?.trim()) {
    errors.push('Name is required.');
  } else if (name.trim().length > 100) {
    errors.push('Name is too long (max 100 characters).');
  }

  const digits = (phone || '').replace(/\D/g, '');
  if (digits.length !== 10) {
    errors.push('Phone number must be a valid 10-digit number.');
  }

  if (!shop?.trim()) {
    errors.push('Shop name is required.');
  } else if (shop.trim().length > 150) {
    errors.push('Shop name is too long (max 150 characters).');
  }

  if (!items?.trim()) {
    errors.push('Order items are required.');
  } else if (items.trim().length > 500) {
    errors.push('Order details are too long (max 500 characters).');
  }

  if (!address?.trim()) {
    errors.push('Delivery address is required.');
  } else if (address.trim().length > 300) {
    errors.push('Address is too long (max 300 characters).');
  }

  return errors;
}

module.exports = { validateOrderPayload };