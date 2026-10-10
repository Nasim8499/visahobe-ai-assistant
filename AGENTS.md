# Architecture rules
- Keep UI-phase workspaces and conversations in React session state, scoped by workspace and agent; this prevents cross-agent transcript leakage without claiming durable storage.
- Compose chat transcripts, messages, composer, and loading states from installed AI Elements primitives; this keeps the visible chat compatible with standard AI SDK interfaces.
- Define light/dark and agent colors as semantic global CSS tokens; this keeps the agency's theme consistent across pages.
- Keep live AI execution and external service calls out of the UI preview; these require separately configured secure services and human approval boundaries.
