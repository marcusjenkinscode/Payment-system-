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
   git clone https://github.com/marcusjenkinscode/Payment-system-.git
   cd Payment-system-
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```
   Server runs on <http://localhost:3000> by default.

## API Endpoints

### `POST /payments`

Create a new payment.

Request body (JSON):

```json
{
  "amount": 199.99,
  "currency": "USD",
  "payer": "john_doe",
  "payee": "merchant_123"
}
```

Response (201 Created):

```json
{
  "id": "uuid-v4",
  "amount": 199.99,
  "currency": "USD",
  "payer": "john_doe",
  "payee": "merchant_123",
  "status": "pending"
}
```

### `GET /payments/:id`

Retrieve a payment by ID.  
Response: `200 OK` with the payment object, or `404 Not Found`.

### `PUT /payments/:id`

Update the status of a payment.

Request body:

```json
{
  "status": "completed"
}
```

Response: `200 OK` with the updated payment object.

### `GET /payments`

List all payments.  
Response: `200 OK` with an array of payment objects.

## Example Usage (with curl)

```bash
# Create a payment
curl -X POST http://localhost:3000/payments \
  -H "Content-Type: application/json" \
  -d '{"amount":49.99,"currency":"EUR","payer":"alice","payee":"bob"}'

# Get all payments
curl http://localhost:3000/payments

# Get a specific payment (replace {id} with actual UUID)
curl http://localhost:3000/payments/{id}

# Update status to completed
curl -X PUT http://localhost:3000/payments/{id} \
  -H "Content-Type: application/json" \
  -d '{"status":"completed"}'
```

## Project Structure

```
.
├── controllers
│   └── paymentController.js
├── data
│   └── payments.json          (auto‑generated)
├── routes
│   └── paymentRoutes.js
├── services
│   └── paymentService.js
├── app.js
├── package.json
└── README.md
```

## Error Handling

| Status | Meaning |
|--------|---------|
| `400 Bad Request` | Invalid input (missing fields, negative amount, invalid currency, etc.) |
| `404 Not Found` | Payment ID does not exist |
| `500 Internal Server Error` | File read/write issues |

## License

MIT
   git clone https://github.com/marcusjenkinscode/json-payment-api.git
   cd json-payment-api
