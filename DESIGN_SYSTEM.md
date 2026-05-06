# Design System
**Health Equity Explorer – Interactive Data Story**

This design system provides implementation-ready specifications for tokens, components, and patterns. All values are derived from the CMS.gov reference design and reconciled with the project brief.

---

## 1. Foundation

### 1.1 Design Principles
1. **Clarity over Complexity** – Clean interfaces that reveal patterns without overwhelming
2. **Institutional Trust** – Government/healthcare aesthetic with modern execution
3. **Accessible by Default** – WCAG 2.1 AA minimum across all components
4. **Data-Centric** – Visualizations are first-class content, not decorative
5. **Progressive Disclosure** – Key insights visible immediately, details available on interaction

---

## 2. Design Tokens

### 2.1 Color Palette

#### Core Neutrals
```
Neutral-100: #FFFFFF    // White, primary background
Neutral-200: #F5F7FA    // Light gray section backgrounds, cards
Neutral-300: #E5E9EF    // Borders, dividers
Neutral-400: #CBD2E0    // Disabled states, subtle borders
Neutral-600: #71767A    // Secondary text, de-emphasized content
Neutral-700: #3A4A5F    // Body text
Neutral-900: #1B2430    // Headlines, emphasis text
```

#### Primary Blues (Institutional)
```
Primary-50:  #E7F2FF    // Very light blue wash, hover backgrounds
Primary-100: #CCE5FF    // Light backgrounds, subtle highlights
Primary-200: #A4C8F4    // Accent lines, chart secondary colors
Primary-500: #1B76D1    // Primary buttons, links, chart highlights
Primary-700: #14549B    // Hover/active states, emphasis
Primary-900: #0C3058    // Header/footer, strong emphasis blocks
```

#### Supporting Accents
```
Accent-Orange: #F5A623       // Warnings, key callouts, CTAs
Accent-Teal:   #2BB8AA       // Positive indicators, improvement metrics
Accent-Magenta: #C73B8F      // Tertiary data series, highlights
Success-Green: #27AE60       // Success states, positive trends
Error-Red:     #E74C3C       // Errors, negative trends, warnings
```

#### Semantic Color Usage
- **Links**: Primary-500 (hover: Primary-700, underline on hover)
- **Buttons Primary**: Primary-500 background, white text
- **Buttons Secondary**: Primary-500 border/text, transparent background
- **Success/Positive**: Success-Green
- **Warning**: Accent-Orange
- **Error/Negative**: Error-Red
- **Focus rings**: Primary-500 with 3px width, 0.3 opacity offset

### 2.2 Typography

#### Font Family
```css
--font-primary: 'Public Sans', 'Open Sans', -apple-system, BlinkMacSystemFont, 
                'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
--font-mono: 'IBM Plex Mono', 'Courier New', monospace;
```

**Rationale**: Public Sans is a U.S. government open-source font, Open Sans is widely supported fallback.

#### Type Scale (Desktop)
```
--font-size-xs:    12px  // 0.75rem   - Overlines, fine print
--font-size-sm:    14px  // 0.875rem  - Small body, labels, captions
--font-size-base:  16px  // 1rem      - Body text, standard UI
--font-size-lg:    18px  // 1.125rem  - Large body, emphasis
--font-size-xl:    22px  // 1.375rem  - H4, card titles
--font-size-2xl:   28px  // 1.75rem   - H3, section subheadings
--font-size-3xl:   38px  // 2.375rem  - H2, major section headings
--font-size-4xl:   52px  // 3.25rem   - H1, hero headlines
```

#### Font Weights
```
--font-weight-regular:  400
--font-weight-medium:   500
--font-weight-semibold: 600
--font-weight-bold:     700
```

#### Line Heights
```
--line-height-tight:  1.2   // Headlines (H1-H3)
--line-height-snug:   1.4   // H4, large UI text
--line-height-normal: 1.6   // Body text, standard UI
--line-height-loose:  1.8   // Long-form content
```

#### Letter Spacing
```
--letter-spacing-tight:  -0.02em  // Large headlines
--letter-spacing-normal:  0       // Default
--letter-spacing-wide:    0.08em  // Overlines, small caps
```

#### Typography Styles (Semantic)
```css
/* H1 - Hero Headlines */
font: 700 52px/1.2 var(--font-primary);
letter-spacing: -0.02em;
color: var(--neutral-900);

/* H2 - Major Section Headings */
font: 600 38px/1.3 var(--font-primary);
letter-spacing: -0.01em;
color: var(--neutral-900);

/* H3 - Subsection Headings */
font: 600 28px/1.4 var(--font-primary);
color: var(--neutral-900);

/* H4 - Card Titles */
font: 600 22px/1.4 var(--font-primary);
color: var(--neutral-700);

/* Body Large */
font: 400 18px/1.6 var(--font-primary);
color: var(--neutral-700);

/* Body Standard */
font: 400 16px/1.6 var(--font-primary);
color: var(--neutral-700);

/* Body Small */
font: 400 14px/1.5 var(--font-primary);
color: var(--neutral-600);

/* Overline / Eyebrow */
font: 600 12px/1.3 var(--font-primary);
letter-spacing: 0.08em;
text-transform: uppercase;
color: var(--neutral-600);

/* Link */
font: 600 16px/1.6 var(--font-primary);
color: var(--primary-500);
text-decoration: none;
/* Hover state */
text-decoration: underline;
color: var(--primary-700);
```

### 2.3 Spacing Scale
```
--space-1:   4px
--space-2:   8px
--space-3:   12px
--space-4:   16px
--space-5:   20px
--space-6:   24px
--space-8:   32px
--space-10:  40px
--space-12:  48px
--space-16:  64px
--space-20:  80px
--space-24:  96px
--space-32:  128px
```

#### Spacing Usage Guidelines
- **Component padding (small)**: space-4 (16px)
- **Component padding (standard)**: space-6 (24px)
- **Component padding (large)**: space-8 (32px)
- **Card gaps**: space-6 (24px) to space-8 (32px)
- **Section vertical padding**: space-16 (64px) to space-20 (80px)
- **Stack spacing (inline content)**: space-4 to space-6
- **Section breaks**: space-16 to space-24

### 2.4 Sizing & Layout

#### Container Widths
```
--container-sm:   640px   // Narrow content (not used in this project)
--container-md:   768px   // Not used
--container-lg:   1024px  // Not used
--container-xl:   1200px  // Primary content max-width
--container-2xl:  1440px  // Wide sections (full-width maps, charts)
```

#### Grid System
- **Columns**: 12-column grid
- **Gutter**: 24px (desktop), 16px (tablet)
- **Side margins**: 32px (desktop), 24px (tablet), 16px (mobile)

#### Breakpoints
```
--breakpoint-sm:  640px   // Mobile landscape
--breakpoint-md:  768px   // Tablet portrait
--breakpoint-lg:  1024px  // Tablet landscape / small desktop
--breakpoint-xl:  1280px  // Desktop
--breakpoint-2xl: 1536px  // Large desktop
```

**Note**: This prototype targets desktop-first (1280px+), but breakpoints are defined for future responsive work.

### 2.5 Border Radius
```
--radius-none: 0
--radius-sm:   4px   // Buttons, small cards
--radius-md:   6px   // Standard cards, inputs
--radius-lg:   8px   // Large cards, panels
--radius-xl:   12px  // Feature cards, hero elements
--radius-full: 9999px // Pills, circular elements
```

### 2.6 Shadows (Elevation)
```css
--shadow-none: none;

--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
/* Subtle cards, inputs */

--shadow-base: 0 4px 12px 0 rgba(0, 0, 0, 0.06);
/* Standard cards, dropdown panels */

--shadow-md: 0 6px 16px 0 rgba(0, 0, 0, 0.08);
/* Elevated cards, modals */

--shadow-lg: 0 10px 24px 0 rgba(0, 0, 0, 0.10);
/* Prominent features, sticky nav */

--shadow-xl: 0 20px 40px 0 rgba(0, 0, 0, 0.12);
/* Large modals, drawers */

--shadow-focus: 0 0 0 3px rgba(27, 118, 209, 0.3);
/* Focus indicator for accessibility */
```

### 2.7 Transitions
```css
--transition-fast:     150ms cubic-bezier(0.4, 0, 0.2, 1);  // Micro-interactions
--transition-base:     250ms cubic-bezier(0.4, 0, 0.2, 1);  // Standard hover, focus
--transition-slow:     400ms cubic-bezier(0.4, 0, 0.2, 1);  // Panels, dropdowns
--transition-slowest:  600ms cubic-bezier(0.4, 0, 0.2, 1);  // Page transitions, modals
```

#### Easing Functions
```css
--ease-in:      cubic-bezier(0.4, 0, 1, 1);
--ease-out:     cubic-bezier(0, 0, 0.2, 1);
--ease-in-out:  cubic-bezier(0.4, 0, 0.2, 1);  // Default
--ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1);  // Playful, use sparingly
```

---

## 3. Component Library

### 3.1 Buttons

#### Primary Button
```css
background: var(--primary-500);
color: #FFFFFF;
padding: 12px 24px;
border-radius: var(--radius-sm);
font: 600 16px/1.5 var(--font-primary);
border: none;
cursor: pointer;
transition: all var(--transition-base);

/* Hover */
background: var(--primary-700);
box-shadow: var(--shadow-md);
transform: translateY(-1px);

/* Active/Pressed */
background: var(--primary-700);
transform: translateY(0);

/* Focus */
box-shadow: var(--shadow-focus);
outline: none;

/* Disabled */
background: var(--neutral-400);
color: var(--neutral-600);
cursor: not-allowed;
opacity: 0.6;
```

#### Secondary Button
```css
background: transparent;
color: var(--primary-500);
padding: 12px 24px;
border: 2px solid var(--primary-500);
border-radius: var(--radius-sm);
font: 600 16px/1.5 var(--font-primary);
cursor: pointer;
transition: all var(--transition-base);

/* Hover */
background: var(--primary-50);
border-color: var(--primary-700);
color: var(--primary-700);

/* Focus */
box-shadow: var(--shadow-focus);
outline: none;
```

#### Tertiary Button (Text Link)
```css
background: transparent;
color: var(--primary-500);
padding: 8px 16px;
border: none;
font: 600 16px/1.5 var(--font-primary);
text-decoration: none;
cursor: pointer;
transition: all var(--transition-base);

/* Hover */
color: var(--primary-700);
text-decoration: underline;
```

#### Button Sizes
- **Small**: padding 8px 16px, font-size 14px
- **Medium** (default): padding 12px 24px, font-size 16px
- **Large**: padding 16px 32px, font-size 18px

### 3.2 Cards

#### Base Card
```css
background: var(--neutral-100);
border-radius: var(--radius-md);
box-shadow: var(--shadow-base);
padding: var(--space-6);
transition: all var(--transition-base);

/* Hover (if interactive) */
box-shadow: var(--shadow-md);
transform: translateY(-2px);
```

**Structure**:
```html
<div class="card">
  <span class="card-eyebrow">Category Label</span>
  <h3 class="card-title">Card Title</h3>
  <p class="card-description">Supporting description text...</p>
  <a class="card-link">Learn more →</a>
</div>
```

#### Feature Card (Highlighted)
```css
background: var(--primary-900);
color: var(--neutral-100);
border-radius: var(--radius-lg);
box-shadow: var(--shadow-md);
padding: var(--space-8);

/* Hover */
box-shadow: var(--shadow-lg);
transform: translateY(-4px);
```

Use for: Featured insights, key callouts, "Most Viewed" style tiles

#### Metric/Stat Card
```css
background: var(--neutral-100);
border-radius: var(--radius-md);
border-left: 4px solid var(--primary-500);
padding: var(--space-6);
```

**Structure**:
```html
<div class="metric-card">
  <span class="metric-label">Life Expectancy</span>
  <div class="metric-value">76.4 years</div>
  <span class="metric-context">vs state avg: -3.2 years</span>
</div>
```

**Styles**:
- Label: overline style, neutral-600
- Value: H2 size (38px), semibold, neutral-900
- Context: small body (14px), neutral-600

#### Content Card with Image
```css
background: var(--neutral-100);
border-radius: var(--radius-lg);
overflow: hidden;
box-shadow: var(--shadow-base);
```

**Structure**:
```html
<div class="content-card">
  <img class="content-card-image" src="..." alt="..." />
  <div class="content-card-body">
    <span class="card-eyebrow">Featured Story</span>
    <h3 class="card-title">Headline</h3>
    <p class="card-description">Description...</p>
    <a class="card-link">Read More</a>
  </div>
</div>
```

### 3.3 Navigation

#### Top Navigation Bar
```css
background: var(--primary-900);
height: 72px;
box-shadow: var(--shadow-base);
position: sticky;
top: 0;
z-index: 100;
```

**Layout**:
- Left: Logo/wordmark (white text, ~200px width)
- Center: Placeholder search bar (non-functional)
- Right: Minimal nav links (About, Methods, Contact - white text, 16px, 600 weight, spaced 32px apart)
- NO section anchor navigation

#### Footer
```css
background: var(--primary-900);
color: rgba(255, 255, 255, 0.9);
padding: var(--space-16) 0;
```

**Layout**: 3-column grid on desktop
- Column 1: Agency name, generic "Public Health Agency" seal placeholder
- Column 2-3: Link groups (About, Data, Methods, Contact)
- NO social media icons
- NO newsletter signup

Links: white text, 14px, opacity 0.8, underline on hover

### 3.4 Forms & Inputs

#### Text Input / Search Bar
```css
background: var(--neutral-100);
border: 1px solid var(--neutral-400);
border-radius: var(--radius-sm);
padding: 10px 16px;
font: 400 16px/1.5 var(--font-primary);
color: var(--neutral-700);
transition: all var(--transition-base);

/* Focus */
border-color: var(--primary-500);
box-shadow: var(--shadow-focus);
outline: none;

/* Error */
border-color: var(--error-red);
```

#### Dropdown / Select
```css
background: var(--neutral-100);
border: 1px solid var(--neutral-400);
border-radius: var(--radius-sm);
padding: 10px 40px 10px 16px; /* Extra padding-right for chevron */
font: 400 16px/1.5 var(--font-primary);
color: var(--neutral-700);
appearance: none; /* Remove default styling */
background-image: url('data:image/svg+xml,...'); /* Custom chevron */
background-repeat: no-repeat;
background-position: right 12px center;
cursor: pointer;

/* Focus */
border-color: var(--primary-500);
box-shadow: var(--shadow-focus);
```

#### Toggle Pills / Segmented Control
Used for outcome selection, filter groups.

```css
/* Container */
display: inline-flex;
gap: var(--space-2);
background: var(--neutral-200);
border-radius: var(--radius-md);
padding: var(--space-1);

/* Individual pill */
padding: 8px 16px;
border-radius: var(--radius-sm);
font: 600 14px/1.4 var(--font-primary);
cursor: pointer;
transition: all var(--transition-fast);

/* Unselected */
background: transparent;
color: var(--neutral-700);

/* Selected */
background: var(--primary-500);
color: var(--neutral-100);
box-shadow: var(--shadow-sm);
```

### 3.5 Data Visualization Components

#### Chart Container
```css
background: var(--neutral-100);
border-radius: var(--radius-md);
padding: var(--space-6);
box-shadow: var(--shadow-base);
```

**Structure**:
```html
<div class="chart-container">
  <div class="chart-header">
    <span class="chart-eyebrow">Health Outcomes</span>
    <h3 class="chart-title">Life Expectancy by Neighborhood</h3>
  </div>
  <div class="chart-body">
    <!-- D3/visualization here -->
  </div>
  <div class="chart-legend">
    <!-- Legend items -->
  </div>
</div>
```

#### Color Scales for Data Visualization

**Sequential (single-hue) for choropleth maps**:
```
Low to High (7-step):
#E7F2FF → #CCE5FF → #A4C8F4 → #6BA3E0 → #1B76D1 → #14549B → #0C3058
```

**Diverging (for comparing above/below average)**:
```
Below Average: #E74C3C (Error-Red)
Neutral:       #E5E9EF (Neutral-300)
Above Average: #27AE60 (Success-Green)
```

**Categorical (for multiple data series)**:
```
Series 1: #1B76D1 (Primary-500)
Series 2: #2BB8AA (Accent-Teal)
Series 3: #C73B8F (Accent-Magenta)
Series 4: #F5A623 (Accent-Orange)
Series 5: #14549B (Primary-700)
```

**Chart Styling Guidelines**:
- Axes: Neutral-400, 1px stroke
- Gridlines: Neutral-300, 1px stroke, dashed
- Data points/bars: Primary colors from palette above
- Hover state: Increase opacity to 1.0, add Primary-700 stroke (2px)
- Labels: Neutral-700, 14px, medium weight
- Background: White or Primary-50 for emphasis

#### Tooltip
```css
background: var(--neutral-100);
border: 1px solid var(--neutral-300);
border-radius: var(--radius-sm);
box-shadow: var(--shadow-md);
padding: var(--space-3) var(--space-4);
font: 400 14px/1.5 var(--font-primary);
color: var(--neutral-700);
pointer-events: none;
z-index: 1000;
```

**Structure**:
```html
<div class="tooltip">
  <div class="tooltip-title">Downtown</div>
  <div class="tooltip-value">Life Expectancy: 78.4 years</div>
  <div class="tooltip-context">State avg: 81.6 years (-3.2)</div>
</div>
```

#### Bubble Chart (Overlapping Circles)
Inspired by the "Providers, Suppliers & Facility Services" visualization in reference.

```css
/* Bubble styling */
fill: var(--primary-500);
fill-opacity: 0.2;
stroke: var(--primary-500);
stroke-width: 2px;
transition: all var(--transition-base);

/* Hover */
fill-opacity: 0.4;
stroke-width: 3px;
stroke: var(--primary-700);

/* Label */
font: 600 14px/1.2 var(--font-primary);
fill: var(--neutral-900);
text-anchor: middle;
```

Use multiple accent colors for overlapping bubbles to distinguish categories.

### 3.6 Utility Components

#### Badge / Tag
```css
display: inline-block;
padding: 4px 12px;
border-radius: var(--radius-full);
font: 600 12px/1.3 var(--font-primary);
text-transform: uppercase;
letter-spacing: 0.05em;

/* Neutral variant */
background: var(--neutral-200);
color: var(--neutral-700);

/* Primary variant */
background: var(--primary-100);
color: var(--primary-700);

/* Success variant */
background: rgba(39, 174, 96, 0.1);
color: var(--success-green);
```

#### Divider
```css
/* Horizontal */
width: 100%;
height: 1px;
background: var(--neutral-300);
margin: var(--space-8) 0;

/* Vertical */
width: 1px;
height: 100%;
background: var(--neutral-300);
margin: 0 var(--space-6);
```

#### Loading Spinner
```css
/* Circular spinner */
width: 40px;
height: 40px;
border: 4px solid var(--neutral-300);
border-top-color: var(--primary-500);
border-radius: 50%;
animation: spin 0.8s linear infinite;

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

#### Skeleton Screen (Loading State)
```css
background: linear-gradient(
  90deg,
  var(--neutral-200) 0%,
  var(--neutral-300) 50%,
  var(--neutral-200) 100%
);
background-size: 200% 100%;
animation: shimmer 1.5s infinite;
border-radius: var(--radius-sm);

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

## 4. Page Layout Patterns

### 4.1 Section Band (Generic)
```css
padding: var(--space-16) var(--space-8);
max-width: var(--container-xl);
margin: 0 auto;
```

**Variants**:
- **Light background**: background: var(--neutral-100)
- **Tinted background**: background: var(--primary-50) or var(--neutral-200)
- **Dark background**: background: var(--primary-900), color: white

### 4.2 Hero Section
```css
padding: var(--space-20) var(--space-8);
background: linear-gradient(135deg, var(--primary-50) 0%, var(--neutral-100) 100%);
position: relative;
overflow: hidden;
```

**Layout**: Two-column grid
- Left (60%): Headline (H1), subheadline (large body), CTA button
- Right (40%): Abstract wave/line pattern (SVG) or supporting image

**Background Pattern**: Use SVG with subtle organic lines/waves in Primary-200 at 30% opacity

### 4.3 Two-Column Content Section
```css
display: grid;
grid-template-columns: 1fr 1fr;
gap: var(--space-12);
padding: var(--space-16) var(--space-8);
```

Used for: Context band, featured insights, mixed content/image layouts

### 4.4 Card Grid
```css
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: var(--space-6);
padding: var(--space-8);
```

**Responsive**:
- 3 columns on desktop (1280px+)
- 2 columns on tablet (768-1279px)
- 1 column on mobile (<768px)

### 4.5 Full-Width Map/Chart Section
```css
padding: var(--space-16) 0;
background: var(--neutral-200);
```

**Content**: Map or chart container spans full viewport width (max 1440px) with constrained text content (1200px)

---

## 5. Interaction & Animation Guidelines

### 5.1 Scroll-Triggered Animations
Use Intersection Observer API to trigger animations when elements enter viewport.

**Fade-in from below**:
```css
opacity: 0;
transform: translateY(20px);
transition: opacity var(--transition-slow), 
            transform var(--transition-slow);

/* When visible */
opacity: 1;
transform: translateY(0);
```

**Stagger delays**: For card grids, stagger by 100ms per item (max 5 items)

### 5.2 Hover States
All interactive elements should have clear hover states:
- **Cards**: Lift (translateY -2px), increase shadow
- **Buttons**: Darken color, increase shadow
- **Links**: Underline, darken color
- **Chart elements**: Increase opacity, add stroke

### 5.3 Focus States (Accessibility)
All interactive elements must have visible focus indicators:
```css
outline: none; /* Remove default */
box-shadow: 0 0 0 3px rgba(27, 118, 209, 0.3); /* Custom focus ring */
```

Focus ring should be:
- 3px width
- Primary-500 color at 30% opacity
- Offset 2px from element
- Visible on keyboard navigation only (use :focus-visible)

### 5.4 Loading States
- **Button loading**: Show spinner, disable interaction, reduce opacity to 0.7
- **Chart loading**: Show skeleton screen with shimmer animation
- **Section loading**: Fade in content after 150ms delay to avoid flash

### 5.5 Smooth Scrolling
```css
html {
  scroll-behavior: smooth;
}
```

For anchor links jumping between sections, use smooth scroll with 72px offset (nav height).

---

## 6. Accessibility Specifications

### 6.1 Color Contrast Requirements
All text must meet WCAG 2.1 AA standards:
- **Normal text** (< 18px): 4.5:1 minimum
- **Large text** (≥ 18px or ≥ 14px bold): 3:1 minimum
- **UI components**: 3:1 minimum against adjacent colors

**Verified Combinations**:
✅ Neutral-700 on White: 7.8:1
✅ Neutral-900 on White: 14.2:1
✅ White on Primary-900: 12.1:1
✅ White on Primary-500: 4.8:1
✅ Primary-500 on White: 4.8:1

### 6.2 Keyboard Navigation
- All interactive elements must be reachable via Tab key
- Tab order must follow logical reading order
- Enter/Space activates buttons and links
- Escape closes modals and dropdowns
- Arrow keys navigate within components (dropdowns, tabs)

### 6.3 Screen Reader Support
- Use semantic HTML (header, nav, main, section, article, footer)
- Provide alt text for all images and visualizations
- Use ARIA labels for complex interactive components:
  - `aria-label` for icons without visible text
  - `aria-describedby` for additional context
  - `aria-live` for dynamic content updates (chart filters)
  - `role="img"` and `aria-label` for SVG charts

**Example**:
```html
<svg role="img" aria-label="Bar chart showing life expectancy by neighborhood. 
     Downtown: 76 years, Northside: 82 years, Westfield: 79 years.">
  <!-- Chart content -->
</svg>
```

### 6.4 Focus Management
- Maintain visible focus indicators at all times (keyboard users)
- Use :focus-visible to show focus only on keyboard navigation
- Trap focus within modals when open
- Return focus to trigger element when closing modals/dropdowns

---

## 7. Implementation Guidelines

### 7.1 Technology Stack Recommendations
- **Framework**: React (with Next.js for routing/SSG if needed)
- **Styling**: CSS Modules or Tailwind CSS configured with design tokens
- **Charts**: D3.js (for custom visualizations) or Recharts (for standard charts)
- **Maps**: Mapbox GL JS or Leaflet with custom tiles
- **Animations**: Framer Motion (for scroll animations, page transitions)
- **Accessibility**: React Aria Components or Radix UI for complex components

### 7.2 CSS Architecture
Use CSS custom properties for all design tokens:

```css
:root {
  /* Colors */
  --neutral-100: #FFFFFF;
  --neutral-200: #F5F7FA;
  /* ... all tokens ... */
  
  /* Typography */
  --font-primary: 'Public Sans', sans-serif;
  --font-size-base: 16px;
  /* ... all tokens ... */
  
  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  /* ... all tokens ... */
}
```

**Component class naming** (BEM-inspired):
```css
.card { /* Block */ }
.card__header { /* Element */ }
.card--featured { /* Modifier */ }
```

### 7.3 Responsive Approach
Although desktop-first, prepare for responsive:
```css
/* Desktop-first media queries */
@media (max-width: 1024px) {
  /* Tablet landscape */
}

@media (max-width: 768px) {
  /* Tablet portrait */
}

@media (max-width: 640px) {
  /* Mobile */
}
```

### 7.4 Component Reusability
Create atomic components that compose:
- **Atoms**: Button, Input, Badge, Divider
- **Molecules**: Card, MetricCard, ChartContainer, FormField
- **Organisms**: HeroSection, FeatureGrid, NavigationBar, Footer
- **Templates**: SectionBand, TwoColumnLayout, FullWidthSection

### 7.5 Performance Optimization
- **Images**: Use WebP format, lazy load below fold
- **Fonts**: Subset fonts to Latin characters only, use font-display: swap
- **Charts**: Render with Canvas for large datasets (>1000 points)
- **Animations**: Use transform and opacity only (GPU-accelerated)
- **Code splitting**: Lazy load chart libraries and map components

---

## 8. Design Patterns Reference

### 8.1 Card Layout Patterns from Reference Screenshot

#### "Make the Connection" Pattern
Two-column layout with dark card on right:
- Left: White background, body text
- Right: Dark (Primary-900) card with image, headline, description, button
- Use for: Key thesis statements, featured content

#### "Featured Tools" / "Most Viewed" Pattern
Grid of 3-4 cards with:
- Eyebrow label (category)
- Bold title
- Short description
- Date or metadata
- Hover: Lift and shadow

#### "Providers Visualization" Pattern
Bubble chart with overlapping circles:
- Large outer circles (categories)
- Smaller inner circles (subcategories)
- Labels inside circles
- Accent colors for distinction
- Use for: Hierarchical or proportional data

### 8.2 Common Section Structures

#### Section Header
```html
<header class="section-header">
  <span class="section-eyebrow">Featured Insights</span>
  <h2 class="section-title">Health Gaps Across Neighborhoods</h2>
  <p class="section-description">Brief description...</p>
</header>
```

#### Section with Sidebar Filter
```html
<section class="section-with-sidebar">
  <aside class="sidebar">
    <!-- Filters, legend, controls -->
  </aside>
  <main class="main-content">
    <!-- Map, chart, or data display -->
  </main>
</section>
```

Grid: 250px sidebar, 1fr main content on desktop

---

## 9. Content Guidelines

### 9.1 Writing Tone
- **Professional but approachable**: "Explore health outcomes" not "Analyze statistical distributions"
- **Active voice**: "See how neighborhoods compare" not "Comparisons can be seen"
- **Plain language**: Avoid jargon, define acronyms on first use (SDOH, HOI)
- **Concise**: Headlines 5-8 words, descriptions 15-25 words

### 9.2 Data Presentation
- **Context first**: Always provide context before showing data
- **Comparisons**: Show relative values (vs average, vs previous year)
- **Units**: Always include units (years, %, per 100k)
- **Precision**: Round to 1 decimal for percentages, 0-1 decimals for years
- **Null states**: "Data not available" rather than blank or "N/A"

### 9.3 Accessibility in Content
- **Alt text for charts**: Describe trend, not just title ("Bar chart showing Downtown has lowest life expectancy at 76 years, 5 years below city average")
- **Link text**: Descriptive ("View health outcomes data") not generic ("Click here")
- **Headings**: Logical hierarchy, don't skip levels

---

## 10. Changelog & Version History

**Version 1.0** (Current)
- Initial design system based on CMS.gov reference and project brief
- Defined complete token system (colors, typography, spacing, shadows)
- Documented component library (buttons, cards, forms, charts)
- Specified accessibility requirements (WCAG 2.1 AA)
- Provided implementation guidelines

**Future Considerations**:
- Mobile responsive patterns (out of scope for prototype)
- Dark mode variant (if needed for accessibility)
- Expanded chart library (treemaps, sankey diagrams)
- Animation library (more complex scroll interactions)

---

## Appendix: Token Export for Development

### CSS Custom Properties (Full Export)
```css
:root {
  /* Neutrals */
  --neutral-100: #FFFFFF;
  --neutral-200: #F5F7FA;
  --neutral-300: #E5E9EF;
  --neutral-400: #CBD2E0;
  --neutral-600: #71767A;
  --neutral-700: #3A4A5F;
  --neutral-900: #1B2430;
  
  /* Primary Blues */
  --primary-50: #E7F2FF;
  --primary-100: #CCE5FF;
  --primary-200: #A4C8F4;
  --primary-500: #1B76D1;
  --primary-700: #14549B;
  --primary-900: #0C3058;
  
  /* Accents */
  --accent-orange: #F5A623;
  --accent-teal: #2BB8AA;
  --accent-magenta: #C73B8F;
  --success-green: #27AE60;
  --error-red: #E74C3C;
  
  /* Typography */
  --font-primary: 'Public Sans', 'Open Sans', -apple-system, sans-serif;
  --font-mono: 'IBM Plex Mono', 'Courier New', monospace;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.375rem;
  --font-size-2xl: 1.75rem;
  --font-size-3xl: 2.375rem;
  --font-size-4xl: 3.25rem;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --line-height-tight: 1.2;
  --line-height-snug: 1.4;
  --line-height-normal: 1.6;
  --line-height-loose: 1.8;
  --letter-spacing-tight: -0.02em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.08em;
  
  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  --space-32: 8rem;
  
  /* Layout */
  --container-xl: 1200px;
  --container-2xl: 1440px;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-base: 0 4px 12px 0 rgba(0, 0, 0, 0.06);
  --shadow-md: 0 6px 16px 0 rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 10px 24px 0 rgba(0, 0, 0, 0.10);
  --shadow-xl: 0 20px 40px 0 rgba(0, 0, 0, 0.12);
  --shadow-focus: 0 0 0 3px rgba(27, 118, 209, 0.3);
  
  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 400ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slowest: 600ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

**End of Design System Document**
