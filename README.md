# 🏥 MediSphere Clinic — Premium Healthcare Portal & CMS

[![Netlify Status](https://api.netlify.com/api/v1/badges/e8c8959d-6490-482a-a92c-806734185794/deploy-status)](https://moonlit-tulumba-2f93a7.netlify.app/)
[![Tech Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20JavaScript-blue)](https://github.com/raoshmi/medisphere-clinic)
[![PWA](https://img.shields.io/badge/PWA-Installable%20%7C%20Offline-teal)](https://github.com/raoshmi/medisphere-clinic)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

MediSphere Clinic is a premium, high-fidelity Single Page Web Application (SPA) designed as a recruiter-tier internship portfolio. Built using pure Vanilla Javascript, CSS3, and HTML5, it delivers a comprehensive, state-of-the-art Patient Hub Portal and a full-featured administrative Staff console with a CMS editor and dynamic analytics dashboard.

🔗 **Live Netlify Demo**: [https://moonlit-tulumba-2f93a7.netlify.app/](https://moonlit-tulumba-2f93a7.netlify.app/)  
🔗 **GitHub Repository**: [https://github.com/raoshmi/medisphere-clinic](https://github.com/raoshmi/medisphere-clinic)

---

## 🌟 Key Features

### 💻 Patient Hub Portal
* 🔑 **Zero-Login Verification**: Patients can verify their identity using just their **Full Name** and **Phone Number** matching an active appointment.
* 📅 **Self-Serve Actions**: In-line tools to **cancel** appointments or **reschedule** dates/times (resets status to pending for staff review).
* 🕒 **Interactive Consultation Timelines**: Clear, chronological feed displaying past, active, and pending consultations with live status badges.
* 🌐 **Dynamic Hindi & English Selector**: Seamless translation toggle in the navbar that dynamically swaps all text nodes, physician bios, services, and dynamic lists instantly with zero visual flicker.

### 📊 Staff Console & CMS Dashboard
* 🔒 **SHA-256 Hashed Login Gate**: Highly secure staff auth utilizing pure-JS SHA-256 cryptographic hashes—no plain-text credentials stored in client source code.
* 📈 **Interactive Chart.js Dashboard**: Three advanced data widgets computing and displaying:
  1. *Consultations Trend*: Live count of bookings for the past 7 days.
  2. *Specialist Distribution*: Doughnut chart mapping clinical service loads.
  3. *OPD Peak Load Heatmap*: Horizontal chart illustrating appointment densities across Morning, Afternoon, and Evening slots.
* 🗃️ **Full-Featured CRUD CMS**: Add, edit, or delete Specialties, Physicians profiles, Testimonials, and published Health Journal Articles instantly with live UI updates.

### ⚡ Premium Engineering & PWA
* 📱 **Progressive Web App (PWA)**: Desktop/mobile standalone installable configurations with custom maskable icons and custom background parameters.
* 🔌 **Offline Caching Service Worker**: Cache-first asset strategy storing Google fonts, core stylesheets, logic, and external dependencies (like Chart.js) for fully responsive offline utility.
* 🔐 **Base64 + XOR Local Storage Encryption**: Patient names, phones, and concerns are obfuscated in transit to prevent local browser-snooping.
* ♿ **WCAG Accessibility (WCAG 2.1 AA)**: 
  * Font-scaling toolbar (`A+` and `A-`) rescaling the site root proportionally.
  * Contrast Mode (**🌓**) shifting the UI to strict black, high-contrast yellow labels, visual focus outlines, and defined borders.
  * Accessibility & i18n configurations are saved and restored on page refresh.
* 💬 **Floating SMS Toast Simulator**: Real-time slide-in toasts notifying users of successful bookings, cancellations, confirmations, and reschedules.

---

## 🛠️ Technology Stack

* **Core**: HTML5 (Semantic Structure), Vanilla JavaScript (ES6+ State Engine).
* **Styling**: Modern CSS3 (Variables, Custom Themes, Flexbox/Grid, Keyframe Animations).
* **Analytics**: [Chart.js](https://www.chartjs.org/) via CDN.
* **PWA**: Web Manifest (`manifest.json`) & Service Worker APIs (`sw.js`).
* **Fonts & Icons**: Google Fonts (Playfair Display, DM Sans) & Fluent emojis.
* **Hosting**: Netlify (CI/CD integrated).

---

## 🔒 Administrative Login Credentials

To evaluate the comprehensive Staff Console and CRUD CMS, log in using the secured credentials below:

> [!IMPORTANT]
> **Staff Portal Credentials**  
> * **Username**: `admin`  
> * **Password**: `admin123`  
> *(Password is verified cryptographically via SHA-256 inside `admin.js`)*

---

## 📸 Interface Screenshots Description

* **Landing Homepage**: Premium typography layout featuring a dynamic quick-booking card, specialties directory, interactive wellness articles feed, and customer review slideshow.
* **Patient Hub Portal**: Timelines containing scheduled consults, self-serve rescheduling date fields, and cancellation prompts.
* **Analytics Console**: Three Chart.js canvas boards rendering active data bars, doughnut divisions, and heatmaps.
* **CMS Slide-out CRUD Panels**: Form controls enabling clinic admins to update profiles and upload custom article cards in real-time.
* **High Contrast & Font Scale**: Demonstrates the accessibility toolbar adapting font proportions and contrast schemes.

---

## ⚙️ Installation & Local Setup

Since the project uses a pure Vanilla stack, you do not need complex compilation steps or bundlers. Follow the guides below:

### 1. Clone the repository
```bash
git clone https://github.com/raoshmi/medisphere-clinic.git
cd medisphere-clinic
```

### 2. Run a local web server
To test PWA caching, service workers, and local storage state, run the project on a local server environment (avoid double-clicking the `index.html` file).

**Using Node.js (`http-server`)**:
```bash
# Install http-server globally if you don't have it
npm install -g http-server

# Run the server
http-server -p 8080 -c-1
```

**Using Python**:
```bash
# For Python 3.x
python -m http.server 8080
```

### 3. Open in Browser
Visit **[http://127.0.0.1:8080](http://127.0.0.1:8080)** to explore the live application!

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
