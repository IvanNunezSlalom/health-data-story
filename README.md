# Health Equity Explorer

An interactive data story prototype demonstrating how health outcomes and social determinants of health vary across neighborhoods.

## Project Status

### ✅ Phase 0: Foundation Setup (Complete)

**Deliverables:**
- ✓ Next.js 14+ project scaffolded with TypeScript
- ✓ Design tokens implemented as CSS custom properties
- ✓ Global styles and reset applied
- ✓ Fictitious dataset generated (25 neighborhoods)
- ✓ Data utilities created
- ✓ TypeScript types defined

**Data Statistics:**
- 25 neighborhoods with complete health and SDOH metrics
- Average Life Expectancy: 77.6 years (range: 72.0-83.1 years)
- Average HOI Score: 54.2 (range: 17-84)
- Correlation (HOI vs Life Expectancy): 0.763 (strong positive)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Generate fictitious data (already done)
npm run generate-data

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
health-equity-explorer/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with fonts
│   ├── page.tsx             # Main page
│   └── globals.css          # Global styles + design tokens
├── components/
│   ├── atoms/               # Basic UI components
│   ├── molecules/           # Composite components
│   ├── organisms/           # Complex sections
│   └── visualizations/      # D3/chart components
├── lib/
│   ├── data.ts              # Data loading utilities
│   ├── formatters.ts        # Number/text formatting
│   └── stats.ts             # Statistical calculations
├── types/
│   └── index.ts             # TypeScript type definitions
├── styles/
│   └── tokens.css           # Design system tokens
├── public/
│   ├── data/
│   │   ├── neighborhoods.json      # 25 neighborhoods
│   │   └── demographic-data.json   # Race/income disparities
│   ├── fonts/               # Web fonts (if needed)
│   └── images/              # Static assets
└── scripts/
    └── generate-data.ts     # Data generation script
```

## Design System

The project uses a comprehensive design system based on modern civic data platforms:

### Color Palette
- **Primary Blues**: Institutional trust (#0C3058 to #E7F2FF)
- **Neutrals**: Professional grays (#1B2430 to #FFFFFF)
- **Accents**: Orange, Teal, Magenta for data highlights
- **Semantic**: Success green, error red

### Typography
- **Font Family**: Public Sans (primary), Open Sans (fallback)
- **Type Scale**: 0.75rem to 3.25rem (responsive)
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Spacing
- **Scale**: 4px base unit (0.25rem to 8rem)
- **Container**: 1200px (standard), 1440px (wide)

See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for complete specifications.

## Data Structure

### Neighborhood Data
Each neighborhood includes:
- Basic info: ID, name, coordinates, population, zip code
- Health metrics: Life expectancy, mortality rates, disease prevalence
- SDOH scores: HOI score/category, poverty, unemployment, education, housing
- Demographics: Predominant race/ethnicity, median income bracket

### Demographic Data
Aggregate data by:
- Race/ethnicity groups (6 groups)
- Income quintiles (5 groups)

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: CSS Modules + CSS Custom Properties
- **Data Viz**: D3.js v7, Recharts, Leaflet
- **Animations**: Framer Motion
- **Accessibility**: React Aria, Radix UI

## Development

### Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Generate data
npm run generate-data
```

### Browser Support
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

Desktop-first design optimized for 1280px+ viewports.

## Accessibility

Target: WCAG 2.1 Level AA compliance
- Color contrast: 4.5:1 minimum for text
- Keyboard navigation: Full support
- Screen readers: Semantic HTML + ARIA labels
- Focus indicators: Visible on all interactive elements

## Next Steps

### Phase 1: Core Components Library
- Atoms: Button, Input, Badge, Divider
- Molecules: Card, MetricCard, ChartContainer, Tooltip

### Phase 2: Layout & Navigation
- Navigation bar, footer, hero section
- Section band templates

See [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) for full roadmap.

## Documentation

- [PROJECT_BRIEF.md](./PROJECT_BRIEF.md) - Project overview and objectives
- [REQUIREMENTS.md](./REQUIREMENTS.md) - Functional and non-functional requirements
- [DESIGN_BRIEF.md](./DESIGN_BRIEF.md) - Design goals and visual specifications
- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) - Complete design system documentation
- [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) - Phased development plan

## License

This is a prototype for demonstration purposes using fictitious data.

## Credits

Built with Claude Code following industry best practices for health data visualization and civic technology design.
