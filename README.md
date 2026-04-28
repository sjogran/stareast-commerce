# StarEast Commerce API

## Description
Simple REST API for an e-commerce scenario using JavaScript and Express.  
It supports user registration, login with JWT token generation, and checkout.

## Installation
```bash
npm install
```

## How to Run
```bash
npm run dev
```
or
```bash
npm start
```

Server default URL:
`http://localhost:3000`

Swagger docs:
`http://localhost:3000/docs`

## Rules
- The API has only 4 business endpoints:
  - `POST /api/register`
  - `POST /api/login`
  - `POST /api/checkout`
  - `GET /api/healthcheck`
- Checkout accepts only:
  - `cash`
  - `credit_card`
- `cash` payment receives 10% discount.
- Only authenticated users (JWT token) can checkout.
- Data is in memory only (no database).

## Data Already Existent
### Users
- `alice@example.com` / `alice123`
- `bob@example.com` / `bob123`
- `carol@example.com` / `carol123`

### Products
- `id: 1` - T-Shirt - `50`
- `id: 2` - Sneakers - `200`
- `id: 3` - Backpack - `120`

## How to Use the Rest API
### 1) Register
`POST /api/register`
```json
{
  "name": "Dave",
  "email": "dave@example.com",
  "password": "dave123"
}
```

### 2) Login
`POST /api/login`
```json
{
  "email": "alice@example.com",
  "password": "alice123"
}
```
Response returns:
```json
{
  "token": "your-jwt-token"
}
```

### 3) Checkout (authenticated)
`POST /api/checkout`

Header:
`Authorization: Bearer <token>`

Body:
```json
{
  "productIds": [1, 3],
  "paymentMethod": "cash"
}
```

### 4) Healthcheck
`GET /api/healthcheck`
