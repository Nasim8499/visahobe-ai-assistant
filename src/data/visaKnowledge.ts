export const visaKnowledge = {
  brand: "VisaHOBe",
  purpose: "Company-only visa document workflow knowledge for lawful consultant operations.",
  defaultOutput: "Every document workflow must be structured for A4 print-ready review.",
  rules: [
    "Use accurate client-provided information only.",
    "Never create fake identities, fake government records, forged bank statements, false employment proof, or misleading evidence.",
    "Every generated visa document must include consultant review before submission.",
    "Prefer clean A4 layout: title, applicant summary, checklist, supporting evidence table, consultant notes, and QA status.",
    "Keep all client data private and avoid unnecessary exposure in UI previews.",
    "Separate draft documents from final reviewed documents.",
    "When a rule is country-specific, show checklist guidance instead of pretending final legal advice."
  ],
  documentPacks: [
    "Visa cover letter",
    "Client checklist",
    "Passport data summary",
    "Travel plan summary",
    "Employment/support note",
    "Consultant QA review",
    "Document readiness report"
  ],
  countries: [
    "Australia",
    "Serbia",
    "Malta",
    "Montenegro",
    "Moldova",
    "Saudi Arabia",
    "Kuwait",
    "Bahrain",
    "United Arab Emirates",
    "Malaysia",
    "Cambodia",
    "Singapore",
    "New Zealand"
  ],
  promptDefaults: [
    "Prepare an A4-ready visa checklist for this applicant.",
    "Create a consultant QA note for missing visa documents.",
    "Draft a lawful cover letter structure using only verified client information.",
    "Summarize passport data and flag fields that need manual review.",
    "Build a country workflow checklist for consultant review."
  ]
} as const;
