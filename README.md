# 🚀 THE LAST CREWMATE — Collegiate Live-Action Event Landing Page

> *"Trust no one. Complete the mission."*

A production-ready, sci-fi landing page built for an upcoming Among Us-themed college mystery and sabotage event. Built with **React 19**, **Vite**, **Custom CSS**, and **Lucide Icons**.

---

## 🛰️ Project Overview & Creative Concept

- **Event Theme**: "THE LAST CREWMATE" — A live-action campus deduction and puzzle hunt where 120 students are divided into squads to repair campus subsystems while ferreting out covert impostors.
- **Visual Aesthetic**: Cinematic deep space palette (`#0B1020`), emergency red accents (`#F45858`), reactor gold highlights (`#FFD166`), and electric cyan HUD visors (`#67C9F5`).
- **Original Illustrations**: Pure scalable vector SVG crewmate with customizable suit colors, dynamic visor glares, and atmospheric floating particles.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite 8
- **Icons**: Lucide React + Custom Inline SVGs
- **Styling**: Custom CSS with design tokens, responsive CSS grid, flexbox, and terminal scanline effects
- **Code Quality**: Oxlint (0 warnings, 0 errors)
- **Audio Effects**: Safe, synthesized Web Audio API for emergency sirens (zero broken external audio files)

---

## 📁 Project Architecture & Components

```
amongus-spark/
├── public/
│   ├── favicon.svg               # Custom Among Us visor vector favicon
│   └── icons.svg
├── src/
│   ├── assets/                   # Local assets & logos
│   ├── components/
│   │   ├── Navbar.jsx            # Sticky navigation with visor emblem, status pill & mobile drawer
│   │   ├── Hero.jsx              # Oversized headline, dual CTAs, live countdown, suit previewer
│   │   ├── EmergencyBanner.jsx   # Interactive "Emergency Meeting" siren & sound toggle
│   │   ├── EventBriefing.jsx     # Mission Control terminal & format highlights matrix
│   │   ├── MissionCards.jsx      # 3 distinct mission cards with hover micro-interactions
│   │   ├── EventSchedule.jsx     # Vertical timeline with checkpoint markers & location nodes
│   │   ├── ParticipationRules.jsx# Code of conduct cards & accessible FAQ accordion
│   │   ├── RecruitmentSection.jsx# On-page Sector 07 airlock terminal gateway
│   │   ├── RegistrationModal.jsx # Full-screen backdrop-blurred recruitment modal popup
│   │   ├── CrewmateIllustration.jsx # Parametric SVG Crewmate with custom color palettes
│   │   ├── Starfield.jsx         # Lightweight ambient canvas starfield (reduced-motion safe)
│   │   └── Footer.jsx            # Branding, club placeholders, back-to-top & trademark disclaimer
│   ├── data/
│   │   └── eventConfig.js        # Single source of truth for all organizer content & placeholders
│   ├── services/
│   │   └── registrationService.js# Isolated submission handler ready for backend integration
│   ├── App.jsx                   # Semantic page assembly
│   ├── App.css                   # Component-level sci-fi styling & responsive breakpoints
│   ├── index.css                 # Design tokens, typography, buttons, accessibility resets
│   └── main.jsx                  # Application entry point
├── .env.example                  # Environment variable template with security guidelines
├── .gitignore                    # Hardened git ignore (.env, dist, node_modules)
├── index.html                    # SEO metadata, Open Graph tags, Space Grotesk font links
└── package.json
```

---

## ⚡ How to Run Locally

### Prerequisites
- Node.js (v18+ recommended; tested on v24)
- npm

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Run Linting
```bash
npm run lint
```

### 4. Build for Production
```bash
npm run build
```
The optimized bundle will be generated in `dist/`.

### 5. Preview Production Build
```bash
npm run preview
```

---

## ⚙️ How to Change Event Details

All customizable content is located in a single file:
👉 **[`src/data/eventConfig.js`](file:///c:/Users/PIYUSH%20PRATAP%20SINGH/Documents/GitHub/amongus-spark/src/data/eventConfig.js)**

To update event dates, venue, rules, or contact information, edit the fields in `EVENT_CONFIG`:

```javascript
export const EVENT_CONFIG = {
  title: "THE LAST CREWMATE",
  tagline: "Trust no one. Complete the mission.",
  eventDate: "Friday, November 14, 2026",
  eventTime: "5:30 PM – 9:30 PM (IST)",
  venue: "Central Campus Quad & Science Atrium",
  organizer: {
    clubName: "Campus Gaming & Creative Tech Society",
    email: "crew-operations@campusgaming.edu",
    discordUrl: "https://discord.gg/your-actual-link",
    instagramUrl: "https://instagram.com/your-actual-handle",
    // ...
  }
};
```

---

## 📋 Registration Workflow & Backend Integration

### Current Behavior (Honest Demo Mode)
- The registration terminal includes full client-side validation:
  - Required fields: Full Name (min 2 chars), College Email (pattern match), Department, and Rules agreement.
  - Squad mode: Requires a squad name when selected.
  - Suit preview: Allows recruits to pick their crew color.
- **No False Claims**: An explicit banner informs users that this is a client-side demo terminal.
- **Boarding Pass**: Upon successful validation, the terminal generates an interactive **Crewmate Identity Pass** with a randomized callsign (`CREW-XXXX`), timestamp, barcode visual, and chosen suit color.

### Connecting a Real Backend
The submission logic is isolated in [`src/services/registrationService.js`](file:///c:/Users/PIYUSH%20PRATAP%20SINGH/Documents/GitHub/amongus-spark/src/services/registrationService.js).
To connect a live endpoint:
1. Update `submitRegistrationData` in `src/services/registrationService.js`:
   ```javascript
   export const submitRegistrationData = async (formData) => {
     const response = await fetch(import.meta.env.VITE_REGISTRATION_ENDPOINT, {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(formData)
     });
     if (!response.ok) throw new Error('Registration failed');
     return await response.json();
   };
   ```
2. Set `VITE_REGISTRATION_ENDPOINT` in your local `.env` (never commit secrets!).

---

## 📌 Items Requiring Organizer Review & Input

Before publishing the final site, organizers should review and replace the following placeholder items in [`src/data/eventConfig.js`](file:///c:/Users/PIYUSH%20PRATAP%20SINGH/Documents/GitHub/amongus-spark/src/data/eventConfig.js):
1. **Confirmed Event Date & Time**: Ratify the exact date with student affairs.
2. **Campus Room Allocations**: Confirm specific room numbers for check-in and sabotage stations.
3. **Official Registration Portal Link**: Link to the college's approved Google Form, Microsoft Form, or club ticket portal.
4. **Club Social URLs**: Replace placeholder Discord, Instagram, and GitHub links.
5. **Safety Marshal Guidelines**: Verify university rules regarding evening outdoor activities.

---

## 🚢 Production Deployment Guide

### Deploying via GitHub & Vercel

1. **Commit Local Changes to Git**:
   ```bash
   git add .
   git commit -m "feat: complete Among Us event landing page with interactive terminal"
   ```

2. **Push to your GitHub Repository**:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```

3. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in.
   - Click **"Add New Project"** and import your GitHub repository.
   - Framework preset: **Vite** (automatically detected).
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Click **Deploy**. Your site will be live on an HTTPS custom domain or `*.vercel.app` URL within 30 seconds!

---

## ⚖️ Legal & Trademark Notice

Among Us is a registered trademark of Innersloth LLC. This student event landing page is an independent, collegiate non-profit fan initiative and is not affiliated with, endorsed by, or sponsored by Innersloth LLC.
