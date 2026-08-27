# Major Technical Decisions

This document outlines the core technical decisions made during the architecture and development of the Aurelia Palace platform.

### 1. Monorepo Architecture with Decoupled Services
Instead of a monolithic framework like Next.js, the project uses a strict separation of concerns with a standalone React SPA (Frontend) and a Node.js/Express REST API (Backend). 
* **Reasoning:** This demonstrates a deeper understanding of RESTful principles, CORS configurations, and cross-origin authentication. It also allows the frontend and backend to be scaled and deployed independently (Vercel for CDN-edge static hosting, Render for continuous Node.js runtime).

### 2. Dual-Layer Validation with Zod
Zod is utilized for schema validation on **both** the frontend (integrated with `react-hook-form`) and the backend (Express middleware).
* **Reasoning:** This ensures absolute data integrity. The frontend prevents bad requests from reaching the server, providing immediate UX feedback, while the backend maintains a zero-trust policy by strictly validating all incoming payloads before they touch the database.

### 3. Relational Database Strategy (MySQL + Prisma)
A relational database (MySQL) was chosen over NoSQL, managed via the Prisma ORM.
* **Reasoning:** The data models are inherently relational (e.g., an `Enquiry` belongs to a specific `EventType`, `GalleryItems` are categorized). Prisma provides immense developer experience benefits through auto-generated types, ensuring type safety between the database schema and the Node.js application, whilst preventing SQL injection vectors by default.

### 4. Resend for Transactional Emails
Rather than building an SMTP server or using heavy legacy email libraries (like Nodemailer with SendGrid), the modern `resend` SDK was implemented.
* **Reasoning:** It requires a single lightweight dependency and allows for the sending of beautiful HTML templates via an HTTP API. The email dispatch is designed as a "fire-and-forget" mechanism—if the email API fails, the backend catches the error silently and ensures the primary database transaction (saving the enquiry) still succeeds.

### 5. JWT Stateless Authentication
The Admin dashboard is protected by JSON Web Tokens (JWT) rather than stateful session cookies.
* **Reasoning:** This aligns perfectly with the decoupled architecture. The REST API remains completely stateless, making it highly scalable and easier to test. Tokens are handled securely by the React frontend and attached via Axios interceptors.

### 6. Framer Motion for UI/UX
Framer Motion was selected over standard CSS keyframes or libraries like GSAP for frontend animations.
* **Reasoning:** Framer Motion integrates natively into React's component lifecycle. It allowed for rapid implementation of premium, scroll-linked reveal animations (`whileInView`) that give the venue website a cinematic, luxury feel without causing layout thrashing or performance degradation.
