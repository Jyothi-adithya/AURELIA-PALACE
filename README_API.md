# Aurelia Palace API Documentation

This document outlines the REST API endpoints available in the backend application.

**Base URL:** `http://localhost:5000/api`

---

## 🌍 Public Endpoints
*(No authentication required)*

### Events
- `GET /events` - Retrieve all active event types (Weddings, Corporate, etc.).
- `GET /events/:slug` - Retrieve detailed information for a specific event type.

### Spaces
- `GET /spaces` - Retrieve all venue spaces (Ballroom, Gardens, etc.).
- `GET /spaces/:slug` - Retrieve detailed information, gallery, and features for a specific space.

### Services
- `GET /services` - Retrieve all premium services offered at the venue.

### Gallery
- `GET /gallery` - Retrieve all gallery portfolio items.

### Stories
- `GET /stories` - Retrieve all published articles/stories.
- `GET /stories/:slug` - Retrieve full content for a specific story.

### Enquiries
- `POST /enquiries` - Submit a new customer enquiry.
  - **Body Requirements:** `name`, `email`, `phone`, `eventTypeId`, `eventDate`, `guestCount`, `message`.

---

## 🔒 Admin Endpoints
*(Requires JWT Bearer Token in `Authorization` header)*

### Authentication
- `POST /auth/login` - Authenticate an admin user.
  - **Body:** `email`, `password`
  - **Returns:** `{ token, admin: { id, name, email } }`

### Dashboard & Management
- `GET /admin/stats` - Retrieve aggregate analytics (total enquiries, breakdown by status).
- `GET /admin/enquiries` - Retrieve a paginated list of all enquiries.
  - **Query Params:** `page` (default: 1), `limit` (default: 10), `status` (optional filter), `search` (optional text search).
- `GET /admin/enquiries/:id` - Retrieve full details for a specific enquiry.
- `PATCH /admin/enquiries/:id/status` - Update the lifecycle status of an enquiry.
  - **Body Requirement:** `status` (Must be `NEW`, `CONTACTED`, or `CLOSED`).
