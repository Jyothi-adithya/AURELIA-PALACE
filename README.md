<div align="center">
  <h1 align="center">Aurelia Palace</h1>
  <p align="center">
    <strong>A production-ready full-stack web application for a premium luxury event venue.</strong>
    <br />
    Built for a technical interview assignment showcasing modern web development practices.
  </p>

  <p align="center">
    <a href="https://aurelia-palace-azure.vercel.app" target="_blank">View Live Demo</a>
    ·
    <a href="#-getting-started">Run Locally</a>
  </p>
  
  <p align="center">
    <img src="https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
    <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
    <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
  </p>
</div>

---

## 🚀 Live Production Links

- **Frontend Application (Vercel):** [https://aurelia-palace-azure.vercel.app](https://aurelia-palace-azure.vercel.app)
- **Backend API (Render):** [https://aurelia-palace.onrender.com](https://aurelia-palace.onrender.com)
- **Database (Aiven):** Hosted Managed MySQL 8.4

---

## ✨ Key Features

### 🏛️ Cinematic Public UI
- **Luxury Branding:** Tailored typography (Cormorant Garamond + Inter), refined gold/charcoal color palette.
- **Micro-interactions:** Smooth scroll-reveal animations using Framer Motion and polished CSS transitions.
- **Dynamic Content:** Spaces, Event Types, Services, Gallery, and Stories are loaded dynamically from the relational database via REST APIs.
- **Masonry Gallery:** Responsive masonry grid with an interactive lightbox.

### ✉️ End-to-End Enquiry System
- **Validation First:** Strict dual-layer validation using Zod on both the React frontend and Node.js backend.
- **Automated Emails:** Integration with the **Resend API** to automatically dispatch branded HTML confirmation emails upon successful database insertion.
- **Fault-Tolerant:** Email dispatches are treated as "best effort"; failures are caught and logged securely without rolling back the successful enquiry save.

### 🔒 Secure Admin Dashboard
- **Protected Routing:** JWT-based stateless authentication protecting both frontend admin routes and backend API endpoints.
- **Enquiry Management:** Admins can view incoming enquiries, filter them, and update their statuses (`NEW`, `CONTACTED`, `CLOSED`).
- **Dashboard Stats:** Aggregate counts and metrics for rapid overview of lead pipelines.

### 🛡️ Production-Ready Security & Architecture
- **API Hardening:** Configured with `helmet`, strict `cors` policies, and centralized, leak-proof error handling.
- **Rate Limiting:** `express-rate-limit` protects the global API, with stricter specific limits for authentication and enquiry submission endpoints.
- **Environment Isolation:** Clean `.env` architecture keeping API keys, JWT secrets, and database credentials out of version control.

---

## 🛠️ Architecture & Project Structure

The project is structured as a monorepo containing two decoupled applications:

```text
AURELIA-PALACE/
├── frontend/                 # React SPA (Vite)
│   ├── src/
│   │   ├── components/       # Reusable UI components (layout, common, home)
│   │   ├── hooks/            # Custom React hooks (e.g., useFetch)
│   │   ├── layouts/          # Route wrappers (PublicLayout, AdminLayout)
│   │   ├── pages/            # Page-level components
│   │   └── services/         # Axios API clients for backend communication
│   └── package.json
│
└── backend/                  # Node.js/Express API
    ├── prisma/               # Prisma schema, migrations, and database seeders
    ├── src/
    │   ├── config/           # Environment variable validation
    │   ├── controllers/      # Route logic and response formatting
    │   ├── middleware/       # Auth, rate limiting, and error handling
    │   ├── routes/           # Express router definitions
    │   ├── services/         # Business logic (DB access, Email sending)
    │   └── validators/       # Zod schemas for request validation
    └── package.json
```

---

## 💻 Getting Started (Local Development)

### 1. Database Setup
Make sure you have a local or remote instance of MySQL running. Create an empty database (e.g., `aurelia_palace`).

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `backend/.env` file based on `.env.example`:
```env
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/aurelia_palace"
JWT_SECRET="your-super-secret-jwt-key"
PORT=5000
CLIENT_URL="http://localhost:5173"
NODE_ENV="development"

# Optional: For email confirmations
RESEND_API_KEY="re_xxxxxxxxxxxxx"
EMAIL_FROM="Aurelia Palace <onboarding@resend.dev>"
```

Run database migrations and seed the database with initial content:
```bash
npx prisma migrate dev --name init
npm run seed
```
*(The seed script populates the database with event types, spaces, services, gallery items, stories, and a default admin account).*

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
In a new terminal window:
```bash
cd frontend
npm install
```

Create a `frontend/.env` file:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the frontend development server:
```bash
npm run dev
```

---

## 🔑 Admin Access

The database seed script automatically creates an initial admin account:

- **Login URL:** `http://localhost:5173/admin/login` (or `/admin/login` on the live site)
- **Email:** `admin@aureliapalace.com`
- **Password (Local Development):** `admin123`

> **Note for Production:** When `NODE_ENV=production`, the seed script will explicitly refuse to use the default password and will require an `ADMIN_SEED_PASSWORD` environment variable to be set for security.

---

## 🚀 Deployment Overview

The application is deployed using modern cloud providers:

1. **Frontend (Vercel):** Connected directly to the GitHub repository. Pushes to the `main` branch trigger automatic builds (`npm run build`) and deployments.
2. **Backend (Render):** Deployed as a Node.js Web Service. Environment variables are injected via the Render dashboard.
3. **Database (Aiven):** A fully managed MySQL 8.4 instance. The connection string is provided securely to the Render backend via the `DATABASE_URL` environment variable.

To deploy your own instance, ensure you update CORS configurations (`CLIENT_URL`) on the backend and API routes (`VITE_API_BASE_URL`) on the frontend to match your deployed domains.