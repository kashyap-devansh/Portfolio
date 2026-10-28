# Devansh Kashyap — Portfolio

Personal portfolio built with React, Vite, Framer Motion and Lenis.

```bash
npm install
npm run dev     # local dev server
npm run build   # production build in dist/
```

## Editing content

All copy, projects, skills and links live in `src/data/site.js`.
To add LinkedIn, set `profile.linkedin` there and it appears in the footer and contact section.

## Design

- **Palette (60/30/10):** warm neutral surface, ink, and a single signal orange accent. Each project
  also carries a hue lifted from its artwork that only appears on hover.
- **Type:** Archivo (display), Instrument Serif italic (accents), Geist Mono (HUD labels).
- **Themes:** dark by default with a light toggle in the navbar, remembered per browser.
- **Motion:** masked word reveals, scroll-scrubbed text, parallax, magnetic buttons, and a live terminal.
  All of it respects `prefers-reduced-motion`.
