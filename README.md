# Aurelia Palace

A production-style full-stack website for a fictional premium event venue, built for a technical interview assignment.

## Tech Stack
- **Frontend:** React 18, Vite, Tailwind CSS, Framer Motion, React Router v6, React Hook Form, Zod
- **Backend:** Node.js, Express.js, Prisma ORM, MySQL, JWT Auth, Zod, express-rate-limit

## Project Structure
- `/frontend` - React single-page application.
- `/backend` - Node.js Express REST API.

## Features
- **Cinematic UI:** Luxury branding with tailored typography, Framer Motion scroll-reveal animations, and high-quality image presentation.
- **Dynamic Content:** All Event Types, Spaces, Services, Stories, and Gallery items are fetched dynamically from the MySQL database.
- **Enquiry Workflow:** Fully functional multi-step enquiry form with Zod schema validation (both frontend and backend).
- **Admin Dashboard:** JWT-protected admin portal to track, view, and manage (update status of) enquiries. 
- **Security:** Helmet, CORS, bcrypt, rate limiting, centralized error handling (no stack traces leaked).

---

## Getting Started

### 1. Database Setup
Make sure you have a local or remote instance of MySQL running.
Create a database (e.g., `aurelia_palace`).

### 2. Backend Setup
```bash
cd backend
npm install
```
Configure environment variables:
Create `backend/.env` based on `backend/.env.example`.
```env
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/aurelia_palace"
JWT_SECRET="your-super-secret-jwt-key"
PORT=5000
CLIENT_URL="http://localhost:5173"
NODE_ENV="development"
```

Run database migrations and seed the database:
```bash
npx prisma migrate dev --name init
npm run seed
```
*(The seed script populates 6 event types, 4 spaces, 6 services, 12 gallery items, 4 stories, and 1 admin account).*

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
In a new terminal:
```bash
cd frontend
npm install
```
Configure environment variables:
Create `frontend/.env` based on `frontend/.env.example`.
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the frontend server:
```bash
npm run dev
```

---

## Admin Access

The seed script creates an admin account at `admin@aureliapalace.com`.

**Local development:** The seed uses `admin123` by default. You can log in at `http://localhost:5173/admin/login`.

**Production:** Set the `ADMIN_SEED_PASSWORD` environment variable to a strong, unique password before running the seed script. The seed will refuse to run without it if `NODE_ENV=production`.

## Deployment Notes
- **Frontend** is configured to be deployed on platforms like **Vercel** or **Netlify**. Run `npm run build` to generate static assets.
- **Backend** is configured to be deployed on Node environments like **Render** or **Heroku**.
- Ensure CORS configurations (`CLIENT_URL`) and `VITE_API_BASE_URL` are updated securely in your deployment environment's variables.