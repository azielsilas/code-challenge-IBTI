# Submission

## Assumptions & priorities

- Priority order:
  1. Make rendering of default `data` resilient and runtime-safe.
  2. Replace centralized section dispatch with an extensible renderer registry.
  3. Normalize inconsistent/legacy payloads before UI rendering.
  4. Enforce explicit TypeScript models and per-section component boundaries.
  5. Deliver required `metric` support (`label` + `value`) end-to-end.
- Explicit out-of-scope:
  - Full runtime schema validation with detailed field-level diagnostics.
  - Visual design system and advanced accessibility pass beyond semantic structure.
  - Full support for future list contract variants like `deprecatedLabel`.
  - Production telemetry/analytics for unsupported section types.
- With more time:
  1. Add unit tests for normalization and registry behavior.
  2. Add integration tests covering default payload plus fixtures.
  3. Introduce schema validation (for example, Zod) and versioned payload adapters.

## What I changed and why

- Refactored the implementation into clear layers:
  - Domain model: `src/domain/report/model.ts`
  - Payload normalization: `src/domain/report/normalize.ts`
  - Section components: `src/features/report-view/components/*`
  - Registry-based rendering: `src/features/report-view/section-renderer/registry.tsx`
  - Thin orchestration: `src/ResultView.tsx`
- Implemented required `metric` section support in model, normalization, renderer registry, and dedicated component.
- Added safe handling for unknown/invalid/partial sections through an explicit `unknown` model + dedicated fallback view.
- Removed `any` from runtime rendering flow and replaced with explicit raw vs normalized contracts.

Why:
- This keeps business rules out of presentational components.
- It scales by adding section types via registry entries instead of growing conditional chains.
- It de-risks rendering by converting ambiguous input into predictable normalized data.

## What I would improve next

- Add regression-focused tests for normalization and section rendering.
- Add stronger UX treatment for unsupported sections (copy, severity, observability hooks).
- Add stricter runtime contract enforcement at the boundary.

## How this scales to ~10x section types

- Keep the registry as the single dispatch extension point.
- Maintain one dedicated component per section type with local tests.
- Introduce feature-based module boundaries and optional lazy loading for heavy sections.
- Use versioned adapters to isolate contract drift from UI code.

## How unknown/invalid and ambiguous payloads are handled

- Missing or unsupported `type`:
  - Normalized to `unknown` with an explicit reason.
  - Rendered safely through `UnknownSectionView`.
- Legacy `text` shape (`body` instead of `content`):
  - Normalizer falls back to `body`.
- Mixed list item shapes:
  - Supports string and object items with valid `text`.
  - Ignores malformed entries without crashing.
- `list.items` null/missing:
  - Normalized to an empty list; rendered with a safe empty state.
- Duplicate section IDs:
  - React key uses `id:index` to avoid collisions.
- Potential XSS-like content:
  - Rendered as plain text (no `dangerouslySetInnerHTML`).

## Test strategy

- Unit tests:
  - `normalizeReport`:
    - legacy `body` fallback
    - missing `sections`
    - missing/unsupported `type`
    - mixed list items
    - invalid metric payload
  - Registry:
    - known type maps to expected section component
    - unknown type maps to fallback component
- Integration/component tests:
  - Render `ResultView` with default `data`.
  - Render `ResultView` with each fixture.
  - Validate graceful degradation paths for unknown/invalid sections.

## First production decision I would revisit

- Unknown section UX policy.
- The current fallback is intentionally safe and generic; in production I would define a stricter policy for visibility, user messaging, and telemetry so unsupported payloads can be monitored and triaged quickly.

## AI usage

- Tool used:
  - ChatGPT (Codex/GPT-5) as pair-programming assistant.
- How it was used:
  - To structure the refactor plan and prioritize within the time box.
  - To accelerate TypeScript architecture decisions (domain model, normalization, registry strategy).
  - To implement and revise code with focus on robustness, readability, and extensibility.
  - To draft and refine the delivery write-up.
- Validation responsibility:
  - Final decisions, trade-offs, and requirement alignment were reviewed and validated before completion.

## Execution time

- Start time: 2026-04-09 08:45
- End time: 2026-04-09 09:48
