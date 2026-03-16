# Payment-system-
Simple payment processing REST API built with Node.js/Express, using JSON file storage. Create, retrieve, update, and list payments with pending/completed/failed status. Perfect for learning or prototyping payment flows without a database.

# JSON Payment API

A lightweight, file‑based payment processing API built with Node.js and Express. All payment records are stored in a `payments.json` file, making it ideal for prototyping, learning, or small‑scale projects.

## Features
- ✅ Create a new payment (auto‑generated UUID, status = `pending`)
- ✅ Retrieve a payment by its unique ID
- ✅ Update payment status (`completed` or `failed`)
- ✅ List all payments
- ✅ Input validation (amount > 0, valid currency code, non‑empty payer/payee)
- ✅ Automatic JSON file creation if missing
- ✅ Clean separation of routes, controllers, and data layer

## Tech Stack
- **Node.js** (v18+)
- **Express** – web framework
- **uuid** – generate unique IDs
- **fs/promises** – async file operations

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/json-payment-api.git
   cd json-payment-api
