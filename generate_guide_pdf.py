import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#78716C"))
        
        # Header (pages > 1)
        if self._pageNumber > 1:
            self.drawString(54, 750, "Aurelia Palace — Complete Project & Architecture Guide")
            self.setStrokeColor(colors.HexColor("#E7E5E4"))
            self.setLineWidth(0.5)
            self.line(54, 744, 558, 744)
            
        # Footer (all pages)
        self.setStrokeColor(colors.HexColor("#E7E5E4"))
        self.setLineWidth(0.5)
        self.line(54, 45, 558, 45)
        
        self.drawString(54, 32, "Aurelia Palace Full-Stack Technical Documentation")
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(558, 32, page_str)
        self.restoreState()

def create_guide(output_filename):
    doc = SimpleDocTemplate(
        output_filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()
    
    primary_color = colors.HexColor("#1C1917")  # Deep Charcoal
    gold_color = colors.HexColor("#A1792A")     # Luxury Dark Gold
    text_color = colors.HexColor("#292524")     # Dark Stone
    muted_color = colors.HexColor("#57534E")    # Muted Stone
    border_color = colors.HexColor("#D6D3D1")

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        textColor=primary_color,
        spaceAfter=4
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10.5,
        leading=14,
        textColor=gold_color,
        spaceAfter=12
    )

    h1_style = ParagraphStyle(
        'Heading1_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=15,
        textColor=primary_color,
        spaceBefore=12,
        spaceAfter=5,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'Heading2_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=12.5,
        textColor=gold_color,
        spaceBefore=7,
        spaceAfter=3,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body_Custom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=text_color,
        spaceAfter=5
    )

    bullet_style = ParagraphStyle(
        'Bullet_Custom',
        parent=body_style,
        leftIndent=12,
        firstLineIndent=-8,
        spaceAfter=3
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10,
        textColor=colors.white
    )

    table_cell_style = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=10.5,
        textColor=text_color
    )

    table_cell_bold = ParagraphStyle(
        'TableCellBold',
        parent=table_cell_style,
        fontName='Helvetica-Bold'
    )

    story = []

    # Title Banner
    story.append(Paragraph("AURELIA PALACE", title_style))
    story.append(Paragraph("COMPLETE TECHNICAL REFERENCE & ARCHITECTURE GUIDE", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=gold_color, spaceAfter=10))

    # 1. Project Purpose
    story.append(Paragraph("1. Project Purpose & Scope", h1_style))
    story.append(Paragraph(
        "<b>Aurelia Palace</b> is an enterprise-standard full-stack web application designed for a luxury event venue. "
        "The system serves two distinct user personas: prospective clients exploring spaces, services, and submitting event enquiries; "
        "and internal event managers managing lead pipelines, updating enquiry statuses, and inspecting conversion statistics.",
        body_style
    ))
    story.append(Spacer(1, 3))

    # 2. Architecture & Cloud Infrastructure
    story.append(Paragraph("2. System Architecture & Cloud Infrastructure", h1_style))
    story.append(Paragraph(
        "The project implements a decoupled monorepo architecture where the Single Page Application (SPA) frontend and the REST API backend "
        "operate as independent services communicating over authenticated HTTPS JSON protocols:",
        body_style
    ))
    story.append(Paragraph("• <b>Frontend Layer (Vercel):</b> React 18 + Vite SPA deployed on Vercel's global Edge CDN network for low-latency asset delivery.", bullet_style))
    story.append(Paragraph("• <b>Backend Layer (Render):</b> Node.js + Express 5 REST API web service with continuous deployment from GitHub.", bullet_style))
    story.append(Paragraph("• <b>Database Layer (Aiven Cloud):</b> Managed MySQL 8.4 database with TLS encrypted connections and ACID transaction safety.", bullet_style))
    story.append(Paragraph("• <b>Email Notification Service (Resend):</b> HTTP REST transactional email engine for automated customer confirmation emails.", bullet_style))
    story.append(Spacer(1, 4))

    # 3. Frontend Engineering & Techniques
    story.append(Paragraph("3. Frontend Engineering & Advanced Techniques", h1_style))
    story.append(Paragraph("• <b>React 18 & Vite:</b> Component-driven architecture using functional components, custom hooks (e.g. useFetch), and optimized production tree-shaking.", bullet_style))
    story.append(Paragraph("• <b>Dynamic SEO Management (react-helmet-async):</b> Every route dynamically updates page titles, meta descriptions, canonical links, and Open Graph social sharing cards.", bullet_style))
    story.append(Paragraph("• <b>Editorial Typography & Design Tokens:</b> Pairing of Cormorant Garamond serif and Inter sans-serif with custom Tailwind CSS color palettes (Charcoal, Stone, Ivory, Gold).", bullet_style))
    story.append(Paragraph("• <b>Micro-Interactions (Framer Motion):</b> Viewport-triggered fade-up reveals, smooth navigation menu transitions, interactive hover zoom states, and page unmounting animations.", bullet_style))
    story.append(Paragraph("• <b>Dual-Layer Validation (React Hook Form + Zod):</b> Client-side schema validation providing immediate user feedback on required fields, email formats, and guest minimums.", bullet_style))
    story.append(Paragraph("• <b>Axios Interceptors:</b> Request interceptors automatically inject JWT tokens for admin routes; response interceptors catch 401 Unauthorized errors and cleanly redirect to login.", bullet_style))
    story.append(Paragraph("• <b>Loading & Error Handling:</b> Custom Skeleton shimmer loaders prevent layout shifts during fetches, accompanied by dedicated full-page and inline error boundaries.", bullet_style))
    story.append(Paragraph("• <b>Masonry Gallery & Lightbox:</b> Multi-column responsive gallery with category filtering and interactive full-screen image preview lightbox.", bullet_style))
    story.append(Spacer(1, 4))

    # 4. Backend Engineering & Security Hardening
    story.append(Paragraph("4. Backend Architecture & Security Practices", h1_style))
    story.append(Paragraph("• <b>Layered Controller-Service Architecture:</b> Strict separation between Express routing, Zod request body validation, controllers, and Prisma business logic services.", bullet_style))
    story.append(Paragraph("• <b>Defense-in-Depth Rate Limiting:</b> Tiered protection using express-rate-limit: Global API ceiling (100 req / 15 min), Auth protection (10 attempts / hr), and Enquiry protection (5 submissions / hr per IP).", bullet_style))
    story.append(Paragraph("• <b>Security Hardening (Helmet & CORS):</b> HTTP security headers for XSS, clickjacking, and content sniffing protection, with strict origin whitelisting matching the Vercel domain.", bullet_style))
    story.append(Paragraph("• <b>Stateless JWT Authentication:</b> Cryptographically signed JSON Web Tokens for administrative authorization without server-side session overhead.", bullet_style))
    story.append(Paragraph("• <b>Bcrypt Password Hashing:</b> Salted and hashed passwords ensuring admin credentials are never stored in plaintext.", bullet_style))
    story.append(Paragraph("• <b>Leak-Proof Centralized Error Handler:</b> Sanitized 500 responses in production to prevent leaking internal database schemas, credentials, or stack traces.", bullet_style))
    story.append(Paragraph("• <b>Structured Production Logging:</b> Morgan logging configured in Apache Combined format for cloud monitoring and anomaly detection.", bullet_style))

    # PageBreak for clean page 2
    story.append(PageBreak())

    # 5. Database Schema & Data Models
    story.append(Paragraph("5. Database Design & Relational Models (MySQL / Prisma)", h1_style))
    story.append(Paragraph(
        "The relational schema is managed using Prisma ORM 5.22 on MySQL 8.4, comprising 7 dedicated tables:",
        body_style
    ))

    db_data = [
        [Paragraph("Model", table_header_style), Paragraph("Type / Purpose", table_header_style), Paragraph("Key Schema Attributes & Relationships", table_header_style)],
        [
            Paragraph("<b>EventType</b>", table_cell_style),
            Paragraph("Venue Event Categories", table_cell_style),
            Paragraph("name, slug (unique), description, image, featured (boolean), 1-to-many relation with Enquiry & GalleryItem.", table_cell_style)
        ],
        [
            Paragraph("<b>Space</b>", table_cell_style),
            Paragraph("Venue Locations & Halls", table_cell_style),
            Paragraph("name, slug (unique), capacity, description, image, features (JSON array), galleryImages (JSON array).", table_cell_style)
        ],
        [
            Paragraph("<b>Service</b>", table_cell_style),
            Paragraph("Hospitality Offerings", table_cell_style),
            Paragraph("name, slug (unique), category (indexed: Catering, Decor, Tech, Concierge), description, image, active flag.", table_cell_style)
        ],
        [
            Paragraph("<b>GalleryItem</b>", table_cell_style),
            Paragraph("Curated Photography", table_cell_style),
            Paragraph("title, category (indexed), image URL, caption, optional foreign key relation to EventType.", table_cell_style)
        ],
        [
            Paragraph("<b>Story</b>", table_cell_style),
            Paragraph("Editorial Journal & Spotlights", table_cell_style),
            Paragraph("title, slug (unique), excerpt, content (LongText markdown), coverImage, publishedDate, published flag.", table_cell_style)
        ],
        [
            Paragraph("<b>Enquiry</b>", table_cell_style),
            Paragraph("Customer Lead Capture", table_cell_style),
            Paragraph("name, email, phone, eventDate, guestCount, message, foreign key eventTypeId, status (enum: NEW, CONTACTED, CLOSED).", table_cell_style)
        ],
        [
            Paragraph("<b>AdminUser</b>", table_cell_style),
            Paragraph("Staff Authentication", table_cell_style),
            Paragraph("name, email (unique), passwordHash (bcrypt encrypted), timestamps for audit tracking.", table_cell_style)
        ]
    ]

    db_table = Table(db_data, colWidths=[90, 130, 284])
    db_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), primary_color),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3.5),
        ('TOPPADDING', (0, 0), (-1, -1), 3.5),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor("#F8F7F4")]),
        ('GRID', (0, 0), (-1, -1), 0.5, border_color),
    ]))
    story.append(db_table)
    story.append(Spacer(1, 6))

    # 6. Core Application Workflows
    story.append(Paragraph("6. Key Business & Technical Workflows", h1_style))
    
    story.append(Paragraph("A. Customer Enquiry & Fault-Tolerant Email Flow", h2_style))
    story.append(Paragraph(
        "1. Client inputs details into the Enquiry form with live Zod client validation.<br/>"
        "2. Form dispatches POST /api/enquiries to the backend API.<br/>"
        "3. Server validates types and bounds before executing <b>prisma.enquiry.create()</b> into MySQL (Status: NEW).<br/>"
        "4. Database write completes as the immutable source of truth.<br/>"
        "5. Server queries the corresponding EventType name and triggers the Resend API to dispatch a branded HTML confirmation email.<br/>"
        "6. <b>Fault Tolerance Guarantee:</b> If the email API encounters rate limits or network issues, the error is safely caught and logged server-side without rolling back or deleting the saved enquiry.<br/>"
        "7. Response returns 201 Created with an emailSent status flag, driving a dynamic frontend success notification.",
        body_style
    ))

    story.append(Paragraph("B. Admin Authentication & Lead Lifecycle Flow", h2_style))
    story.append(Paragraph(
        "1. Admin submits credentials on /admin/login; server verifies password hash via bcrypt.compare().<br/>"
        "2. Server issues a signed JWT token; frontend persists it in localStorage.<br/>"
        "3. Admin dashboard loads summary statistics (/api/admin/stats) and paginated leads (/api/admin/enquiries).<br/>"
        "4. Admin can search leads by customer name/email and filter by status.<br/>"
        "5. Lead status is updated via PATCH /api/admin/enquiries/:id/status through an enum transition (NEW → CONTACTED → CLOSED).",
        body_style
    ))
    story.append(Spacer(1, 4))

    # 7. Cloud DevOps & Production Environment
    story.append(Paragraph("7. Cloud DevOps & Deployment Architecture", h1_style))
    story.append(Paragraph("• <b>Frontend Edge Hosting (Vercel):</b> Direct GitHub repository integration triggers automated builds (vite build) on pushes to main, distributing assets globally across edge servers.", bullet_style))
    story.append(Paragraph("• <b>Backend Web Service (Render):</b> Managed Node.js service executing continuous deployment with automatic zero-downtime health verification.", bullet_style))
    story.append(Paragraph("• <b>Database Cloud Service (Aiven):</b> High-availability MySQL 8.4 instance configured with automated backups and secure TLS connections.", bullet_style))
    story.append(Paragraph("• <b>Environment Secrets Isolation:</b> Strict isolation of DATABASE_URL, JWT_SECRET, RESEND_API_KEY, and CLIENT_URL through environment variables excluded from Git version control.", bullet_style))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Guide PDF generated successfully: {output_filename}")

if __name__ == '__main__':
    create_guide('C:/AURELIA PALACE/Aurelia_Palace_Complete_Project_Guide.pdf')
