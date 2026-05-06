# Implementation Plan
**Health Equity Explorer – Interactive Data Story Prototype**

---

## Document Purpose

This plan breaks the prototype into discrete, reviewable phases. Each phase produces working deliverables that can be independently validated before moving forward. The plan is structured to:

- Enable iterative feedback at clear checkpoints
- Allow for modifications without disrupting completed work
- Maintain momentum through incremental progress
- Minimize token usage during reviews with concise approval prompts

---

## Pre-Implementation Sanity Check

**Complete before Phase 1:**

- [x] All design decisions resolved (DESIGN_ANALYSIS.md Section 7)
- [x] Tech stack confirmed (see Section below)
- [x] File structure defined (see Section below)
- [x] Dependencies identified (see Section below)
- [x] Design system specifications complete (DESIGN_SYSTEM.md)
- [x] Fictitious data parameters defined (25 neighborhoods, ranges specified)

---

## Technology Stack

### Core Framework
- **React 18+** with functional components and hooks
- **Next.js 14+** for routing, SSG/SSR capabilities, and optimization
- **TypeScript** for type safety

### Styling
- **CSS Modules** for component-scoped styles
- **CSS Custom Properties** for design tokens (from DESIGN_SYSTEM.md)
- Alternative: **Tailwind CSS** configured with custom theme matching design tokens

### Data Visualization
- **D3.js v7** for custom visualizations (map, scatter plot)
- **Recharts** or **Victory** for standard charts (bar chart) - simpler API, React-friendly
- **Mapbox GL JS** or **Leaflet** for choropleth map (Leaflet preferred for simplicity)

### Animations
- **Framer Motion** for scroll-triggered animations and transitions
- **Intersection Observer API** for detecting viewport entry

### Accessibility
- **React Aria** or **Radix UI** for complex components (dropdown, autocomplete)
- Native semantic HTML for simple components

### Development Tools
- **ESLint** + **Prettier** for code quality
- **axe DevTools** for accessibility testing during development

### Recommended: Next.js with CSS Modules + D3/Recharts + Framer Motion + React Aria

---

## Project File Structure

```
health-equity-explorer/
├── public/
│   ├── fonts/                    # Public Sans, Open Sans
│   ├── images/
│   │   ├── placeholder-agency-seal.svg
│   │   └── pattern-wave-background.svg
│   └── data/
│       └── neighborhoods.json    # Fictitious dataset
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Main page
│   │   └── globals.css           # Design tokens + reset
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   └── Button.module.css
│   │   │   ├── Input/
│   │   │   ├── Badge/
│   │   │   └── Divider/
│   │   ├── molecules/
│   │   │   ├── Card/
│   │   │   ├── MetricCard/
│   │   │   ├── FeatureCard/
│   │   │   ├── ChartContainer/
│   │   │   └── Tooltip/
│   │   ├── organisms/
│   │   │   ├── Navigation/
│   │   │   ├── Footer/
│   │   │   ├── HeroSection/
│   │   │   ├── ContextSection/
│   │   │   ├── InsightsGrid/
│   │   │   ├── MapSection/
│   │   │   ├── DisparitiesSection/
│   │   │   ├── RelationshipsSection/
│   │   │   └── ExploreSection/
│   │   └── visualizations/
│   │       ├── ChoroplethMap/
│   │       ├── HorizontalBarChart/
│   │       └── ScatterPlot/
│   ├── lib/
│   │   ├── data.ts               # Data loading/processing utilities
│   │   ├── stats.ts              # Statistical calculations (correlations, etc.)
│   │   └── formatters.ts         # Number/text formatting utilities
│   ├── types/
│   │   └── index.ts              # TypeScript type definitions
│   └── styles/
│       └── tokens.css            # Design token CSS variables
├── scripts/
│   └── generate-data.ts          # Script to generate neighborhoods.json
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

---

## Dependencies

### Production Dependencies
```json
{
  "react": "^18.3.0",
  "react-dom": "^18.3.0",
  "next": "^14.2.0",
  "d3": "^7.9.0",
  "d3-geo": "^3.1.0",
  "recharts": "^2.12.0",
  "leaflet": "^1.9.4",
  "react-leaflet": "^4.2.1",
  "framer-motion": "^11.1.0",
  "@radix-ui/react-select": "^2.0.0",
  "@radix-ui/react-tooltip": "^1.0.7"
}
```

### Development Dependencies
```json
{
  "typescript": "^5.4.0",
  "@types/react": "^18.3.0",
  "@types/node": "^20.12.0",
  "@types/d3": "^7.4.0",
  "@types/leaflet": "^1.9.8",
  "eslint": "^8.57.0",
  "eslint-config-next": "^14.2.0",
  "prettier": "^3.2.5",
  "@axe-core/react": "^4.9.0"
}
```

---

## Phase Structure Overview

| Phase | Name | Key Deliverables | Est. Duration |
|-------|------|------------------|---------------|
| 0 | Foundation Setup | Tokens, utilities, data generation | 0.5-1 day |
| 1 | Core Components | Atoms & molecules library | 1-1.5 days |
| 2 | Layout & Navigation | Header, footer, hero, section layouts | 1-1.5 days |
| 3 | Static Content Sections | Context, insights grid, section bands | 1 day |
| 4 | Data Visualizations | Map, bar chart, scatter plot | 2-3 days |
| 5 | Interactive Features | Neighborhood search, explore section | 1-2 days |
| 6 | Polish & Accessibility | Animations, a11y audit, refinements | 1-2 days |

**Total Estimated Duration:** 7.5-11 days

---

## Phase 0: Foundation Setup

### Deliverables
1. **Next.js project scaffolded** with TypeScript and recommended dependencies
2. **Design tokens implemented** as CSS custom properties (`src/styles/tokens.css`)
3. **Global styles and reset** applied (`src/app/globals.css`)
4. **Fictitious dataset generated** (`public/data/neighborhoods.json`)
5. **Data utilities created** (`src/lib/data.ts`, `src/lib/formatters.ts`)
6. **TypeScript types defined** for Neighborhood, HealthMetrics, SDOHScores

### Dependencies
- None (starting point)

### Acceptance Criteria
- [ ] `npm run dev` starts development server successfully
- [ ] Design tokens accessible in any component via CSS variables
- [ ] `neighborhoods.json` contains 25 neighborhoods with all required fields:
  - id, name, coordinates (lat/lon)
  - life expectancy (72-84 range, avg ~78)
  - HOI score (15-90, bimodal distribution)
  - 5 SDOH component scores (housing, education, employment, environment, healthcare)
  - Demographics (predominant race/ethnicity, median income bracket, population)
- [ ] Data utilities can load and parse neighborhoods.json
- [ ] Type definitions cover all data structures

### Implementation Notes
- Use `scripts/generate-data.ts` to create realistic fictitious data
- Ensure HOI and life expectancy correlation ~0.65-0.75
- Include 3-4 geographic clusters (coordinates for downtown, north, south, west regions)
- Add demographic diversity across neighborhoods (see DESIGN_ANALYSIS.md Section 2.8)

### Review Gate
**Prompt:**
```
Phase 0 complete. Review:
1. Design tokens loaded correctly in browser DevTools
2. neighborhoods.json structure and data ranges
3. Data utilities functioning (log first 3 neighborhoods to console)

Approve to continue? (y/n/modify)
```

---

## Phase 1: Core Components Library

### Deliverables
1. **Atoms:**
   - Button (primary, secondary, tertiary variants)
   - Input (text input with focus states)
   - Badge (neutral, primary, success variants)
   - Divider (horizontal, vertical)

2. **Molecules:**
   - Card (base card with title, description, link)
   - FeatureCard (dark variant with emphasis)
   - MetricCard (stat card with value, label, context)
   - ChartContainer (wrapper with header, body, legend)
   - Tooltip (positioned tooltip for hover states)

3. **Component Storybook or Demo Page:**
   - All components rendered on `/components-demo` page
   - Shows all variants and states (hover, focus, disabled)

### Dependencies
- Phase 0 (tokens and setup)

### Acceptance Criteria
- [ ] All atom components render with correct styling per DESIGN_SYSTEM.md
- [ ] Buttons show hover, focus, active, and disabled states
- [ ] Input shows focus ring matching design spec (3px Primary-500 at 30% opacity)
- [ ] Cards have correct shadow elevation and border radius
- [ ] All components use design tokens (no hardcoded colors/spacing)
- [ ] Components are keyboard accessible (focusable, correct tab order)
- [ ] Demo page shows all components with interactive examples

### Implementation Notes
- Follow BEM-inspired naming for CSS classes (`.card`, `.card__header`, `.card--featured`)
- Use TypeScript interfaces for component props
- Apply ARIA labels where appropriate (e.g., `aria-label` for icon-only buttons)
- Ensure color contrast meets WCAG AA (use design system verified combinations)

### Review Gate
**Prompt:**
```
Phase 1 complete. Review component demo page:
1. Visual fidelity to design system (colors, spacing, typography)
2. Interactive states (hover, focus) working correctly
3. Keyboard navigation (Tab through all components)

Approve to continue? (y/n/modify)
```

---

## Phase 2: Layout & Navigation

### Deliverables
1. **Navigation Bar (Header):**
   - Logo/wordmark on left
   - Placeholder search bar (non-functional) in center
   - Minimal nav links on right (About, Methods, Contact)
   - Sticky positioning with shadow on scroll
   - Dark background (Primary-900) with white text

2. **Footer:**
   - 3-column layout on desktop
   - Agency name and placeholder seal logo
   - Link groups (About, Data, Methods, Contact)
   - Disclaimer text ("Prototype uses fictitious data")
   - Dark background (Primary-900) matching header

3. **Hero Section:**
   - Two-column layout with headline and CTA on left
   - Abstract wave pattern SVG on right
   - Gradient background (Primary-50 to Neutral-100)
   - Primary CTA button ("Explore Neighborhoods")

4. **Section Band Template:**
   - Reusable layout component with max-width constraint
   - Variants: light background, tinted background, full-width
   - Consistent padding (80px vertical, 40px horizontal)

5. **Main Page Layout:**
   - Assembled structure: Header → Hero → (placeholder sections) → Footer
   - Smooth scrolling enabled

### Dependencies
- Phase 1 (Button, Card components)

### Acceptance Criteria
- [ ] Header sticky positioning works, shows shadow on scroll
- [ ] Header navigation links styled correctly, hover states functional
- [ ] Placeholder search bar visible but non-functional (no interactions)
- [ ] Hero section layout matches design (two-column, gradient background)
- [ ] Wave pattern SVG renders at appropriate opacity (40-50%, Primary-200 color)
- [ ] Footer 3-column layout renders correctly on desktop
- [ ] All footer links styled per design (white text, opacity 0.8, underline on hover)
- [ ] Section band template applies correct max-width (1200px) and padding
- [ ] Smooth scrolling works for anchor links (if any)

### Implementation Notes
- Use CSS Grid or Flexbox for header layout (space-between)
- Hero wave pattern: Create SVG with organic curves, absolute position right side
- Footer: Use CSS Grid with `grid-template-columns: repeat(3, 1fr)`
- Section band: Create reusable React component accepting `variant` prop

### Review Gate
**Prompt:**
```
Phase 2 complete. Review main page:
1. Header sticky behavior and styling
2. Hero section layout and gradient background
3. Footer structure and link styling
4. Overall page hierarchy and spacing

Approve to continue? (y/n/modify)
```

---

## Phase 3: Static Content Sections

### Deliverables
1. **Context Band ("Making the Connection"):**
   - Two-column layout: text left, supporting image right
   - 2-3 paragraphs explaining health equity and SDOH
   - Callout card with key message

2. **Featured Insights Grid:**
   - 3 cards in a row
   - Card 1: "Health Gaps" preview
   - Card 2: "Neighborhood Conditions" preview
   - Card 3: "Explore Your Community" preview
   - Each card has icon, title, description, "Learn more" link

3. **Section Headers:**
   - Reusable component with eyebrow, headline, description
   - Applied to upcoming data sections

4. **Integrated Page:**
   - All static sections assembled in correct order
   - Content populated with actual copy (not Lorem Ipsum)

### Dependencies
- Phase 2 (Hero, section bands, footer)
- Phase 1 (Card, FeatureCard)

### Acceptance Criteria
- [ ] Context band two-column layout renders correctly
- [ ] Supporting image placeholder displayed (or actual image if available)
- [ ] Callout card visually distinct (Feature card variant, dark background)
- [ ] Insights grid shows 3 cards horizontally with equal spacing
- [ ] Each card has correct styling per design system
- [ ] "Learn more" links functional (scroll to anchor or placeholder)
- [ ] Section headers styled per typography specifications (H2, overline)
- [ ] All copy is clear, concise, and free of placeholder text
- [ ] Scroll flow feels natural from hero → context → insights

### Implementation Notes
- Use real stock photography or abstract health imagery for context band
- Write actual content based on DESIGN_BRIEF.md audience and tone guidelines
- Ensure callout card uses FeatureCard component (Primary-900 background)
- Test card grid at 1280px width (target viewport)

### Review Gate
**Prompt:**
```
Phase 3 complete. Review content sections:
1. Context band layout and readability
2. Insights grid visual hierarchy and card styling
3. Copy quality and tone (professional, approachable)
4. Overall narrative flow from hero to insights

Approve to continue? (y/n/modify)
```

---

## Phase 4: Data Visualizations

### Deliverables

#### 4A: Geographic Overview Map
- **Choropleth map** showing life expectancy or HOI by neighborhood
- Minimal base layer (light gray, neighborhood boundaries only, no streets)
- 7-step sequential color scale (Primary-50 to Primary-900)
- Hover: Tooltip with neighborhood name, value, comparison to average
- Click: Select neighborhood (highlight, prepare for Phase 5 integration)
- Legend: Bottom-right, horizontal bar with min/max/average labels
- Fixed view (no zoom/pan)

#### 4B: Disparities Bar Chart
- **Horizontal grouped bar chart** showing life expectancy by race/ethnicity
- 5-6 racial/ethnic groups
- Bars sorted descending by value
- State average line (dashed) as reference
- Gap annotations ("-X years" labels with arrows)
- Hover: Tooltip with exact values

#### 4C: Relationships Scatter Plot
- **Scatter plot** showing HOI score (x-axis) vs. life expectancy (y-axis)
- One dot per neighborhood (25 total)
- Trendline (linear regression, Primary-700 dashed)
- Quadrant labels ("High opportunity, high life expectancy", etc.)
- 2-3 neighborhood labels for notable outliers
- Hover: Tooltip with neighborhood name, both values

### Dependencies
- Phase 3 (Section bands and layout)
- Phase 1 (ChartContainer, Tooltip)
- Phase 0 (Data utilities, neighborhoods.json)

### Acceptance Criteria

**Map:**
- [ ] Choropleth renders 25 neighborhoods with correct color mapping
- [ ] Color scale matches 7-step sequential (Primary-50 to Primary-900)
- [ ] Hover shows tooltip with neighborhood name, value, comparison
- [ ] Click selects neighborhood (visual highlight applied)
- [ ] Legend positioned bottom-right, labeled correctly
- [ ] No zoom/pan controls visible or functional
- [ ] Map loads in <1 second, renders smoothly

**Bar Chart:**
- [ ] 5-6 bars displayed horizontally, sorted by value (highest first)
- [ ] State average line visible as dashed reference
- [ ] Gap annotations show difference from average ("-X years")
- [ ] Hover tooltip shows exact life expectancy value
- [ ] Chart axes labeled clearly (years, race/ethnicity)
- [ ] Chart renders in <1 second

**Scatter Plot:**
- [ ] 25 data points rendered correctly
- [ ] Trendline calculated and displayed (linear regression, dashed)
- [ ] Quadrant labels positioned appropriately
- [ ] 2-3 neighborhood names labeled on chart (outliers or notable examples)
- [ ] Hover tooltip shows neighborhood name, HOI, life expectancy
- [ ] Axes labeled (HOI 0-100, Life Expectancy in years)
- [ ] Chart renders in <1 second

### Implementation Notes
- **Map:** Use Leaflet with GeoJSON for neighborhood boundaries, `choropleth` layer style
- **Bar Chart:** Use Recharts `<BarChart>` with horizontal orientation, or D3 for custom control
- **Scatter Plot:** Use D3 for full control over annotations and trendline
- Calculate trendline using linear regression (`d3.leastSquares` or custom function in `lib/stats.ts`)
- Ensure all tooltips use Tooltip molecule component for consistency
- Wrap each visualization in ChartContainer with appropriate title and eyebrow

### Review Gate
**Prompt:**
```
Phase 4 complete. Review data visualizations:
1. Map: Color accuracy, hover/click behavior, legend clarity
2. Bar Chart: Data accuracy, annotations, sorting
3. Scatter Plot: Trendline, quadrant labels, outlier labels
4. Overall: Visual consistency with design system, performance (<1s render)

Approve to continue? (y/n/modify)
```

---

## Phase 5: Interactive Features

### Deliverables

#### 5A: Neighborhood Search (Explore Section)
- **Autocomplete input** for neighborhood lookup
- Type-ahead filtering (search by neighborhood name)
- Dropdown shows matching results with hover states
- Selection updates "Explore Your Community" cards below

#### 5B: Explore Your Community Cards
- **Default state:** Shows city/region average with prompt "Select a neighborhood to compare"
- **Selected state:** Shows selected neighborhood metrics
- **Metric cards grid (4-6 cards):**
  1. Life Expectancy (vs city average)
  2. HOI Score (0-100 scale)
  3. Top 2 SDOH factors (e.g., "Housing: 78/100", "Education: 65/100")
  4. Population size
  5. Predominant demographic (optional)
- **Comparison visualization:** Horizontal bar charts showing neighborhood value vs. city average
- **Color coding:** Green if above average, Orange if below

#### 5C: Map-to-Explore Integration
- Clicking neighborhood on map (Phase 4A) populates Explore section
- Smooth scroll to Explore section on map selection
- Visual feedback: Map highlight synced with selected neighborhood

### Dependencies
- Phase 4 (Map, data visualizations)
- Phase 1 (Input, MetricCard)
- Phase 0 (Data utilities)

### Acceptance Criteria

**Autocomplete Search:**
- [ ] Input field renders with placeholder "Search neighborhoods..."
- [ ] Typing filters neighborhoods in real-time (client-side search)
- [ ] Dropdown shows up to 10 matching results
- [ ] Arrow keys navigate dropdown options
- [ ] Enter key selects highlighted option
- [ ] Escape key closes dropdown
- [ ] Selecting a neighborhood updates metric cards below

**Explore Cards:**
- [ ] Default state shows city average with prompt text
- [ ] Grid displays 4-6 metric cards with correct spacing
- [ ] Each card shows metric label, value, and context (vs average)
- [ ] Horizontal bar charts visualize comparison (neighborhood vs. average)
- [ ] Green color for above average, Orange for below average
- [ ] Cards update instantly when neighborhood selected

**Map Integration:**
- [ ] Clicking map neighborhood selects it (visual highlight)
- [ ] Selection updates Explore section cards
- [ ] Smooth scroll to Explore section triggered (500ms duration)
- [ ] Map highlight persists until new selection made
- [ ] Selection can be cleared (via "Reset" button or re-clicking)

### Implementation Notes
- Use Radix UI `<Select>` or build custom autocomplete with React state
- Implement client-side filtering (`Array.filter` on `neighborhoods`)
- Calculate city average dynamically from neighborhoods.json
- Use Framer Motion `<motion.div>` with layout animations for card updates
- Map click handler calls `onNeighborhoodSelect(neighborhoodId)` callback
- Smooth scroll: `element.scrollIntoView({ behavior: 'smooth', block: 'start' })`

### Review Gate
**Prompt:**
```
Phase 5 complete. Review interactive features:
1. Autocomplete: Search functionality, keyboard navigation
2. Explore cards: Metric accuracy, comparison visualizations, color coding
3. Map integration: Click selection, smooth scroll, highlight sync
4. Overall: Interactivity feels responsive and intuitive

Approve to continue? (y/n/modify)
```

---

## Phase 6: Polish & Accessibility

### Deliverables

#### 6A: Scroll-Triggered Animations
- Fade-in animations for sections entering viewport
- Stagger delays for card grids (100ms per item, max 5 items)
- Smooth transitions using Framer Motion
- Intersection Observer for trigger detection

#### 6B: Loading States
- Skeleton screens for map and charts during initial load
- Loading spinner for slow data fetching (if applicable)
- Fade-in transitions when content ready

#### 6C: Accessibility Enhancements
- ARIA labels for all data visualizations (charts, map)
- `aria-live` regions for dynamic updates (neighborhood selection)
- Focus management for search dropdown and map interactions
- `:focus-visible` styling for keyboard navigation
- Screen reader testing with VoiceOver or NVDA
- Color contrast verification (all text meets WCAG AA)

#### 6D: Performance Optimization
- Lazy load visualizations below fold
- Image optimization (WebP format, responsive sizes)
- Font subsetting (Latin characters only)
- Code splitting for chart libraries
- Lighthouse audit (target: 90+ performance, 95+ accessibility)

#### 6E: Final QA & Bug Fixes
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Responsive testing at 1280px, 1440px, 1920px widths
- Keyboard navigation full flow test
- Hover states verification on all interactive elements
- Error state testing (empty search, data load failure)

### Dependencies
- All previous phases (complete prototype)

### Acceptance Criteria

**Animations:**
- [ ] Sections fade in smoothly as user scrolls down
- [ ] Card grids stagger animation (not all appear at once)
- [ ] Animations respect `prefers-reduced-motion` media query
- [ ] No janky or stuttering animations (60fps maintained)

**Loading States:**
- [ ] Skeleton screens show before map/charts render
- [ ] Loading transitions feel polished (not abrupt)
- [ ] No flash of unstyled content (FOUC)

**Accessibility:**
- [ ] All charts have `role="img"` and descriptive `aria-label`
- [ ] Map has keyboard navigation instructions (`aria-describedby`)
- [ ] `aria-live="polite"` announces neighborhood selection
- [ ] All interactive elements have visible focus indicators
- [ ] Tab order follows logical reading flow
- [ ] Axe DevTools reports 0 critical or serious violations
- [ ] VoiceOver/NVDA can navigate full page without issues

**Performance:**
- [ ] Lighthouse performance score: 90+
- [ ] Lighthouse accessibility score: 95+
- [ ] Initial page load: <3 seconds (broadband)
- [ ] Time to interactive: <5 seconds
- [ ] Chart rendering: <1 second each
- [ ] Smooth scrolling: 60fps (no dropped frames)

**Cross-Browser/QA:**
- [ ] Layout correct in Chrome, Firefox, Safari, Edge (latest versions)
- [ ] Hover states work consistently across browsers
- [ ] No console errors in any browser
- [ ] Keyboard navigation works in all browsers
- [ ] Search autocomplete functional in all browsers
- [ ] Map interactions work in all browsers

### Implementation Notes
- Use Framer Motion's `<motion.div>` with `initial`, `animate`, `transition` props
- Intersection Observer: `useInViewport` custom hook or `framer-motion`'s `useInView`
- Apply `@media (prefers-reduced-motion: reduce)` to disable animations if requested
- Run Lighthouse in incognito mode for accurate performance metrics
- Use React DevTools Profiler to identify performance bottlenecks
- Test keyboard navigation: Tab, Shift+Tab, Enter, Space, Escape, Arrow keys

### Review Gate
**Prompt:**
```
Phase 6 complete. Final review checklist:
1. Animations smooth and purposeful (not distracting)
2. Accessibility audit passed (axe DevTools, screen reader test)
3. Lighthouse scores: Performance 90+, Accessibility 95+
4. Cross-browser testing verified (Chrome, Firefox, Safari, Edge)
5. No critical bugs or console errors

Prototype ready for delivery? (y/n/modify)
```

---

## Post-Implementation Checklist

**Before considering the prototype complete:**

- [ ] All phase review gates passed
- [ ] README.md updated with setup instructions, project description, and tech stack
- [ ] Code commented where necessary (complex D3 logic, data transformations)
- [ ] No hardcoded values (all use design tokens or constants)
- [ ] Git repository clean (no unnecessary files, proper `.gitignore`)
- [ ] Demo deployed (Vercel, Netlify, or local instructions provided)
- [ ] Handoff documentation prepared:
  - Design system adherence report
  - Accessibility compliance summary
  - Performance metrics summary
  - Known limitations (out-of-scope items from DESIGN_BRIEF.md)
  - Future enhancement recommendations

---

## Modification Protocol

**If feedback requires changes to a completed phase:**

1. **Document requested changes** in phase-specific section
2. **Assess impact** on downstream phases:
   - Minor change (styling tweak): Proceed directly
   - Major change (component structure): Review dependent phases
3. **Update acceptance criteria** if scope changes
4. **Re-run review gate** for affected phase before continuing

**Example:**
- Phase 3 approved, now in Phase 4
- Feedback: "Change Insights grid from 3 cards to 4 cards"
- Impact: Low (no dependency on data viz)
- Action: Update Phase 3 code, re-verify Phase 3 acceptance criteria, continue to Phase 4

---

## Risk Mitigation

### High-Risk Areas
1. **Data visualization complexity** (Phase 4)
   - Mitigation: Build simplest version first (static), then add interactivity
   - Fallback: Use chart library (Recharts) instead of custom D3 if time-constrained

2. **Map rendering performance** (Phase 4A)
   - Mitigation: Limit to 25 neighborhoods, use optimized GeoJSON
   - Fallback: Replace with static SVG map if Leaflet performance poor

3. **Autocomplete accessibility** (Phase 5)
   - Mitigation: Use battle-tested library (Radix UI, React Aria)
   - Fallback: Simplify to dropdown select if autocomplete too complex

### Scope Creep Prevention
- **No features beyond DESIGN_BRIEF.md spec** without explicit approval
- **Defer "nice-to-have" items** to post-launch backlog
- **Timebox experimental approaches** (1 hour max before falling back to simpler solution)

---

## Success Criteria (Final Prototype)

### Functional Requirements
- [x] All 6 content bands implemented and functioning
- [x] Map, bar chart, scatter plot rendering correctly with real data
- [x] Neighborhood search and Explore section fully interactive
- [x] Smooth scroll and animations polished

### Design Requirements
- [x] Visual fidelity to DESIGN_SYSTEM.md (colors, typography, spacing)
- [x] Consistent component usage throughout
- [x] Professional, institutional aesthetic achieved

### Accessibility Requirements
- [x] WCAG 2.1 AA compliance verified (axe DevTools audit)
- [x] Keyboard navigation fully functional
- [x] Screen reader compatible (VoiceOver/NVDA tested)

### Performance Requirements
- [x] Page load <3 seconds
- [x] Time to interactive <5 seconds
- [x] Chart rendering <1 second each
- [x] Lighthouse scores: 90+ performance, 95+ accessibility

### Technical Requirements
- [x] TypeScript with no `any` types (strict mode)
- [x] Clean, well-structured code (ESLint/Prettier passing)
- [x] No console errors or warnings
- [x] Responsive to 1280px, 1440px, 1920px widths (desktop-first)

---

## Appendix: Token-Efficient Review Prompts

### Quick Approval Prompts (for minor checkpoints)
```
Phase X checkpoint: [Component name] complete.
✓ Functionality working
✓ Styling matches design system
✓ Accessible (keyboard nav, focus states)

Continue? (y/n)
```

### Detailed Review Prompts (for phase gates)
Use the structured prompts in each phase's "Review Gate" section. These are designed to:
- Focus on critical acceptance criteria only
- Request yes/no/modify response
- Avoid open-ended questions that generate long responses

### Modification Request Format
```
Phase X: Request changes
- Change 1: [Specific description]
- Change 2: [Specific description]

Impact assessment: [Low/Medium/High]
Proceed with changes? (y/n)
```

---

## Timeline Estimate

**Based on single developer working full-time:**

| Phase | Duration | Cumulative |
|-------|----------|------------|
| 0: Foundation | 0.5-1 day | Day 1 |
| 1: Components | 1-1.5 days | Day 2-3 |
| 2: Layout | 1-1.5 days | Day 3-4 |
| 3: Static Content | 1 day | Day 5 |
| 4: Visualizations | 2-3 days | Day 7-8 |
| 5: Interactivity | 1-2 days | Day 9 |
| 6: Polish | 1-2 days | Day 10-11 |

**Total:** 7.5-11 days (1.5-2.2 weeks)

**Contingency buffer:** +20% (add 2 days) = **9.5-13 days (2-2.5 weeks)**

---

## Contact & Escalation

**For implementation questions or blockers:**
1. Review relevant section in DESIGN_SYSTEM.md or DESIGN_BRIEF.md
2. Check DESIGN_ANALYSIS.md for resolved contradictions/decisions
3. Escalate unresolved decisions to project lead for quick resolution

**For scope changes:**
- Document requested change and impact assessment
- Get approval before proceeding
- Update IMPLEMENTATION_PLAN.md to reflect new scope

---

**Document Version:** 1.0  
**Date:** 2026-05-05  
**Status:** Ready for execution  
**Next Action:** Begin Phase 0 - Foundation Setup

---

**End of Implementation Plan**
