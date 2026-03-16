const express = require('express');
const router = express.Router();
const controller = require('../controllers/paymentController');

router.post('/', controller.createPayment);
router.get('/', controller.listPayments);
router.get('/:id', controller.getPayment);
router.put('/:id', controller.updatePayment);

module.exports = router;
