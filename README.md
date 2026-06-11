# FILMBY ODD_ONE_ADS Portfolio Website

This is the premium, high-performance photography and videography portfolio website for **FILMBY ODD_ONE_ADS**. It features a modern, luxury wedding brand aesthetic with a dark charcoal palette, gold highlights, glassmorphic overlays, and smooth animations.

## Tech Stack
* **Framework**: Next.js 15 (App Router)
* **Language**: TypeScript
* **Styling**: Tailwind CSS v4 & Custom CSS Utilities
* **Animations**: Framer Motion
* **Icons**: Lucide Icons

---

## Features

### 🎥 Cinema-Style Homepage
* Full-screen hero section with Ken Burns zooming banner, looping scroll indicator, and gold call-to-actions.
* Multi-column masonry portfolio gallery.
* Animated client reviews carousel with manual controls and auto-sliding.
* Rich statistial grids displaying global milestones (India • UK • Dubai).

### 📸 Dynamic Photo & Video Galleries
* Category-filtered photo masonry gallery with a fully interactive, keyboard-navigable Lightbox (prev/next controls, ESC close support).
* Video showcase categorized by highlight and destination reels, with cover images, hover highlights, and custom embedded modal players.

### 📖 Magazine-Style Stories
* Editorial compilations of destination celebrations designed like a premium luxury magazine spread.
* Multi-column typographic structures, side-by-side photo layouts, and embedded wedding movies.

### 💬 AI Concierge Chatbot
* Fixed floating chatbot panel at the bottom-right of the screen.
* Styled with premium dark-glass aesthetics (`backdrop-blur`).
* Predefined Q&A prompts with dynamic simulated writing indicators.
* Interactive custom user inputs with automated coordinator routing alerts.

### 📋 Luxury Booking Planner
* Responsive multi-field consultation form capturing budget, location, date, event type, and custom visions.
* Interactive load states and full-screen confirmation cards.
* Prominent direct hotline listings (+91 9497381830) and WhatsApp coordination channels.

---

## Directory Structure
```text
├── public/                # Static assets & favicon
└── src/
    ├── app/               # Next.js App Router Page components
    │   ├── about/         # About page
    │   ├── contact/       # Contact & booking planner
    │   ├── films/         # Cinematic video grids
    │   ├── portfolio/     # Category-filtered photo grid & lightbox
    │   ├── stories/       # Editorial journal case studies
    │   ├── globals.css    # Tailwind v4 import & custom glass utilities
    │   ├── layout.tsx     # Typography configurations & layout shell
    │   └── page.tsx       # Interactive Homepage
    ├── components/        # Shared components (Navbar, Footer, AiConcierge)
    └── data/              # Core dataset models & data content
```

---

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

4. Run a production build test:
   ```bash
   npm run build
   ```
