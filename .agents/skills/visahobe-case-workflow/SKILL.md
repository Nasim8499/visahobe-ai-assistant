---
name: visahobe-case-workflow
description: Use when working on any VisaHOBe visa case, lead, applicant, document, or approval flow. Triggers on "visa case", "lead", "applicant", "dossier", "document checklist", "approval", "submission", or building any screen/feature in the VisaHOBe pipeline.
---

# VisaHOBe Case Workflow

The mandated lifecycle for every visa case, plus the safety rules that surround it. Follow this whenever building or modifying case, lead, document, finance, or approval features.

## When to use
- Creating or editing a lead, applicant, or case
- Building document upload, OCR extraction, or field verification
- Anything touching application preparation, portal prefill, submission, or payment
- Approvals, audit logging, or status tracking

## Workflow (case lifecycle)

Every case moves through these stages in order. Never skip consent, human verification, or owner approval:

1. **Lead intake** → record lead; capture **consent** with timestamp before anything else.
2. **Consultation** → produce a **verified eligibility checklist** (verified sources only; stale/unverified knowledge is flagged, never used as final advice).
3. **Written service scope and quote** → from the approved price catalogue only; no invented fee tables.
4. **Approval** → client approves scope/quote.
5. **Applicant account** → create applicant record linked to the organisation.
6. **Documents** → private upload with size/type checks; OCR produces a **draft** only.
7. **Human verification** → a human verifies extracted fields. Unverified OCR NEVER overwrites verified names/fields. Document comparison shows original left, extracted fields right, with source and confidence.
8. **Application preparation** → draft the application from verified data.
9. **Authorised browser prefill** → draft/prefill only where the portal permits; domain allowlists, isolated sessions, bounded steps, redacted screenshots, visible Stop.
10. **Final review** → human reviews the complete draft.
11. **Owner-approved submission/payment** → submission and payment require explicit owner approval. Approval binds actor, exact operation, destination, data hash, resource ID and expiry; editing the payload invalidates it.
12. **Status tracking → decision record → retention/deletion.**

## Hard rules (never violate)

- Visa approval is never promised. Embassies and authorities decide.
- Never invent facts, employment letters, bank balances, bookings, or official documents.
- Pause at OTP, CAPTCHA, identity verification, or consent screens — no bypass.
- A portal without a tested adapter is marked **Unsupported**, not automated.
- Payments are marked paid only after a verified webhook or finance evidence.
- Reports are calculated from the database — never fabricated metrics.
- Disconnected channels show "Not connected", never success.

## Portal access model

- **Master admin**: organisations, agent studio, browser sessions, integrations, approvals, budgets, audit logs.
- **Agency admin/staff**: own organisation's clients, leads, cases, documents, appointments, tasks, finance, reports, team, branding. No agent credentials or execution controls.
- **Applicant**: own cases, requested uploads, approved documents, payments, appointments, messages only.
- **Employer**: invited recruitment cases only (phase 2).

## Data & security conventions

- All tenant business rows carry `organisation_id`; applicant-facing records link `applicant_id`.
- Deny-by-default RLS; a client-supplied tenant ID is not authorisation. Users never set their own role or organisation.
- No service-role key in the browser. LLM keys are server-only.
- Secrets (passwords, API keys, OTPs, session cookies) never appear in prompts, PDFs, the repository, logs, screenshots, or localStorage.

## Validation

A case feature is correct when: stage transitions follow the allowed order with immutable history; unverified OCR cannot overwrite verified fields; unauthorised cross-tenant requests fail; an approved payload that changes requires a new approval; and no screen promises visa approval.
