const crypto = require('crypto');

/**
 * Generates a unique, human-readable registration ID (e.g. CAN-2026-AB73K)
 * @returns {string} Registration Reference
 */
const generateRegistrationId = () => {
  const randomHex = crypto.randomBytes(3).toString('hex').toUpperCase();
  const year = new Date().getFullYear();
  return `CAN-${year}-${randomHex}`;
};

module.exports = generateRegistrationId;

