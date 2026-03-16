const express = require('express');
const router = express.Router();
const controller = require('../controllers/paymentController');

router.post('/', controller.createPayment);
router.get('/', controller.listPayments);
router.get('/:id', controller.getPayment);
router.put('/:id', controller.updatePayment);
/**
 * routes/paymentRoutes.js – Express router for payment endpoints
 *
 * Routes:
 *   GET    /payments         – list all payments
 *   POST   /payments         – create a new payment
 *   GET    /payments/:id     – retrieve a payment by ID
 *   PATCH  /payments/:id     – update payment status
 */

'use strict';

const { Router } = require('express');
const paymentController = require('../controllers/paymentController');

const router = Router();

// List all payments
router.get('/', paymentController.listPayments);

// Create a new payment
router.post('/', paymentController.createPayment);

// Retrieve a payment by ID
router.get('/:id', paymentController.getPaymentById);

// Update payment status (completed | failed)
router.patch('/:id', paymentController.updatePaymentStatus);

module.exports = router;
