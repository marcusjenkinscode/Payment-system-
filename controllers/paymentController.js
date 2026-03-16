/**
 * controllers/paymentController.js – Request / response handlers
 *
 * Each exported function corresponds to one API endpoint.
 * Business logic and data persistence are delegated to paymentService.
 */

'use strict';

const paymentService = require('../services/paymentService');

/**
 * POST /payments
 * Create a new payment.
 *
 * Expected body: { amount, currency, payer, payee }
 * Returns 201 with the created payment on success.
 */
async function createPayment(req, res, next) {
  try {
    const { amount, currency, payer, payee } = req.body;
    const payment = await paymentService.createPayment({ amount, currency, payer, payee });
    res.status(201).json(payment);
  } catch (err) {
    if (err.statusCode) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    next(err);
  }
}

/**
 * GET /payments/:id
 * Retrieve a single payment by its UUID.
 *
 * Returns 200 with the payment on success.
 * Returns 404 if no payment with the given ID exists.
 */
async function getPaymentById(req, res, next) {
  try {
    const payment = await paymentService.getPaymentById(req.params.id);
    res.json(payment);
  } catch (err) {
    if (err.statusCode) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    next(err);
  }
}

/**
 * PATCH /payments/:id
 * Update the status of an existing payment.
 *
 * Expected body: { status } where status is 'completed' or 'failed'.
 * Returns 200 with the updated payment on success.
 */
async function updatePaymentStatus(req, res, next) {
  try {
    const { status } = req.body;
    if (typeof status !== 'string' || status.trim() === '') {
      return res.status(400).json({ error: 'status is required in the request body' });
    }
    const payment = await paymentService.updatePaymentStatus(req.params.id, status);
    res.json(payment);
  } catch (err) {
    if (err.statusCode) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    next(err);
  }
}

/**
 * GET /payments
 * Return all payment records.
 *
 * Returns 200 with an array of payments (may be empty).
 */
async function listPayments(req, res, next) {
  try {
    const payments = await paymentService.listPayments();
    res.json(payments);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createPayment,
  getPaymentById,
  updatePaymentStatus,
  listPayments,
};
