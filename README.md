# VisaHOBe AI Assistant

Premium AI operating dashboard for VisaHOBe Pte. Ltd. to manage visa clients, passport data, document generation, employee workflows, and print-ready A4 visa documentation.

## Core Modules

- AI Assistant Dashboard for company operations
- Passport information intake and extraction workflow
- Visa document generator for A4 print-ready files
- Client case management pipeline
- Country workflow cards for Australia, Serbia, Malta, Moldova, Saudi Arabia, UAE, Malaysia, Singapore, New Zealand, Kuwait, Bahrain, Montenegro, and Cambodia
- Employee learning and onboarding hub
- PDF preview and export preparation

## Design Direction

The interface should feel premium, clean, cinematic, and professional:

- Dark navy foundation with orange and bright-blue accents
- Perplexity-style AI command center layout
- Mobile-first responsive dashboard
- Large cards, soft shadows, rounded panels, clear typography
- Visa consultancy focused content architecture

## Recommended Stack

- React / Vite or Next.js
- TypeScript
- Tailwind CSS
- Framer Motion
- jsPDF or server-side PDF rendering
- OCR layer for passport image extraction
- LLM API layer for document drafting and workflow guidance

## Environment Variables

Create a `.env` file from `.env.example` when the implementation starts.

```bash
VITE_APP_NAME="VisaHOBe AI Assistant"
VITE_COMPANY_NAME="VisaHOBe Pte. Ltd."
VITE_SUPPORT_EMAIL="support@visahobe.com"
```

## Build Goal

This repository should become a full internal VisaHOBe company software system where employees can upload passport data, add applicant information, preview generated visa documents, and export professional A4-ready files for review and submission.

## Next Development Steps

1. Build the dashboard shell.
2. Add client intake form.
3. Add passport OCR placeholder module.
4. Add visa document template builder.
5. Add A4 PDF preview page.
6. Add AI chat assistant panel.
7. Add employee onboarding and learning hub.

## Important Note

All generated documents must be used responsibly. The system should support lawful, accurate, client-approved documentation only. It must not create fake identities, fake government records, or misleading visa evidence.
