# Aurelia Palace - Backend

This is the Node.js/Express.js backend for the Aurelia Palace full-stack website. It provides a RESTful API to serve dynamic content (event types, spaces, services, gallery, stories) and handles enquiry submissions and administrative tasks securely.

## Tech Stack
- **Node.js** & **Express.js**: Core framework
- **MySQL**: Relational database
- **Prisma**: ORM for database modeling and migrations
- **Zod**: Schema-based validation for incoming requests
- **JWT (JSON Web Tokens)**: Admin authentication
- **bcrypt**: Password hashing
- **Helmet** & **CORS**: Security headers and cross-origin resource sharing
- **express-rate-limit**: Abuse prevention

## Prerequisites
- Node.js (v18+ recommended)
- MySQL Database running locally or remote

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the root of the backend directory. Refer to `.env.example`:
   ```
   DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/aurelia_palace"
   JWT_SECRET="your-super-secret-jwt-key"
   PORT=5000
   CLIENT_URL="http://localhost:5173"
   NODE_ENV="development"
   ```

3. **Database Migration**
   Apply the Prisma schema to your MySQL database:
   ```bash
   npx prisma migrate dev --name init
   ```

4. **Seed the Database**
   Populate the database with realistic fictional data (including the default admin user):
   ```bash
   npm run seed
   ```
   *Note: The default admin account is `admin@aureliapalace.com`. For production seeding, set the `ADMIN_SEED_PASSWORD` environment variable.*

5. **Start the Server**
   ```bash
   npm run dev
   ```

## Architecture

The backend strictly follows a layered architecture to keep routing, HTTP concerns, business logic, and database access separated:

```text
Routes → Controllers → Services → Prisma → MySQL
```

- `routes/`: Define endpoints and attach middleware.
- `controllers/`: Handle HTTP requests/responses, extract parameters, call services, format JSON.
- `services/`: Contain core business logic and interact directly with Prisma.
- `validators/`: Zod schemas to ensure input integrity.
- `middleware/`: Centralized error handling, authentication, and rate limiting.

## API Documentation

All successful responses wrap the data in a `data` object: `{ "success": true, "data": ... }`.
Errors return: `{ "success": false, "message": "...", "errors": [] }`.

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/event-types` | Get all event types |
| GET | `/api/event-types/:slug` | Get a specific event type by slug |
| GET | `/api/spaces` | Get all venue spaces |
| GET | `/api/spaces/:slug` | Get a specific space by slug |
| GET | `/api/services` | Get all active services |
| GET | `/api/services/:slug` | Get a specific service by slug |
| GET | `/api/gallery` | Get gallery items (Supports `?category=...` or `?eventTypeId=...`) |
| GET | `/api/stories` | Get all published stories |
| GET | `/api/stories/:slug` | Get a specific story by slug |

### Enquiry Endpoint

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/api/enquiries` | Submit a new enquiry | `{ name, email, phone, eventTypeId, eventDate, guestCount, message }` |

### Auth Endpoints

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/api/auth/login` | Admin login to receive JWT | `{ email, password }` |

### Protected Admin Endpoints (Require `Authorization: Bearer <token>`)

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| GET | `/api/admin/stats` | Get dashboard statistics (Total, New, Contacted, Closed counts) | - |
| GET | `/api/admin/enquiries` | Get paginated list of enquiries (Supports `?page`, `?limit`, `?status`, `?search`) | - |
| GET | `/api/admin/enquiries/:id` | Get details for a specific enquiry | - |
| PATCH | `/api/admin/enquiries/:id/status` | Update the status of an enquiry | `{ status: "NEW" \| "CONTACTED" \| "CLOSED" }` |

## Security Features
- **Rate Limiting**: Applied to `/api`, `/api/auth/login`, and `/api/enquiries` to prevent brute force and spam.
- **Data Validation**: Strict Zod schemas sanitize and validate incoming bodies.
- **Error Handling**: Centralized error middleware intercepts all errors. Raw database errors and stack traces are suppressed in production.
- **Password Security**: Passwords are hashed with `bcrypt` (cost factor 12) and never returned in API payloads. 
