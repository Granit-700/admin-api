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
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=cloudinary_cloud_name
CLOUDINARY_API_KEY=cloudinary_api_key
CLOUDINARY_API_SECRET=cloudinary_api_secret
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

### Tours

```
GET /api/tours
GET /api/tours/:id
POST /api/tours
PATCH /api/tours/:id
DELETE /api/tours/:id
```

### Auth

```
POST /api/auth/login
POST /api/auth/me
```
