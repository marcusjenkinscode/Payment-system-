const service = require('../services/paymentService');

const VALID_STATUSES = ['completed', 'failed'];
const CURRENCY_REGEX = /^[A-Z]{3}$/;

async function createPayment(req, res) {
  const { amount, currency, payer, payee } = req.body;

  if (amount === undefined || amount === null) {
    return res.status(400).json({ error: 'amount is required' });
  }
  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'amount must be a positive number' });
  }
  if (!currency || !CURRENCY_REGEX.test(currency)) {
    return res.status(400).json({ error: 'currency must be a valid 3-letter ISO code (e.g. USD)' });
  }
  if (!payer || typeof payer !== 'string' || payer.trim() === '') {
    return res.status(400).json({ error: 'payer is required' });
  }
  if (!payee || typeof payee !== 'string' || payee.trim() === '') {
    return res.status(400).json({ error: 'payee is required' });
  }

  try {
    const payment = await service.createPayment({ amount, currency, payer: payer.trim(), payee: payee.trim() });
    return res.status(201).json(payment);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to create payment' });
  }
}

async function getPayment(req, res) {
  try {
    const payment = await service.getPaymentById(req.params.id);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    return res.json(payment);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to retrieve payment' });
  }
}

async function updatePayment(req, res) {
  const { status } = req.body;

  if (!status || !VALID_STATUSES.includes(status)) {
    return res.status(400).json({ error: `status must be one of: ${VALID_STATUSES.join(', ')}` });
  }

  try {
    const payment = await service.updatePaymentStatus(req.params.id, status);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    return res.json(payment);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update payment' });
  }
}

async function listPayments(req, res) {
  try {
    const payments = await service.listPayments();
    return res.json(payments);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to list payments' });
  }
}

module.exports = { createPayment, getPayment, updatePayment, listPayments };
