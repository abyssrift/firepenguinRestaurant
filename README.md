# Fire Penguin - Premium Restaurant Ordering System


![Fire Penguin Banner](https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1200&h=300)

**A high-end, animated restaurant ordering application with React, Node.js, and Supabase**

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat&logo=supabase&logoColor=white)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[Demo Video](https://youtu.be/U5Njsul7nRM) • [Live Demo](https://youtu.be/U5Njsul7nRM) • [Report Bug](https://youtu.be/U5Njsul7nRM)



---

## ✨ Features

- 🎨 **Premium UI/UX**: Glassmorphism design with smooth parallax effects
- 🎭 **Dynamic Animations**: Framer Motion for staggered card animations and layout transitions
- 🛒 **Interactive Cart**: Real-time sidebar with quantity controls and smooth transitions
- 🔍 **Category Filtering**: Animated filter pills with instant product reordering
- 📱 **Fully Responsive**: Mobile-first design optimized for all screen sizes
- ✅ **Form Validation**: Client-side validation for checkout process
- 🌙 **Dark Theme**: Premium dark mode with custom color palette

---

## 🛠️ Tech Stack

### Frontend
- **React 18** (Vite) - Fast, modern build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client
- **React Hot Toast** - Elegant notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Supabase** - PostgreSQL database
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

---

## 📁 Project Structure

```
FirePenguinRestaurant/
├── backend/
│   ├── .env.example          # Environment variables template
│   ├── server.js             # Express server & API routes
│   ├── supabaseClient.js     # Supabase initialization
│   └── package.json          # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── CartSidebar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── Loading.jsx
│   │   │   ├── Menu.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ProductCard.jsx
│   │   ├── context/          # Global state management
│   │   │   └── CartContext.jsx
│   │   ├── lib/              # Utility functions
│   │   │   └── utils.js
│   │   ├── App.jsx           # Main app component
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Global styles
│   ├── tailwind.config.js    # Tailwind configuration
│   ├── vite.config.js        # Vite configuration
│   └── package.json          # Frontend dependencies
├── seed.sql                  # Database schema & seed data
└── README.md                 # You are here!
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16+)
- **npm** or **yarn**
- **Supabase Account** ([Sign up free](https://supabase.com))

### 1️⃣ Database Setup

1. Create a new Supabase project
2. Go to **SQL Editor** in your Supabase dashboard
3. Copy and run the contents of `seed.sql`

This creates the `products` and `orders` tables and populates 10 premium menu items.

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=5000
```

Start the backend server:

```bash
npm run dev
```

Server runs on `http://localhost:5000`

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## 📡 API Endpoints

### Products

| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| `GET` | `/api/products` | Fetch all products | `?category=Mains` (optional) |
| `GET` | `/api/products/:id` | Fetch single product | - |

### Orders

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `POST` | `/api/orders` | Submit new order | `{ cartItems, totalPrice, customerName, customerAddress, customerPhone }` |

### Uploads

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `POST` | `/api/upload` | Upload product image | `multipart/form-data` with `image` field |
