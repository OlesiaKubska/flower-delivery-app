# 🌸 Flower Delivery App

Full-stack test project: flower shop platform with cart, favorites, and delivery management.  
Built with **React + TypeScript (frontend)** and **Node.js + Express + Prisma (backend)**.

---

## 🛠️ Tech Stack

### Frontend

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white)
![React Router](https://img.shields.io/badge/React%20Router-6-CA4245?logo=react-router&logoColor=white)
![Formik](https://img.shields.io/badge/Formik-2.4-FF6F00?logo=formik&logoColor=white)
![Yup](https://img.shields.io/badge/Yup-Validation-4A90E2)
![Google Maps API](https://img.shields.io/badge/Google%20Maps%20API-Places%20%7C%20Autocomplete-4285F4?logo=googlemaps&logoColor=white)
![CSS Modules](https://img.shields.io/badge/CSS-Modules-1572B6?logo=css3&logoColor=white)

### Backend

![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-4-000000?logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma&logoColor=white)

---

## 📂 Project Structure

```bash
flower-delivery-app/
│── backend/ # API server (Node.js, Express, Prisma)
│── frontend/ # React client (Vite + React + TypeScript)
│── README.md # Project documentation
```

---

## 🚀 Features

### 🔹 Frontend

- React 18 + TypeScript
- Routing with **React Router**
- State management with custom hooks (`useCart`, `useFavorites`)
- Pagination & sorting (by price and date)
- Responsive design with **CSS modules**
- Favorites & Cart functionality
- **Google Maps integration**:
  - Display delivery map with marker
  - Autocomplete delivery address (Google Places API)
  - Store coordinates (lat/lng) with orders

### 🔹 Backend

- Node.js + Express + TypeScript
- Prisma ORM (with SQLite in dev, PostgreSQL in prod)
- Endpoints for:
  - Shops
  - Flowers
  - Cart & Favorites
  - Orders (with delivery address + coordinates)
- Pagination and filtering

---

## ⚙️ Installation

### 1. Clone repository

```bash
git clone https://github.com/OlesiaKubska/flower-delivery-app.git
cd flower-delivery-app
```

### 2. Backend setup

```bash
cd backend
npm install
```

#### Configure .env:

```bash
DATABASE_URL="file:./dev.db"
PORT=4000
```

#### Run migrations:

```bash
npx prisma migrate dev
```

#### Start backend:

```bash
npm run dev
```

---

### 3. Frontend setup

```bash
cd frontend
npm install
```

#### Configure .env:

```bash

VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

#### Start frontend:

```bash
npm run dev
```

-  Frontend: http://localhost:5173

-  Backend: http://localhost:4000

---

## 🔑 Google Maps API Setup

1. Go to Google Cloud Console

2. Create project `flower-delivery`

3. Enable APIs:

- Maps JavaScript API

- Places API

- Directions API

- Geocoding API

4. Create API key → restrict by domain `(http://localhost:5173)`

5. Add key to `frontend/.env`

---

## 📡 API Endpoints

- `GET /shops` – list shops

- `GET /shops/:id/flowers` – flowers in shop

- `POST /orders` – create order (address + coordinates)

- `GET /orders/:id` – order details

---


## 📖 Author

### 👩‍💻 Olesia Kubska

Full Stack Developer | Flower Delivery Test Project

---


