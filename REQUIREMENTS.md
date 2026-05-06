# Health Equity Data Story – Requirements Document

## 1. Functional Requirements

### 1.1 Views and Sections

The prototype is a **single-page scrollable story** divided into the following sections:

#### **Section 1: Landing / Introduction**
- **Purpose**: Introduce the concept of health equity and social determinants of health (SDOH).
- **Content**:
  - Headline and brief explanatory text (e.g., "Where you live shouldn't determine how long you live").
  - Key statistic or pull quote to establish urgency (e.g., "Life expectancy varies by 15 years across our county").
  - Brief definition of SDOH and why they matter.
  - Call-to-action to scroll down and explore.
- **Visual**: Hero graphic or simple icon representing health equity (e.g., neighborhood silhouettes, life expectancy curve).

#### **Section 2: Health Outcomes by Neighborhood**
- **Purpose**: Show geographic variation in a key health outcome (life expectancy or premature mortality rate).
- **Content**:
  - Narrative text explaining what the map shows.
  - Interactive **choropleth map** of neighborhoods color-coded by life expectancy (or selected outcome).
  - Legend with clear color scale and units.
  - Hover tooltips showing:
    - Neighborhood name
    - Life expectancy value
    - Additional context (e.g., "10 years below county average")
- **Interactions**:
  - Hover over neighborhoods to see details.
  - Optional: dropdown to switch between outcomes (life expectancy, premature mortality, diabetes prevalence).

#### **Section 3: Disparities by Demographic Groups**
- **Purpose**: Illustrate how health outcomes differ by race/ethnicity and income.
- **Content**:
  - Narrative text framing the disparities.
  - **Bar chart or dot plot** showing life expectancy (or another outcome) by race/ethnicity.
  - **Bar chart or dot plot** showing the same outcome by income quintile.
  - Annotations highlighting the largest gaps (e.g., "White residents live 8 years longer on average than Black residents").
- **Interactions**:
  - Hover tooltips with exact values and confidence intervals (if applicable).
  - Optional: toggle between different health outcomes.

#### **Section 4: Introducing the Health Opportunity Index (HOI)**
- **Purpose**: Explain what the HOI/SDOH Composite Score is and how it's calculated.
- **Content**:
  - Narrative text defining the HOI (e.g., "A measure of neighborhood conditions that create opportunities for health").
  - List or visual showing the components (e.g., education, economic stability, housing, healthcare access).
  - **Choropleth map** of neighborhoods color-coded by HOI category (e.g., "Very Low", "Low", "Moderate", "High", "Very High").
  - Legend and hover tooltips with HOI score and category.
- **Interactions**:
  - Hover to see neighborhood HOI details.
  - Optionally click to see breakdown of component scores.

#### **Section 5: Linking Health Outcomes to Social Conditions**
- **Purpose**: Show the relationship between HOI and health outcomes.
- **Content**:
  - Narrative text explaining the connection (e.g., "Neighborhoods with higher health opportunity have better outcomes").
  - **Scatterplot** or **grouped bar chart** showing:
    - X-axis: HOI category or score
    - Y-axis: Life expectancy (or other outcome)
    - Points/bars representing individual neighborhoods or group averages
  - Trend line or visual annotation showing the relationship.
- **Interactions**:
  - Hover over points to see neighborhood name and values.
  - Optional: filter by demographic group to see if the relationship holds across race/ethnicity or income.

#### **Section 6: Explore Your Community**
- **Purpose**: Allow users to look up a specific neighborhood and see its health and SDOH profile.
- **Content**:
  - Search or dropdown to select a neighborhood (by name, ZIP code, or census tract ID).
  - **Profile card** displaying:
    - Neighborhood name and identifier
    - Life expectancy and other key health outcomes
    - HOI score and category
    - SDOH indicators (poverty rate, unemployment, housing cost burden, etc.)
    - Small map showing location
  - Comparison to county or city average (e.g., "+3 years above average").
- **Interactions**:
  - Type or select from dropdown.
  - Profile updates immediately when selection changes.
  - Optional: "Compare neighborhoods" feature to see two side-by-side.

#### **Section 7: Conclusion and Call-to-Action**
- **Purpose**: Summarize key takeaways and suggest next steps.
- **Content**:
  - Summary text (e.g., "Health equity is achievable when we address the conditions where people live").
  - Links or buttons for:
    - "Read the full report"
    - "Explore the data in detail"
    - "Contact us to get involved"
- **Visual**: Optional infographic or icon set summarizing key interventions.

---

### 1.2 Interactions

#### **General Navigation**
- Smooth scrolling between sections.
- Sticky or anchored navigation menu (optional) to jump to sections.
- Responsive scroll-triggered animations (e.g., charts fade in as user scrolls).

#### **Map Interactions**
- Hover over a neighborhood to see tooltip with details.
- Click on a neighborhood to highlight it and scroll to its profile (optional).
- Zoom and pan disabled (or minimal) to keep the experience simple.

#### **Chart Interactions**
- Hover over bars, points, or lines to see exact values.
- Tooltips appear smoothly and are easy to read (clear font, contrasting background).
- Optional toggle buttons to switch between:
  - Different health outcomes
  - Different demographic breakdowns

#### **Filters and Selections**
- Dropdown menus to:
  - Select health outcome (e.g., life expectancy, diabetes prevalence)
  - Select demographic group (e.g., all, by race/ethnicity, by income)
  - Select neighborhood for profile
- Filters apply instantly without page reload.

#### **Accessibility Interactions**
- Keyboard navigation supported for all interactive elements.
- Focus states clearly visible.
- ARIA labels for screen readers.

---

### 1.3 Data Needs

The prototype requires **fictitious datasets** with the following structure:

#### **Dataset 1: Neighborhoods**
| Field | Type | Description |
|-------|------|-------------|
| `neighborhood_id` | string | Unique identifier (e.g., census tract ID) |
| `neighborhood_name` | string | Display name (e.g., "Downtown", "Riverside") |
| `geometry` | GeoJSON | Polygon coordinates for map rendering |
| `population` | integer | Total population |
| `zip_code` | string | Associated ZIP code (for search) |

#### **Dataset 2: Health Outcomes**
| Field | Type | Description |
|-------|------|-------------|
| `neighborhood_id` | string | Foreign key to Neighborhoods |
| `life_expectancy` | float | Life expectancy at birth (years) |
| `premature_mortality_rate` | float | Deaths per 100,000 under age 75 |
| `infant_mortality_rate` | float | Deaths per 1,000 live births |
| `diabetes_prevalence` | float | Percent of adults with diabetes |
| `asthma_ed_rate` | float | ED visits per 10,000 residents |

#### **Dataset 3: Health Outcomes by Demographic Group**
| Field | Type | Description |
|-------|------|-------------|
| `demographic_group` | string | e.g., "White", "Black", "Hispanic", "Asian", "Income Q1", "Income Q5" |
| `group_type` | string | "race_ethnicity" or "income_quintile" |
| `life_expectancy` | float | Life expectancy for this group |
| `premature_mortality_rate` | float | Premature mortality for this group |
| (other outcomes) | float | Additional outcomes as needed |

#### **Dataset 4: Social Determinants (SDOH)**
| Field | Type | Description |
|-------|------|-------------|
| `neighborhood_id` | string | Foreign key to Neighborhoods |
| `hoi_score` | float | Health Opportunity Index (0-100) |
| `hoi_category` | string | "Very Low", "Low", "Moderate", "High", "Very High" |
| `poverty_rate` | float | Percent of residents below poverty line |
| `unemployment_rate` | float | Percent unemployed |
| `housing_cost_burden` | float | Percent spending >30% of income on housing |
| `hs_graduation_rate` | float | Percent completing high school |
| `primary_care_access` | float | Primary care providers per 10,000 residents |

#### **Dataset 5: HOI Component Scores (optional detail)**
| Field | Type | Description |
|-------|------|-------------|
| `neighborhood_id` | string | Foreign key to Neighborhoods |
| `education_score` | float | Education component (0-100) |
| `economic_score` | float | Economic stability component (0-100) |
| `housing_score` | float | Housing quality component (0-100) |
| `healthcare_access_score` | float | Healthcare access component (0-100) |

#### **Data Volume**
- **20-50 neighborhoods** (enough for visual variation, not overwhelming).
- **4-6 race/ethnicity groups** and **5 income quintiles** for demographic breakdowns.
- Data should have realistic variation (e.g., life expectancy ranging from 68 to 83 years, HOI scores from 20 to 90).

---

## 2. Non-Functional Requirements

### 2.1 Layout and Design

#### **Desktop-First**
- Optimized for **1280px – 1920px wide viewports**.
- Minimum width: 1024px.
- Mobile optimization is **out of scope** (prototype may display poorly on phones/tablets).

#### **Visual Style**
- Clean, modern design with ample whitespace.
- Professional color palette appropriate for public health context:
  - Use **colorblind-friendly palettes** for maps and charts (e.g., ColorBrewer, Viridis).
  - Avoid red/green combinations.
- Typography: Clear, legible sans-serif fonts (e.g., Inter, Roboto, system fonts).
- Consistent spacing and alignment across sections.

#### **Narrative Flow**
- Each section has a clear heading and introductory text.
- Annotations and callouts guide attention to key insights.
- Scrolling feels intentional, with sections aligned to viewport height where appropriate.

### 2.2 Accessibility

#### **Basic Accessibility (WCAG 2.1 AA target)**
- **Color Contrast**: Text and interactive elements meet 4.5:1 contrast ratio.
- **Keyboard Navigation**: All interactive elements (buttons, dropdowns, map features) are keyboard-accessible.
- **Focus Indicators**: Visible focus outlines on all interactive elements.
- **Alt Text**: Meaningful alt text for images and icons.
- **ARIA Labels**: Screen-reader-friendly labels for charts, maps, and controls.
- **Semantic HTML**: Proper use of headings (`<h1>`, `<h2>`, etc.) and landmarks (`<nav>`, `<main>`, `<section>`).

#### **Data Accessibility**
- Tooltips are keyboard-accessible (e.g., via focus, not just hover).
- Data tables or text summaries available as alternative to visual charts (optional but recommended).

### 2.3 Performance

#### **Load Time**
- Initial page load under **3 seconds** on broadband connection.
- Data files pre-generated and served as static JSON or embedded in HTML.

#### **Responsiveness**
- Interactions (hover, filter changes, dropdown selections) respond within **100ms**.
- Smooth scrolling and transitions (60fps target).

#### **Asset Size**
- GeoJSON files optimized (simplified geometries, ~500KB or less).
- Charts rendered with lightweight libraries (e.g., D3.js, Chart.js, Plotly, Observable Plot).
- Images compressed and appropriately sized.

### 2.4 Browser Compatibility

- **Target Browsers**:
  - Chrome (latest 2 versions)
  - Firefox (latest 2 versions)
  - Safari (latest 2 versions)
  - Edge (latest 2 versions)
- **No Support Needed**: Internet Explorer, mobile browsers (for this prototype).

### 2.5 Technology Stack Considerations

While implementation is deferred, the requirements assume:
- **Frontend Framework**: Modern JavaScript framework (React, Vue, Svelte, or vanilla JS + D3).
- **Data Visualization**: D3.js, Chart.js, Plotly, or Observable Plot.
- **Mapping**: Leaflet, Mapbox GL JS, or D3 with GeoJSON.
- **Styling**: CSS framework (Tailwind, Bootstrap) or custom CSS.
- **Build Tool**: Vite, Next.js, or similar for development and bundling.

---

## 3. Assumptions and Constraints

### 3.1 Assumptions

- **Fictitious Data**: All data is synthetic and does not represent real individuals or identifiable health information. Data generation can use plausible ranges and correlations informed by public health research, but does not need to be statistically rigorous.

- **Static Prototype**: The prototype is a **proof-of-concept**, not a production system. It demonstrates the user experience and visual design, not scalability or integration with live data sources.

- **No Backend**: All data is pre-generated and embedded in the frontend (as JSON files or JavaScript modules). No server-side logic, databases, or APIs are required.

- **Single User Persona**: Designed primarily for **Avery Martinez** and similar health equity program staff. Other user types (e.g., community members, data analysts) are secondary.

- **Stable Requirements**: Scope is fixed for the prototype phase. Additional features (e.g., mobile support, advanced analytics) can be considered for future phases but are **out of scope** now.

### 3.2 Constraints

- **Time**: Prototype should be achievable in a reasonable timeframe (e.g., 1-2 weeks of development for a single developer).

- **Budget**: No budget for licensed data, premium mapping services, or third-party APIs. Use open-source tools and free tiers where applicable.

- **Privacy and Security**: Since data is fictitious, no PHI/PII protections are required. However, design should avoid patterns that would be insecure with real data (e.g., no hardcoded API keys, no inline scripts if using a CSP-friendly framework).

- **Platform**: Prototype will be delivered as a **static website** (HTML/CSS/JS) that can be:
  - Opened directly in a browser from local files (if no local server needed), or
  - Served via a simple local development server (e.g., `npm run dev`), or
  - Deployed to a free static hosting service (e.g., Vercel, Netlify, GitHub Pages) for sharing.

### 3.3 Out of Scope

The following are **explicitly out of scope** for this prototype:

- **Live Data Integration**: No connections to real health surveillance systems, census APIs, or live databases.
- **Real Health Data**: No use of actual patient records, de-identified health datasets, or sensitive information.
- **Mobile Optimization**: The prototype does not need to be responsive or usable on phones or tablets.
- **Advanced Analytics**: No statistical modeling, regression analysis, confidence intervals (unless pre-calculated in data), or "what-if" scenario simulations.
- **User Accounts and Authentication**: No login, user profiles, or role-based access control.
- **Data Entry or Editing**: Users cannot upload data, edit values, or save custom views.
- **Multilingual Support**: Prototype is English-only.
- **Production Deployment**: No need for HIPAA compliance, load balancing, monitoring, or enterprise-grade security.
- **Print Optimization**: No special print stylesheets or PDF export functionality.

---

## 4. Next Steps

With this requirements document in place, the next phases of work are:

1. **Data Generation**: Create fictitious datasets (neighborhoods, health outcomes, SDOH) in JSON format that satisfy the schema above.

2. **Wireframing / Mockups** (optional): Sketch or design low-fidelity layouts for each section to align on visual approach.

3. **Implementation**:
   - Set up project structure and build tooling.
   - Implement landing and narrative sections with static content.
   - Build interactive map and charts with D3 or chosen library.
   - Wire up filters, dropdowns, and neighborhood profile feature.
   - Add hover tooltips and accessibility features.

4. **Testing and Refinement**:
   - Test interactions in target browsers.
   - Review with primary user persona (Avery Martinez or proxy).
   - Iterate on visual design and narrative flow.

5. **Documentation and Handoff**:
   - Write brief user guide or demo script.
   - Document data sources and assumptions.
   - Package prototype for sharing or deployment.
