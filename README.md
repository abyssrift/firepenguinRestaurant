# Fire Penguin Restaurant Ordering System

A full-stack restaurant ordering application built with React, Node.js (Express), and Supabase.

## Project Structure

```
firepenguinRestaurant/
├── backend/
│   ├── .env               # Supabase credentials
│   ├── package.json       # Backend dependencies
│   ├── server.js          # Express server & API routes
│   └── supabaseClient.js  # Supabase initialization
└── frontend/
    ├── src/
    │   ├── components/    # React components (Cart, Navbar, etc.)
    │   ├── App.jsx        # Main application logic
    │   └── main.jsx       # Entry point
    ├── index.html
    ├── package.json       # Frontend dependencies
    ├── tailwind.config.js # Styling configuration
    └── vite.config.js     # Vite configuration & Proxy
```

## Prerequisites

- Node.js & npm (Make sure they are in your system PATH)
- A Supabase project with `products` and `orders` tables.

## Setup Instructions

### 1. Database Setup (Supabase)

Create the tables and seed some data using the **SQL Editor** in your Supabase dashboard:
1. Open the SQL Editor in Supabase.
2. Copy the contents of [`seed.sql`](file:///c:/Users/j/Documents/firepenguinRestaurant/seed.sql).
3. Paste and run it.

This will create the `products` and `orders` tables and add 8 initial items to your menu.

### 2. Environment Variables

Create a `.env` file in the `backend/` directory:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=5000
```

### 3. Installation & Running

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`.

## API Documentation

- `GET /api/products`: Returns all products.
- `GET /api/products/:id`: Returns a single product by ID.
- `POST /api/orders`: Submits a new order.
  - Body: `{ cartItems, totalPrice, customerName, customerEmail }`
