# API Documentation

The Aurelia Palace backend provides a RESTful API. All endpoints are prefixed with `/api`.

## 🌍 Public Endpoints
These endpoints do not require authentication.

### Event Types
- `GET /api/event-types` - Retrieve all event types
- `GET /api/event-types/:slug` - Retrieve a specific event type by slug

### Spaces
- `GET /api/spaces` - Retrieve all venue spaces
- `GET /api/spaces/:slug` - Retrieve a specific space by slug

### Services
- `GET /api/services` - Retrieve all services grouped by category

### Gallery
- `GET /api/gallery` - Retrieve gallery images

### Stories
- `GET /api/stories` - Retrieve published stories/blog posts
- `GET /api/stories/:slug` - Retrieve a specific story by slug

### Enquiries
- `POST /api/enquiries` - Submit a new enquiry
  - **Body:** `{ name, email, phone, eventTypeId, eventDate, guestCount, message }`
  - **Behavior:** Validates payload, saves to database, and fires an automated email confirmation via Resend.

---

## 🔐 Authentication
- `POST /api/auth/login` - Authenticate an admin user
  - **Body:** `{ email, password }`
  - **Returns:** JWT Token for authorization.

---

## 🛡️ Admin Endpoints
These endpoints require a valid JWT token passed in the `Authorization: Bearer <token>` header.

### Enquiries Management
- `GET /api/admin/enquiries` - Retrieve paginated enquiries (supports `?status=` and `?search=` queries)
- `GET /api/admin/enquiries/:id` - Retrieve a specific enquiry by ID
- `PATCH /api/admin/enquiries/:id/status` - Update an enquiry's status
  - **Body:** `{ status: "NEW" | "CONTACTED" | "CLOSED" }`

### Dashboard Stats
- `GET /api/admin/stats` - Retrieve aggregate counts for the admin dashboard
  - **Returns:** `{ total, new, contacted, closed }`

---

## 🚦 Error Handling & Rate Limiting
- **Standardized Errors:** All errors return a structured JSON response `{ success: false, message: "..." }`.
- **Validation Errors:** Zod validation failures return a `400` status with a detailed array of field-level errors.
- **Rate Limiting:** Global API calls are limited to 100 per 15 minutes. Enquiry submissions are strictly limited to 5 per hour per IP address to prevent spam.
