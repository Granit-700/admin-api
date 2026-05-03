# admin-api
Backend API for tourism website

## Stack
- Node.js
- Express
- Mongoose
- MongoDB Atlas

## Features
- CRUD for tours

## How to start it

### Install
```bash
npm i
```

### Create ".env" file:
```.env
PORT=3000 # (or any port)
DB_URI=your_mongodb_connection_string
```

### Run Dev
```bash
npm run dev
```

### Run Prod
```bash
npm start
```

## Endpoints API

```
GET /api/tours
GET /api/tours/:id
POST /api/tours
PATCH /api/tours/:id
DELETE /api/tours/:id
```
