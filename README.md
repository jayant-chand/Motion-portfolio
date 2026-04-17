# 🎬 Motion Portfolio — Jayant Chand

A cinematic, scroll-driven personal portfolio built with **Next.js 16**, **Framer Motion 12**, and **Tailwind CSS v4**. Features a 300-frame canvas scrollytelling hero, smooth parallax overlays, and a dark-glassmorphism design system.

**Live:** [jayantchand.vercel.app](https://jayantchand.vercel.app) *(deploy URL — update after deploy)*

---

## ✨ Features

- **🎞️ Canvas Scrollytelling Hero** — 300 PNG frames rendered on canvas, scrubbed frame-by-frame on scroll via Framer Motion `useScroll` + `useMotionValueEvent`. DPR-aware for Retina displays.
- **🎭 Parallax Overlays** — Three text panels animate independently using `useTransform` at different scroll breakpoints.
- **🧭 Floating Nav** — Minimal left-side navigation (About · Experience · Projects · Contact) that fades in after the hero, without a bar or background.
- **📂 Projects Grid** — 4 cards (InvoiceHub, Deepfake Detection, Wanderly.AI, IEEE Publication) with AI-generated backgrounds and hover-reveal details.
- **🛠️ Infinite Tech Carousel** — Two rows scrolling in opposite directions with gradient masks.
- **👤 About Me** — Bio, location (Bangalore), VTU education tag, animated neural-network SVG.
- **📅 Experience Timeline** — 3 roles: Aaptekno US LLP, Rooman Technologies, CR Technologies.
- **📬 Footer CTA** — mailto link, resume download, GitHub + LinkedIn.
- **🌐 Fully Responsive** — Mobile-first across all sections.

---

## 🗂️ Project Structure

```
portfolio/
├── public/
│   ├── sequence/          # 300 PNG frames (frame_000 → frame_299)
│   ├── projects/          # Project card images
│   └── resume.pdf         # Your resume (add manually)
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   └── components/
│       ├── FloatingNav.tsx    # Fixed left-side nav
│       ├── ScrollyCanvas.tsx  # Canvas scrollytelling + frame loader
│       ├── Overlay.tsx        # Parallax text panels
│       ├── Projects.tsx       # Selected works grid
│       ├── WhatIDo.tsx        # Services cards
│       ├── Arsenal.tsx        # Infinite tech-stack carousel
│       ├── AboutMe.tsx        # Bio section
│       ├── Experience.tsx     # Work timeline
│       └── FooterCTA.tsx      # Contact + social links
```

---

## 🧰 Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Animation | Framer Motion 12 |
| Styling | Tailwind CSS v4 |
| Icons | React Icons 5 + Lucide React |
| Runtime | React 19 |

---

## 🚀 Getting Started

```bash
cd portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🌐 Deployment (Vercel)

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) → Import repo
3. Set **Root Directory** → `portfolio`
4. Click **Deploy** — no env variables needed

---

## 👤 Author

**Jayant Chand**  
Software Developer · Python · Django · FastAPI · Rust · AI/ML

[![GitHub](https://img.shields.io/badge/GitHub-jayant--chand-181717?logo=github)](https://github.com/jayant-chand)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-jayant--chand-0A66C2?logo=linkedin)](https://linkedin.com/in/jayant-chand)

📧 jayantchand2379@gmail.com

---

## 📄 License

MIT
