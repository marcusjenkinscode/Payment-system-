const { v4: uuidv4 } = require('uuid');
const fs = require('fs/promises');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'payments.json');

async function readPayments() {
  try {
    const content = await fs.readFile(DATA_FILE, 'utf8');
    try {
      return JSON.parse(content);
    } catch {
      throw new Error('Failed to parse payments.json: file may be corrupted');
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
/**
 * services/paymentService.js – Data layer
 *
 * All CRUD operations against the payments.json file are handled here.
 * Using fs/promises for non-blocking, async I/O with async/await.
 */

'use strict';

const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Path to the JSON file used as the data store
const DATA_FILE = path.join(__dirname, '..', 'payments.json');

// Valid payment statuses that may be set when updating a payment
const VALID_UPDATE_STATUSES = ['completed', 'failed'];

/**
 * Read all payments from the JSON file.
 * If the file does not exist it is created automatically with an empty array.
 *
 * @returns {Promise<Array>} Array of payment objects
 */
async function readPayments() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    try {
      return JSON.parse(raw);
    } catch {
      // File exists but contains invalid JSON – reset to an empty list
      await writePayments([]);
      return [];
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      // File does not exist yet – initialise with an empty list
      await writePayments([]);
      return [];
    }
    throw err;
  }
}

/**
 * Write the payments array back to the JSON file.
 *
 * @param {Array} payments - Array of payment objects to persist
 * @returns {Promise<void>}
 */
async function writePayments(payments) {
  await fs.writeFile(DATA_FILE, JSON.stringify(payments, null, 2), 'utf8');
}

async function createPayment({ amount, currency, payer, payee }) {
  const payments = await readPayments();
  const payment = {
    id: uuidv4(),
    amount,
    currency,
    payer,
    payee,
    status: 'pending',
  };
/**
 * Validate the fields required when creating a new payment.
 *
 * Rules:
 *  - amount  : required, must be a number greater than 0
 *  - currency: required, must be a 3-letter ISO 4217 code (e.g. USD, EUR)
 *  - payer   : required, non-empty string
 *  - payee   : required, non-empty string
 *
 * @param {object} data - Request body to validate
 * @returns {string|null} Error message, or null if all fields are valid
 */
function validatePaymentInput({ amount, currency, payer, payee }) {
  if (amount === undefined || amount === null) {
    return 'amount is required';
  }
  if (!Number.isFinite(amount) || amount <= 0) {
    return 'amount must be a number greater than 0';
  }
  if (!currency || typeof currency !== 'string') {
    return 'currency is required';
  }
  if (!/^[A-Z]{3}$/.test(currency)) {
    return 'currency must be a valid 3-letter ISO 4217 code (e.g. USD, EUR, GBP)';
  }
  if (!payer || typeof payer !== 'string' || payer.trim() === '') {
    return 'payer must be a non-empty string';
  }
  if (!payee || typeof payee !== 'string' || payee.trim() === '') {
    return 'payee must be a non-empty string';
  }
  return null;
}

/**
 * Create a new payment record.
 *
 * @param {object} data - Payment data (amount, currency, payer, payee)
 * @returns {Promise<object>} The newly created payment object
 * @throws {Error} with .statusCode = 400 if validation fails
 */
async function createPayment({ amount, currency, payer, payee }) {
  const validationError = validatePaymentInput({ amount, currency, payer, payee });
  if (validationError) {
    const err = new Error(validationError);
    err.statusCode = 400;
    throw err;
  }

  const payments = await readPayments();
  const now = new Date().toISOString();

  const payment = {
    id: uuidv4(),
    amount,
    currency: currency.toUpperCase(),
    payer: payer.trim(),
    payee: payee.trim(),
    status: 'pending',
    createdAt: now,
    updatedAt: now,
  };

  payments.push(payment);
  await writePayments(payments);
  return payment;
}

async function getPaymentById(id) {
  const payments = await readPayments();
  return payments.find((p) => p.id === id) || null;
}

async function updatePaymentStatus(id, status) {
  const payments = await readPayments();
  const index = payments.findIndex((p) => p.id === id);
  if (index === -1) return null;
  payments[index].status = status;
/**
 * Retrieve a single payment by its UUID.
 *
 * @param {string} id - Payment UUID
 * @returns {Promise<object>} The matching payment object
 * @throws {Error} with .statusCode = 404 if not found
 */
async function getPaymentById(id) {
  const payments = await readPayments();
  const payment = payments.find((p) => p.id === id);
  if (!payment) {
    const err = new Error(`Payment with id '${id}' not found`);
    err.statusCode = 404;
    throw err;
  }
  return payment;
}

/**
 * Update the status of an existing payment.
 *
 * Only 'completed' and 'failed' are accepted as target statuses.
 *
 * @param {string} id     - Payment UUID
 * @param {string} status - New status ('completed' or 'failed')
 * @returns {Promise<object>} The updated payment object
 * @throws {Error} with .statusCode = 400 for invalid status
 * @throws {Error} with .statusCode = 404 if payment not found
 */
async function updatePaymentStatus(id, status) {
  if (typeof status !== 'string' || !VALID_UPDATE_STATUSES.includes(status)) {
    const err = new Error(
      `Invalid status '${status}'. Allowed values: ${VALID_UPDATE_STATUSES.join(', ')}`
    );
    err.statusCode = 400;
    throw err;
  }

  const payments = await readPayments();
  const index = payments.findIndex((p) => p.id === id);

  if (index === -1) {
    const err = new Error(`Payment with id '${id}' not found`);
    err.statusCode = 404;
    throw err;
  }

  payments[index] = {
    ...payments[index],
    status,
    updatedAt: new Date().toISOString(),
  };

  await writePayments(payments);
  return payments[index];
}

/**
 * Return all payment records.
 *
 * @returns {Promise<Array>} Array of all payment objects
 */
async function listPayments() {
  return readPayments();
}

module.exports = { createPayment, getPaymentById, updatePaymentStatus, listPayments };
module.exports = {
  createPayment,
  getPaymentById,
  updatePaymentStatus,
  listPayments,
};
