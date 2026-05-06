# Design Brief

## Project Title
**Health Equity Explorer – Interactive Data Story**

## Purpose
Design a desktop-first, scrollable interactive experience that helps users explore how health outcomes and social determinants of health (SDOH) vary across neighborhoods. The prototype will use fictitious data and is meant to demonstrate how complex health equity concepts can be communicated clearly and persuasively through modern, web-based storytelling.

## Key Definitions
- **SDOH** (Social Determinants of Health): Economic stability, education access, healthcare access, neighborhood environment, and social context factors that affect health outcomes
- **HOI** (Health Opportunity Index): A composite metric measuring neighborhood-level factors that create opportunities for health (housing, education, employment, environment)
- **Health Equity**: Fair and just opportunity for all people to attain their highest level of health

## Primary Audience

### Primary Users
- **Health Equity Program Lead** (Avery Martinez) and colleagues in public health departments
- **Public health professionals** who need to present data to stakeholders and decision-makers

### Secondary Users
- **Community organizations** advocating for health resources and policy changes
- **Journalists** covering health disparities and social justice issues
- **Policymakers** making funding and program decisions

### Audience Characteristics
- Not necessarily data visualization experts, but comfortable with basic charts and maps
- Need to understand *patterns and relationships* more than raw statistics
- Value evidence-based narratives that connect data to real-world impact
- May be viewing on desktop/laptop workstations in office settings

## Design Goals

### 1. Clarity over Complexity
Present data in a clean, minimal interface that feels trustworthy and professional. Data should be simplified without being oversimplified—show meaningful patterns, hide unnecessary detail.

### 2. Narrative-Driven
Use strong section hierarchy, headlines, and featured content blocks to guide users through a structured story with clear beginning, middle, and end.

### 3. Data-Informed and Approachable
Balance data presentation with narrative context. Charts, maps, and metrics should feel integrated with the story (not separate “reports”). Use progressive disclosure: high-level insights visible immediately, deeper data available on interaction.

### 4. Institutional yet Human
Blend a modern, institutional look (cool blues, crisp typography, clean layouts) with humanizing elements (diverse imagery, neighborhood stories, relatable language) where appropriate.

### 5. Consistency and Reusability
Define a simple design system (colors, typography, spacing, components) that can be reused across sections and potentially extended to future data stories.

## Tone & Visual Style

### Visual Characteristics
- **Professional, modern, and calm** – dominant cool blues and whites with strategic use of accent colors for data emphasis
- **Data-centric** – crisp typography, generous white space, clean charts with clear labels
- **Optimistic and supportive** – subtle gradients and soft curves to make data feel accessible, not intimidating
- **Government/health brand-adjacent** – feels like a trusted public agency or major health data portal

### Design References
The visual approach should reference modern civic data platforms that balance authority with approachability (e.g., data.gov modernization, CDC dashboards, county health rankings).

## Page Structure (High-Level)

The prototype follows a long-scroll layout with clear “bands” or sections:

### 1. Hero / Intro Band
- **Headline**: “Data that helps you understand health equity in your community” (or similar)
- **Subheadline**: Brief explanation of what users can discover
- **Call-to-action**: “Explore neighborhoods” button (no search in hero)
- **Background**: Light abstract pattern (wave/line motif) with subtle blue gradient
- **Purpose**: Immediate orientation and invitation to explore

### 2. Context Band (“Making the Connection”)
- **Layout**: Two-column layout
  - Left: Text explaining what health equity means and why neighborhood conditions matter (2-3 paragraphs)
  - Right: Supporting image (diverse community, neighborhood scene, or abstract health visualization)
- **Callout card**: Primary message card introducing the story's thesis (e.g., “Where you live shapes your health. Explore how neighborhood conditions create different health opportunities.”)
- **Purpose**: Establish the “why” before diving into data

### 3. Featured Insights Band
- **Layout**: 3 cards in a row highlighting key sections users can navigate to
  - Card 1: “Health Gaps” – preview of disparities by race/income
  - Card 2: “Neighborhood Conditions” – preview of SDOH/HOI factors
  - Card 3: “Explore Your Community” – preview of interactive neighborhood lookup
- **Visual style**: Card-based layout with icons, short descriptions, and “Learn more” links
- **Purpose**: Provide clear pathways into the data story

### 4. Data Story Bands

#### Band 4A: Geographic Overview (Map)
- **Headline**: “Health outcomes vary dramatically across neighborhoods”
- **Content**: Interactive choropleth map showing life expectancy or HOI by neighborhood
- **Map Style**: Minimal base layer (light gray, neighborhood boundaries only, no streets)
- **Interactions**: 
  - Hover: Tooltip with neighborhood name, value, comparison to average
  - Click: Select neighborhood to populate “Explore Your Community” cards below
  - NO zoom/pan (fixed view)
- **Legend**: Bottom-right, horizontal bar with 5-7 color steps (min, max, average labeled)
- **Color Scale**: 7-step sequential (Primary-50 to Primary-900)
- **Background**: Light gray or white
- **Purpose**: Show geographic distribution and variation

#### Band 4B: Disparities Deep Dive
- **Headline**: “Health gaps persist across race and income”
- **Content**: Grouped horizontal bar chart comparing life expectancy by race/ethnicity (5-6 groups)
- **Chart Details**:
  - Metric: Life expectancy in years
  - Sorting: Descending by value (highest first)
  - Annotations: State average line (dashed), gap arrows with “-X years” labels
- **Supporting text**: 2-3 sentences contextualizing the disparities
- **Background**: Light blue tint to distinguish from map section
- **Purpose**: Highlight equity gaps in the data

#### Band 4C: Relationships & Drivers
- **Headline**: “Neighborhood conditions shape health outcomes”
- **Content**: Scatter plot showing relationship between HOI and life expectancy
- **Chart Details**:
  - X-axis: HOI score (0-100)
  - Y-axis: Life expectancy (years)
  - Data points: One dot per neighborhood (25 neighborhoods)
  - Annotations: Quadrant labels (“High opportunity, high life expectancy”, etc.), 2-3 specific neighborhoods labeled
  - Trendline: Linear regression in Primary-700, dashed
- **Background**: White or subtle gradient
- **Purpose**: Demonstrate the connection between SDOH and health

### 5. Explore Your Community Band
- **Headline**: “Look up your neighborhood”
- **Content**: 
  - **Neighborhood Lookup**: Autocomplete search input (type to filter neighborhoods)
  - **Default State**: Show city/region average with prompt “Select a neighborhood to compare”
  - **Summary Cards**: Grid of 4-6 small metric cards (one per metric)
  - **Metrics Displayed**:
    1. Life Expectancy (vs city average)
    2. HOI Score (0-100 scale)
    3. Top 2 SDOH factors (e.g., “Housing: 78/100”, “Education: 65/100”)
    4. Population size
    5. Predominant demographic (optional)
  - **Comparison Visualization**: Horizontal bar charts showing neighborhood value vs. city average (Green if above, Orange if below)
- **Visual emphasis**: Similar to “Most Viewed” or featured dataset styling—make this interactive element feel important
- **Background**: Distinct color (medium blue) to signal interactivity
- **Purpose**: Personalize the data, allow users to find their own community

### 6. Footer Band
- **Content**: 
  - Links: Methodology, Data sources, Download data (placeholder), Contact, About
  - Agency logo: Generic “Public Health Agency” seal placeholder
  - NO social media icons
  - NO newsletter signup
  - Disclaimers: “This prototype uses fictitious data for demonstration purposes”
  - Copyright/attribution
- **Visual style**: Dark blue footer matching institutional design pattern
- **Purpose**: Provide credibility, transparency, and next steps

## Design System Specifications

### Color Palette
- **Primary Blue**: `#0A4C6A` (dark blue for headers, footer)
- **Secondary Blue**: `#1E88B8` (medium blue for accents, interactive elements)
- **Light Blue**: `#E8F4F8` (backgrounds, subtle highlights)
- **Neutral Gray**: `#F5F7F9` (alternate backgrounds)
- **Text**: `#1A1A1A` (body text), `#4A4A4A` (secondary text)
- **Accent Orange**: `#E67E22` (use sparingly for data highlights, warnings)
- **Success Green**: `#27AE60` (positive indicators)
- **White**: `#FFFFFF` (primary background)

### Typography
- **Headings**: Inter or similar modern sans-serif, weights 600-700
  - H1: 48px / 3rem
  - H2: 36px / 2.25rem
  - H3: 24px / 1.5rem
- **Body text**: Inter or similar, weight 400
  - Large body: 18px / 1.125rem (line-height 1.6)
  - Standard body: 16px / 1rem (line-height 1.5)
- **Data labels**: 14px / 0.875rem, weight 500

### Spacing
- **Section padding**: 80px vertical, 40px horizontal (desktop)
- **Card spacing**: 24px gaps between cards
- **Content max-width**: 1200px (centered)

### Components to Define
- **Button**: Primary (filled blue), Secondary (outlined), Ghost
- **Card**: Standard card with optional image, title, description, link
- **Data Card**: Metric cards for statistics (large number + label + context)
- **Chart Container**: Consistent padding, title placement, legend styling
- **Navigation**: Minimal navigation (Logo + About, Methods, Contact links only, no section anchors)
- **Search**: Placeholder search bar in header only (non-functional)

## Technical Specifications

### Target Devices & Browsers
- **Primary**: Desktop/laptop, 1280px+ width
- **Secondary**: Tablet landscape (1024px+)
- **Browsers**: Modern evergreen browsers (Chrome, Firefox, Safari, Edge) - last 2 versions
- **Note**: Mobile responsive design is out of scope for this prototype but should be considered for future iterations

### Performance Targets
- **Initial page load**: < 3 seconds on broadband
- **Time to interactive**: < 5 seconds
- **Chart rendering**: < 1 second per visualization
- **Smooth scrolling**: 60fps maintained during scroll animations

### Accessibility Requirements
- **WCAG 2.1 Level AA compliance** minimum
- **Color contrast**: All text meets 4.5:1 minimum (7:1 for large text)
- **Keyboard navigation**: All interactive elements accessible via keyboard
- **Screen readers**: Semantic HTML, ARIA labels for charts and interactive elements
- **Focus indicators**: Clear visual focus states for all interactive elements
- **Alt text**: Meaningful descriptions for images and data visualizations

### Data Structure (Fictitious Data Requirements)
**Dataset Size**: 25 neighborhoods

Each neighborhood record should include:
- Neighborhood ID and name
- Geographic coordinates (for mapping)
- Life expectancy (years): Range 72-84 years (city average: 78 years)
- HOI score (0-100 scale): Bimodal distribution, range 15-90, median ~50
- SDOH component scores: housing, education, employment, environment, healthcare access
- Demographic data: predominant race/ethnicity (White 30%, Black/African American 25%, Hispanic/Latino 20%, Asian 15%, Multiracial/Other 10%), median income bracket
- Population size
- Geographic clustering: 3-4 regional clusters (downtown, north, south, west)

**Data Relationships**:
- Correlation between HOI and life expectancy: r = 0.65-0.75 (moderate to strong positive correlation with outliers)

## Interaction Patterns

### Scrolling Behavior
- **Scroll-triggered animations**: Fade-in or slide-in effects as sections enter viewport (subtle, not distracting)
- **Sticky elements**: Consider sticky section navigation if user testing shows need
- **Smooth scroll**: Implement smooth scrolling for anchor links between sections

### Data Visualization Interactions
- **Hover states**: Tooltips showing detailed data on hover (maps, charts)
- **Click/tap**: Select neighborhoods on map to populate detail cards
- **Filters**: Simple dropdown or radio button filters (no complex UI)
- **Responsive charts**: Charts scale appropriately to container width

### Feedback & States
- **Loading states**: Skeleton screens or spinners for data loading
- **Empty states**: Friendly messages if no data available
- **Error states**: Clear, non-technical error messages with next steps
- **Success states**: Confirmation when actions complete (e.g., data filtered)

## Success Metrics (Post-Launch)

### User Engagement
- Time on page (target: 3-5 minutes average)
- Scroll depth (target: 70%+ reach footer)
- Interaction rate (target: 50%+ use neighborhood lookup)

### Comprehension
- Post-view survey: “I understand how neighborhood conditions affect health” (target: 80% agree/strongly agree)
- Stakeholder feedback: Can users explain one key insight after viewing?

### Technical Performance
- Page load time < 3s (measured)
- Accessibility audit score: 95%+ (Lighthouse/axe DevTools)
- Zero critical console errors

## Project Constraints & Considerations

### In Scope
- Desktop prototype with fictitious data
- 6 main content bands as outlined above
- Basic interactivity (map hover, neighborhood lookup, filters)
- Static design system documentation

### Out of Scope
- Mobile-responsive design (future phase)
- Real data integration/API connections
- User accounts or personalization beyond neighborhood lookup
- Advanced analytics or data export functionality
- Content management system integration

### Timeline
- **Design phase**: [To be determined]
- **Development phase**: [To be determined]
- **Review & iteration**: [To be determined]

## Open Questions
1. Should we include a “Stories” section with qualitative narratives from community members?
2. Do we need a tutorial/onboarding tooltip sequence for first-time users?
3. Should the map be the hero element (moved to top), or is context-first the better approach?
4. What's the source attribution for the fictitious data? (e.g., “Modeled after X city data structure”)
