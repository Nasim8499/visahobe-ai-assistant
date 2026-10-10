export const AGENTS = [
  { id: "dola", name: "Dola", role: "Team manager", initial: "D", color: "agent-mint", specialty: "Planning & delegation", prompts: ["Plan today's agency priorities", "Prepare a team briefing", "Review the agency workflow"] },
  { id: "mira", name: "Mira", role: "Visa researcher", initial: "M", color: "agent-blue", specialty: "Countries & requirements", prompts: ["Prepare a Serbia visa research checklist", "Compare country requirements", "List sources to verify visa fees"] },
  { id: "dia", name: "Dia", role: "Partnerships", initial: "D", color: "agent-violet", specialty: "Foreign partner outreach", prompts: ["Draft a partner introduction email", "Create a partner due diligence checklist", "Prepare a partnership follow-up"] },
  { id: "tisha", name: "Tisha", role: "Applicant cases", initial: "T", color: "agent-rose", specialty: "Intake & case review", prompts: ["Prepare an applicant intake checklist", "Review missing applicant documents", "Draft an applicant status update"] },
  { id: "hena", name: "Hena", role: "Documents", initial: "H", color: "agent-orange", specialty: "A4 drafts & compliance", prompts: ["Prepare an A4 visa document checklist", "Draft a cover letter structure", "Create a compliance review checklist"] },
  { id: "nila", name: "Nila", role: "Marketing", initial: "N", color: "agent-lime", specialty: "Campaigns & leads", prompts: ["Plan a recruitment marketing campaign", "Draft a client follow-up message", "Create a weekly content calendar"] },
] as const;
export type AgentId = typeof AGENTS[number]["id"];