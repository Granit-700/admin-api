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

### Tours

```
GET /api/tours
GET /api/tours/:id
POST /api/tours
PATCH /api/tours/:id
DELETE /api/tours/:id
```

### Blogs

```
GET /api/blogs
GET /api/blogs/:id
POST /api/blogs
PATCH /api/blogs/:id
DELETE /api/blogs/:id
```

### Auth

```
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
PATCH /api/auth/me
```

## Docs

[https://admin-api-u1yx.onrender.com/api-docs/](https://admin-api-u1yx.onrender.com/api-docs/)
