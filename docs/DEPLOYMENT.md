# Deployment Checklist

## Recommended target
Use Vercel or Netlify for the current Vite frontend.

## Build settings
- Install command: npm install
- Build command: npm run build
- Output directory: dist

## Required review before production
- Add real AI provider keys through the app API Keys page or backend environment.
- Connect the passport OCR provider.
- Connect secure file storage for client documents.
- Verify every generated visa document before client use.
- Keep the A4 print workflow enabled for consultant review.

## Current frontend-ready features
- Gemini-style white aurora background.
- Static background toggle.
- Background intensity slider.
- Reduced-motion support.
- Hidden-tab animation pause.
- Header preview button.
- A4 PDF/print workflow.
- VisaHOBe Brain Mushroom knowledge base.
