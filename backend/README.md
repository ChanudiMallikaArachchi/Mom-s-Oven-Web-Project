# 🎂 Mom's Oven — Backend API

Production-ready REST API backend for the **Mom's Oven** cake e-commerce platform built with Node.js, Express, TypeScript, Prisma ORM, PostgreSQL, Zod validation, JWT authentication, and Stripe/PayHere integration.

---

## 📁 Directory Architecture

```
backend/
├── package.json
├── tsconfig.json
├── .env.example
├── README.md
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
└── src/
    ├── app.ts
    ├── server.ts
    ├── config/
    │   ├── env.ts
    │   └── db.ts
    ├── middlewares/
    │   ├── auth.ts
    │   ├── error.ts
    │   ├── validate.ts
    │   └── rateLimiter.ts
    ├── utils/
    │   ├── jwt.ts
    │   ├── password.ts
    │   └── orderNumber.ts
    ├── routes/
    │   ├── auth.routes.ts
    │   ├── home.routes.ts
    │   ├── categories.routes.ts
    │   ├── cakes.routes.ts
    │   ├── cart.routes.ts
    │   ├── orders.routes.ts
    │   ├── users.routes.ts
    │   ├── admin.routes.ts
    │   ├── contact.routes.ts
    │   └── index.ts
    └── controllers/
        ├── auth.controller.ts
        ├── home.controller.ts
        ├── categories.controller.ts
        ├── cakes.controller.ts
        ├── cart.controller.ts
        ├── orders.controller.ts
        ├── users.controller.ts
        ├── admin.controller.ts
        └── contact.controller.ts
```

---

## 🚀 Quick Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and fill in your PostgreSQL database string:
```bash
cp .env.example .env
```

### 3. Database Migration & Seed
```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

### 4. Start Development Server
```bash
npm run dev
```
The REST API will run on `http://localhost:5000/api`.

---

## 🔑 Default Credentials (from Seed)
- **Admin Email:** `admin@momsoven.com`
- **Admin Password:** `Admin@123456`

---

## 📡 REST API Reference

### 🔐 Auth (`/api/auth`)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register user account |
| POST | `/api/auth/login` | Login with email & password |
| POST | `/api/auth/google` | Google OAuth token authentication |
| POST | `/api/auth/refresh` | Refresh JWT access token |
| POST | `/api/auth/logout` | Clear refresh token cookie |
| POST | `/api/auth/forgot-password` | Request password reset email |
| POST | `/api/auth/reset-password` | Reset password using token |

### 🏠 Home & Catalog (`/api/home`, `/api/categories`, `/api/cakes`)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/home/featured-cakes` | Get featured cakes for homepage slider |
| GET | `/api/home/testimonials` | Get published customer reviews |
| GET | `/api/categories` | Get all cake categories |
| GET | `/api/categories/:slug` | Get single category with filtered cakes |
| GET | `/api/cakes` | Search & browse cakes catalog |
| GET | `/api/cakes/:id` | Get single cake details |

### 🛒 Cart & Checkout (`/api/cart`, `/api/orders`)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/cart` | Get cart items (User or Guest session) |
| POST | `/api/cart/items` | Add cake to cart |
| PATCH | `/api/cart/items/:id` | Update item quantity |
| DELETE | `/api/cart/items/:id` | Remove item from cart |
| POST | `/api/cart/merge` | Merge guest cart into user account on login |
| POST | `/api/orders` | Create order from cart items |
| POST | `/api/orders/:id/pay` | Create Stripe / PayHere payment intent |
| GET | `/api/orders/:orderNumber` | Get order summary for `/order-success` |
| GET | `/api/orders/:orderNumber/track` | Public order status timeline for `/track-order` |

### 👤 User Account (`/api/users`) — Auth Required
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users/me` | Get current user profile |
| PATCH | `/api/users/me` | Update name / phone |
| GET | `/api/users/me/orders` | Get user order history |
| GET | `/api/users/me/addresses` | Get saved delivery addresses |
| POST | `/api/users/me/addresses` | Add new delivery address |

### 🛡️ Admin Panel (`/api/admin`) — Admin Required
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/admin/dashboard/metrics` | Total revenue, orders, active cakes & pending counts |
| GET | `/api/admin/dashboard/recent-sales` | Latest customer orders |
| GET | `/api/admin/cakes` | Admin cake catalog table |
| POST | `/api/admin/cakes` | Add new cake |
| PATCH | `/api/admin/cakes/:id` | Update cake |
| DELETE | `/api/admin/cakes/:id` | Delete cake |
| GET | `/api/admin/orders` | Fulfillment order queue |
| PATCH | `/api/admin/orders/:id/status` | Update order status & track timeline |
