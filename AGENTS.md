## Project Summary
Baba Indian Restaurant is a web platform for an authentic Indian restaurant located in Taichung, Taiwan. The project aims to provide a visually stunning and culturally rich online presence, highlighting their menu, services, and multiple branch locations.

## Tech Stack
- Frontend: HTML5, CSS3, JavaScript
- Frameworks: Bootstrap 5.3.3
- Animation: GSAP, Wow.js, Animate.css
- Icons: Font Awesome (all.min.css)
- Fonts: Cormorant Garamond (Serif), Hanken Grotesk (Sans-serif)
- Infrastructure: Static site served via Python http.server (dev)

## Architecture
- `/html`: Root directory for the web server.
- `/html/en`: English version of the site.
- `/html/css`: Global and custom stylesheets.
- `/html/images`: All visual assets (logos, dish photos, icons).
- `/html/js`: Vendor and custom scripts.

## User Preferences
- High-impact, distinctive frontend design (avoiding "AI slop" aesthetic).
- Use of "Cormorant Garamond" for elegant, traditional headers.
- Preference for warm, spiced color palettes (Deep Terracotta, Saffron Gold, Rich Chocolate).
- **NO EMOJIS** - Emojis look like AI-generated content; avoid them entirely.
- Pastel color palettes preferred for Gen-Z aesthetic designs.

## Project Guidelines
- Follow an "Aesthetic Indian" design philosophy: rich textures, intricate patterns (Mandala/Paisley), and warm lighting.
- Maintain a clean, professional layout while using bold accents.
- Responsive design is critical, especially for branch cards and menus.
- No comments in code unless explicitly requested.

## Common Patterns
- **Branch Information Cards**: Elegant, dark-themed cards with gold borders and subtle Indian motif backgrounds.
- **Section Headers**: Use of "•" prefix for subheaders and large, bold serif fonts for main titles.
- **Page Hero**: Simplified, high-impact design for secondary pages with solid Rich Chocolate (#451A03) background, bold all-caps Cormorant Garamond headers, and an accent-colored dot indicator.
- **Pill Tabs**: Custom rounded pill containers for branch selection and categories.
- **Menu Page (Gen-Z)**: Pastel gradient background, glassmorphism cards in bento grid layout, sticky category/filter pills, dietary badges (Veg, Vegan, GF), spice level dots (no emojis), smooth scroll animations. CSS in `menu-genz.css`.
