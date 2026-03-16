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
      await writePayments([]);
      return [];
    }
    throw err;
  }
}

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
  await writePayments(payments);
  return payments[index];
}

async function listPayments() {
  return readPayments();
}

module.exports = { createPayment, getPaymentById, updatePaymentStatus, listPayments };
