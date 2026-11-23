# Farrukh Bashir — Developer Portfolio

A world-class, high-performance personal developer portfolio for **Farrukh Bashir** — ServiceNow Developer and Software Engineer.

**🔗 Live site:** [farru11.github.io/farrukh-portfolio](https://farru11.github.io/farrukh-portfolio/)

---

## 🎨 Visual Identity & Design System

- **Color Palette (Sophisticated Dark Theme - Primary)**:
  - Deep Charcoal Background: `#0B0D12`
  - Secondary Background: `#121620`
  - Elevated Surface: `#171C28`
  - Primary Text: `#F5F6FA` (Soft White)
  - Secondary Text: `#A0A7B4` (Muted Grey)
  - Primary Accent: `#6C8CFF` (Electric Blue)
  - Secondary Accent: `#58D5E8` (Soft Cyan)
  - Success / Live Telemetry: `#10B981` (Emerald)
- **Carefully Designed Light Theme**: Complete high-contrast light theme switchable via the moon/sun toggle.
- **Editorial Typography**: Inter with JetBrains Mono accents, clean visual hierarchy, and generous whitespace.
- **Zero Heavy Dependencies**: Pure semantic HTML5, modern mobile-first CSS3, and vanilla JS. Fast loading, zero layout shifts.

---

## 📁 Sections & Features

1. **Hero Section**:
   - Introduction: `"HELLO, I'M FARRUKH BASHIR"`
   - Heading: `"Building Smarter Digital Experiences Through ServiceNow & Software Engineering."`
   - Description & Domain Pills (*ServiceNow Developer*, *Software Engineer*, *ITSM | HRSD | CSM | GRC | ITOM*).
   - Direct CTA buttons: `Explore My Work` and `Download My Resume`.
   - Live availability indicator: `🟢 Available for Enterprise ServiceNow & Engineering Roles`.
   - Technical architecture node flow visual (Virtual Agent AI ⇄ Flow Designer ⇄ MID Server ⇄ CMDB ⇄ IRM).
2. **About Me**:
   - Exact biographical narrative from Farrukh's CV.
   - Highlights: 2+ Years Experience, 50% HR Case Deflection via AI, 40% Audit Prep Time Saved.
3. **Technical Expertise**:
   - Grouped cards for: *ServiceNow Platform*, *Development*, *Automation & Integration*, and *Tools & Technologies*.
   - Honest, tag-based presentation (no misleading percentage bars).
4. **Professional Experience**:
   - **ServiceNow Developer** — Xaas Solutions LLC (Pvt) Ltd (August 2024 – Present).
   - **Python Developer Intern** — ITSOLERA PVT LTD (June 2023 – December 2023).
   - Detailed achievements covering ITSM, Employee Center, Virtual Agent, CSM, Performance Analytics, MID Server CMDB Discovery, Twilio CTI, IRM, ATF testing, and Now Mobile.
5. **Featured Projects (Selected Areas of Experience)**:
   - 6 interactive case studies with accessible `<dialog>` architecture modals:
     1. *Enterprise ITSM Workflow Automation*
     2. *Employee Center & HR Service Delivery (50% Deflection)*
     3. *ServiceNow CMDB Discovery & Integrations (Windows MID Server & Azure AD)*
     4. *Customer Service Management Portal & Twilio CTI*
     5. *Integrated Risk Management (IRM) Solutions*
     6. *Performance Analytics Dashboards*
6. **Web Projects**:
   - Personal builds with live demos and source: CoinBounce, Employee Job Portal, VitalCare store, E-Commerce shop, MERN ToDo.
7. **Certifications & Education**:
   - ServiceNow CIS - Data Foundations (CIS-DF).
   - ServiceNow Performance Analytics Badge.
   - ServiceNow Expert Administrator Micro-Cert.
   - BS Computer Science from Riphah International University (Dean's Award for Academic Excellence).
8. **Contact Section**:
   - Heading: `"Have a project or opportunity in mind? Let's connect."`
   - Verified contact details: `farrukhawan62@gmail.com`, `+92 310-4225553`, `Lahore, Pakistan`.
   - Contact form with validation. Uses Formspree when configured, otherwise opens the visitor's email app with the message pre-filled.
9. **Direct Resume Download**:
   - Downloads Farrukh Bashir's actual 4-page CV (`assets/Farrukh_Bashir_Resume.pdf`).

---

## 🚀 How to Run Locally

### Option 1: One-Click in Finder (macOS)
Double-click [`start.command`](./start.command) inside this directory to start the server and open your browser automatically.

### Option 2: Python HTTP Server
```bash
python3 -m http.server 8080
```
Then visit: 👉 **[http://localhost:8080](http://localhost:8080)**

---

## 🌐 Contact Form Configuration (Formspree)
In [`index.html`](./index.html), locate the contact form on line ~430:
```html
<form id="contactForm" action="https://formspree.io/f/YOUR_FORMSPREE_ID">
```
To receive submissions directly to your email inbox, create a free form at [formspree.io](https://formspree.io) and replace `YOUR_FORMSPREE_ID` with your Formspree Form ID.
*(If not configured, the form opens the visitor's email app with their message ready to send, so messages are never silently lost.)*

---

## 🚀 Deploy (GitHub Pages)

**Settings > Pages > Deploy from a branch > `main` / root.** The site is served at `https://farru11.github.io/farrukh-portfolio/`.
