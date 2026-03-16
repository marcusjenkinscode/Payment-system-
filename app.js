/**
 * app.js – Entry point for the JSON Payment API
 *
 * Initialises Express, mounts the payment routes under /payments,
 * and starts the HTTP server.
 */

'use strict';

const express = require('express');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse incoming JSON request bodies
app.use(express.json());

// Mount payment routes
app.use('/payments', paymentRoutes);

// 404 handler – no route matched
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server (skip when required by tests)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Payment API listening on port ${PORT}`);
  });
}

module.exports = app;
