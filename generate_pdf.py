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
            self.drawString(54, 750, "Aurelia Palace — Project Submission & Architecture Report")
            self.setStrokeColor(colors.HexColor("#E7E5E4"))
            self.setLineWidth(0.5)
            self.line(54, 744, 558, 744)
            
        # Footer (all pages)
        self.setStrokeColor(colors.HexColor("#E7E5E4"))
        self.setLineWidth(0.5)
        self.line(54, 45, 558, 45)
        
        self.drawString(54, 32, "Confidential — For Technical Evaluation & Internship Assessment")
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(558, 32, page_str)
        self.restoreState()

def create_report(output_filename):
    doc = SimpleDocTemplate(
        output_filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()
    
    # Custom styles
    primary_color = colors.HexColor("#1C1917")  # Deep Charcoal
    gold_color = colors.HexColor("#A1792A")     # Luxury Dark Gold
    text_color = colors.HexColor("#292524")     # Dark Stone
    muted_color = colors.HexColor("#57534E")    # Muted Stone
    border_color = colors.HexColor("#D6D3D1")

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=primary_color,
        spaceAfter=4
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=11,
        leading=15,
        textColor=gold_color,
        spaceAfter=14
    )

    h1_style = ParagraphStyle(
        'Heading1_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=16,
        textColor=primary_color,
        spaceBefore=14,
        spaceAfter=6,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'Heading2_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=gold_color,
        spaceBefore=8,
        spaceAfter=3,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body_Custom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=text_color,
        spaceAfter=6
    )

    body_bold = ParagraphStyle(
        'Body_Bold',
        parent=body_style,
        fontName='Helvetica-Bold'
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.white
    )

    table_cell_style = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=text_color
    )

    table_cell_bold = ParagraphStyle(
        'TableCellBold',
        parent=table_cell_style,
        fontName='Helvetica-Bold'
    )

    code_cell_style = ParagraphStyle(
        'CodeCell',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=8,
        leading=10,
        textColor=primary_color
    )

    story = []

    # Title Banner
    story.append(Paragraph("AURELIA PALACE", title_style))
    story.append(Paragraph("PROJECT SUBMISSION REPORT & TECHNICAL ARCHITECTURE", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=gold_color, spaceAfter=12))

    # 1. Executive Summary
    story.append(Paragraph("1. Executive Summary & Introduction", h1_style))
    story.append(Paragraph(
        "<b>Aurelia Palace</b> is a production-ready, full-stack web application designed for a fictional luxury event venue. "
        "The project delivers a refined luxury brand identity, dynamic exploration of venue spaces and services, an interactive "
        "enquiry submission pipeline with automated email confirmations, and a secure JWT-authenticated administration portal for lead management.",
        body_style
    ))
    story.append(Paragraph(
        "Engineered to demonstrate enterprise-grade engineering practices, the solution features decoupled frontend/backend services, "
        "dual-layer Zod schema validation, managed cloud database persistence (MySQL 8.4 via Prisma ORM), automated transactional emails (Resend API), "
        "and strict defense-in-depth API rate-limiting and security headers.",
        body_style
    ))
    story.append(Spacer(1, 4))

    # 2. Key Links & Submission Artifacts
    story.append(Paragraph("2. Key Links & Project Deliverables", h1_style))
    
    links_data = [
        [
            Paragraph("Deliverable / Component", table_header_style),
            Paragraph("Live Link / Repository Location", table_header_style),
            Paragraph("Platform", table_header_style)
        ],
        [
            Paragraph("<b>Public Website (Frontend)</b>", table_cell_style),
            Paragraph('<link href="https://aurelia-palace-azure.vercel.app" color="#0284C7"><u>https://aurelia-palace-azure.vercel.app</u></link>', table_cell_style),
            Paragraph("Vercel Edge CDN", table_cell_style)
        ],
        [
            Paragraph("<b>Production API (Backend)</b>", table_cell_style),
            Paragraph('<link href="https://aurelia-palace.onrender.com" color="#0284C7"><u>https://aurelia-palace.onrender.com</u></link>', table_cell_style),
            Paragraph("Render Web Service", table_cell_style)
        ],
        [
            Paragraph("<b>Source Code Repository</b>", table_cell_style),
            Paragraph('<link href="https://github.com/Jyothi-adithya/AURELIA-PALACE" color="#0284C7"><u>github.com/Jyothi-adithya/AURELIA-PALACE</u></link>', table_cell_style),
            Paragraph("GitHub Monorepo", table_cell_style)
        ],
        [
            Paragraph("<b>Admin Portal</b>", table_cell_style),
            Paragraph('<link href="https://aurelia-palace-azure.vercel.app/admin/login" color="#0284C7"><u>.../admin/login</u></link>', table_cell_style),
            Paragraph("Vercel / React Router", table_cell_style)
        ],
        [
            Paragraph("<b>API Documentation</b>", table_cell_style),
            Paragraph('<link href="https://github.com/Jyothi-adithya/AURELIA-PALACE/blob/main/API_DOCS.md" color="#0284C7"><u>API_DOCS.md</u></link>', table_cell_style),
            Paragraph("Markdown Specification", table_cell_style)
        ],
        [
            Paragraph("<b>Technical Decisions Note</b>", table_cell_style),
            Paragraph('<link href="https://github.com/Jyothi-adithya/AURELIA-PALACE/blob/main/TECHNICAL_DECISIONS.md" color="#0284C7"><u>TECHNICAL_DECISIONS.md</u></link>', table_cell_style),
            Paragraph("Architecture Note", table_cell_style)
        ]
    ]

    links_table = Table(links_data, colWidths=[140, 260, 104])
    links_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), primary_color),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor("#F8F7F4")]),
        ('GRID', (0, 0), (-1, -1), 0.5, border_color),
    ]))
    story.append(links_table)
    story.append(Spacer(1, 8))

    # 3. Admin & Test Credentials
    story.append(Paragraph("3. Evaluation & Admin Test Credentials", h1_style))
    creds_data = [
        [Paragraph("Admin Login URL", table_cell_bold), Paragraph('<link href="https://aurelia-palace-azure.vercel.app/admin/login" color="#0284C7"><u>https://aurelia-palace-azure.vercel.app/admin/login</u></link>', table_cell_style)],
        [Paragraph("Username / Email", table_cell_bold), Paragraph("admin@aureliapalace.com", code_cell_style)],
        [Paragraph("Password", table_cell_bold), Paragraph("admin123", code_cell_style)],
        [Paragraph("Admin Capabilities", table_cell_bold), Paragraph("Review enquiries, filter by status / search, update lead statuses (NEW → CONTACTED → CLOSED), view live conversion dashboard statistics.", table_cell_style)]
    ]
    creds_table = Table(creds_data, colWidths=[140, 364])
    creds_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, -1), colors.HexColor("#F1ECE4")),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('GRID', (0, 0), (-1, -1), 0.5, border_color),
    ]))
    story.append(creds_table)
    story.append(Spacer(1, 8))

    # 4. Tech Stack
    story.append(Paragraph("4. Technology Stack & Infrastructure", h1_style))
    tech_data = [
        [Paragraph("Layer", table_header_style), Paragraph("Technologies & Libraries", table_header_style), Paragraph("Key Purpose", table_header_style)],
        [
            Paragraph("<b>Frontend SPA</b>", table_cell_style),
            Paragraph("React 18, Vite, Tailwind CSS, Framer Motion, React Router v6, React Hook Form, Zod", table_cell_style),
            Paragraph("High-performance responsive UI, cinematic micro-interactions, client-side validation.", table_cell_style)
        ],
        [
            Paragraph("<b>Backend REST API</b>", table_cell_style),
            Paragraph("Node.js, Express.js 5, Prisma ORM 5.22, Zod, bcrypt, JWT, Helmet, Morgan", table_cell_style),
            Paragraph("Secure RESTful endpoints, zero-trust schema parsing, stateless token auth, rate limiting.", table_cell_style)
        ],
        [
            Paragraph("<b>Database</b>", table_cell_style),
            Paragraph("Managed MySQL 8.4 on Aiven Cloud", table_cell_style),
            Paragraph("Relational ACID persistence for venue content, lead pipeline, and admin users.", table_cell_style)
        ],
        [
            Paragraph("<b>Transactional Email</b>", table_cell_style),
            Paragraph("Resend SDK (HTTP REST Integration)", table_cell_style),
            Paragraph("Automated dispatch of luxury-branded HTML confirmation emails.", table_cell_style)
        ],
        [
            Paragraph("<b>Cloud Hosting</b>", table_cell_style),
            Paragraph("Vercel (Frontend Edge) + Render (Backend Web Service)", table_cell_style),
            Paragraph("Automated CI/CD deployments connected to GitHub main branch.", table_cell_style)
        ]
    ]
    tech_table = Table(tech_data, colWidths=[90, 214, 200])
    tech_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), primary_color),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor("#F8F7F4")]),
        ('GRID', (0, 0), (-1, -1), 0.5, border_color),
    ]))
    story.append(tech_table)
    story.append(Spacer(1, 10))

    # PageBreak for clean layout
    story.append(PageBreak())

    # 5. Major Technical Decisions
    story.append(Paragraph("5. Major Technical Decisions & Architecture Rationale", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=border_color, spaceAfter=8))

    decisions = [
        ("1. Decoupled Monorepo Architecture (Vercel + Render)",
         "Rather than utilizing an all-in-one framework, the project enforces clean architectural boundaries with an independent React client and Express API. This enables targeted horizontal scaling, global CDN caching for client assets on Vercel, and specialized Node runtime environment hosting on Render while verifying strict CORS protocols."),
        
        ("2. Dual-Layer Zero-Trust Validation (Zod)",
         "Identical Zod schemas are integrated on both the client (via React Hook Form resolver) and the server (Express controller middleware). This pattern delivers instantaneous user feedback in the UI while ensuring strict data sanitation before any write operation reaches the MySQL database."),
        
        ("3. Relational Persistence with Prisma ORM & MySQL",
         "A relational schema was implemented to model interconnected entities (Events, Spaces, Services, Categories, and Enquiries). Prisma provides compile-time type safety, automated migration management, clean relational queries, and built-in SQL injection prevention."),
         
        ("4. Fault-Tolerant Transactional Email Strategy (Resend)",
         "Confirmation emails are triggered asynchronously following a successful database commit. The database write represents the immutable source of truth. If the email provider returns an error, it is gracefully logged server-side, returning an 'emailSent: false' flag without rolling back the saved enquiry."),
         
        ("5. Stateless JWT Authentication",
         "Administrative access is authenticated through signed JSON Web Tokens transmitted via standard HTTP Authorization Bearer headers. This eliminates server-side session memory, ensuring the API remains completely stateless and robust against horizontal replication."),
         
        ("6. Defense-in-Depth Security & Rate Limiting",
         "The backend employs Helmet for security header hardening, express-rate-limit to protect against brute-force attacks and enquiry form spam, bcrypt for one-way password hashing with salt rounds, and sanitized error boundaries that never leak database credentials or internal stack traces.")
    ]

    for title, desc in decisions:
        story.append(Paragraph(title, h2_style))
        story.append(Paragraph(desc, body_style))
        story.append(Spacer(1, 2))

    story.append(Spacer(1, 6))

    # 6. Verification Checklist
    story.append(Paragraph("6. Verification & Assessment Deliverables Checklist", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=border_color, spaceAfter=8))

    check_data = [
        [Paragraph("Item", table_header_style), Paragraph("Requirement", table_header_style), Paragraph("Status", table_header_style)],
        [Paragraph("<b>Live Website</b>", table_cell_style), Paragraph("Working, responsive Aurelia Palace website deployed to a public URL.", table_cell_style), Paragraph("<font color='#16A34A'><b>VERIFIED (Vercel)</b></font>", table_cell_style)],
        [Paragraph("<b>Source Code</b>", table_cell_style), Paragraph("Complete frontend + backend source code in public Git repository.", table_cell_style), Paragraph("<font color='#16A34A'><b>VERIFIED (GitHub)</b></font>", table_cell_style)],
        [Paragraph("<b>Database</b>", table_cell_style), Paragraph("Real persistent database implementation with migrations/seed scripts.", table_cell_style), Paragraph("<font color='#16A34A'><b>VERIFIED (Aiven MySQL)</b></font>", table_cell_style)],
        [Paragraph("<b>API Docs</b>", table_cell_style), Paragraph("Documented API endpoints and schemas used by the application.", table_cell_style), Paragraph("<font color='#16A34A'><b>VERIFIED (API_DOCS.md)</b></font>", table_cell_style)],
        [Paragraph("<b>README</b>", table_cell_style), Paragraph("Setup, architecture, environment variables, and deployment guide.", table_cell_style), Paragraph("<font color='#16A34A'><b>VERIFIED (README.md)</b></font>", table_cell_style)],
        [Paragraph("<b>Demo Credentials</b>", table_cell_style), Paragraph("Test administrative credentials provided for evaluation.", table_cell_style), Paragraph("<font color='#16A34A'><b>VERIFIED (admin123)</b></font>", table_cell_style)],
        [Paragraph("<b>Technical Note</b>", table_cell_style), Paragraph("Comprehensive documentation explaining major technical decisions.", table_cell_style), Paragraph("<font color='#16A34A'><b>VERIFIED (TECHNICAL_DECISIONS.md)</b></font>", table_cell_style)]
    ]

    check_table = Table(check_data, colWidths=[110, 274, 120])
    check_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), primary_color),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor("#F8F7F4")]),
        ('GRID', (0, 0), (-1, -1), 0.5, border_color),
    ]))
    story.append(check_table)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF generated successfully: {output_filename}")

if __name__ == '__main__':
    create_report('C:/AURELIA PALACE/Aurelia_Palace_Submission_Report.pdf')
