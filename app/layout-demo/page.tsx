'use client';

import { Navigation, Footer, HeroSection, SectionBand } from '@/components/organisms';
import { Button, Badge } from '@/components/atoms';
import { Card, CardHeader, MetricCard } from '@/components/molecules';
import styles from './page.module.css';

export default function LayoutDemo() {
  return (
    <>
      <Navigation />

      <main>
        <HeroSection
          eyebrow="Layout Demo"
          headline="Phase 2: Layout & Navigation Components"
          subheadline="Demonstrating the navigation bar, footer, hero section, and section band template with all variants."
          ctaText="Explore Sections"
          ctaHref="#sections"
        />

        <SectionBand variant="tinted" id="sections">
          <h2 className={styles.sectionTitle}>Section Band Variants</h2>
          <p className={styles.description}>
            The SectionBand component provides consistent layout structure with different background variants.
          </p>

          <div className={styles.grid}>
            <Card>
              <CardHeader
                eyebrow="Default"
                title="Light Variant"
                description="White background (--neutral-100)"
              />
            </Card>
            <Card>
              <CardHeader
                eyebrow="Tinted"
                title="Tinted Variant"
                description="Light blue background (--primary-50)"
              />
            </Card>
            <Card>
              <CardHeader
                eyebrow="Neutral"
                title="Neutral Variant"
                description="Light gray background (--neutral-200)"
              />
            </Card>
            <Card>
              <CardHeader
                eyebrow="Dark"
                title="Dark Variant"
                description="Dark blue background (--primary-900)"
              />
            </Card>
          </div>
        </SectionBand>

        <SectionBand variant="light">
          <h2 className={styles.sectionTitle}>Navigation Features</h2>
          <div className={styles.featureList}>
            <div className={styles.feature}>
              <Badge variant="success">✓ Sticky Positioning</Badge>
              <p>Header stays at top while scrolling</p>
            </div>
            <div className={styles.feature}>
              <Badge variant="success">✓ Scroll Shadow</Badge>
              <p>Shadow appears when page is scrolled</p>
            </div>
            <div className={styles.feature}>
              <Badge variant="success">✓ Hover States</Badge>
              <p>Links underline on hover</p>
            </div>
            <div className={styles.feature}>
              <Badge variant="success">✓ Focus Indicators</Badge>
              <p>Visible focus rings for keyboard navigation</p>
            </div>
            <div className={styles.feature}>
              <Badge variant="neutral">⌛ Search Bar</Badge>
              <p>Placeholder only (functional in Phase 5)</p>
            </div>
            <div className={styles.feature}>
              <Badge variant="primary">✓ Responsive</Badge>
              <p>Adapts to container width</p>
            </div>
          </div>
        </SectionBand>

        <SectionBand variant="neutral">
          <h2 className={styles.sectionTitle}>Hero Section Features</h2>
          <div className={styles.grid}>
            <MetricCard
              label="Gradient Background"
              value="135°"
              context="Primary-50 to Neutral-100"
              trend="positive"
            />
            <MetricCard
              label="Wave Pattern"
              value="SVG"
              context="Right side at 40% opacity"
              trend="positive"
            />
            <MetricCard
              label="Min Height"
              value="500px"
              context="Ensures visual prominence"
              trend="neutral"
            />
            <MetricCard
              label="Content Width"
              value="600px"
              context="Optimal readability"
              trend="positive"
            />
          </div>
        </SectionBand>

        <SectionBand variant="dark">
          <h2 className={styles.sectionTitle}>Footer Components</h2>
          <p className={styles.description}>
            The footer includes agency branding, link groups, and disclaimer text in a 3-column layout.
          </p>
          <div className={styles.footerDemo}>
            <div className={styles.footerColumn}>
              <h4>Column 1</h4>
              <p>Agency seal, name, and disclaimer</p>
            </div>
            <div className={styles.footerColumn}>
              <h4>Column 2</h4>
              <p>About, Team, Partners, Accessibility</p>
            </div>
            <div className={styles.footerColumn}>
              <h4>Column 3</h4>
              <p>Data Sources, Methodology, Definitions, Contact</p>
            </div>
          </div>
        </SectionBand>

        <SectionBand variant="light">
          <h2 className={styles.sectionTitle}>Width Variants</h2>
          <p className={styles.description}>
            Section bands support three width variants for different content types.
          </p>
          <div className={styles.widthDemo}>
            <div className={styles.widthBox}>
              <Badge variant="primary">Standard (1200px)</Badge>
              <p>Default content width</p>
            </div>
            <div className={styles.widthBox}>
              <Badge variant="primary">Wide (1440px)</Badge>
              <p>Full-width maps and charts</p>
            </div>
            <div className={styles.widthBox}>
              <Badge variant="primary">Full</Badge>
              <p>No max-width constraint</p>
            </div>
          </div>
        </SectionBand>

        <SectionBand variant="tinted">
          <div className={styles.completionCard}>
            <h2>Phase 2 Complete ✓</h2>
            <p>
              All layout and navigation components implemented with:
            </p>
            <ul>
              <li>Sticky navigation with scroll effects</li>
              <li>Hero section with gradient and SVG pattern</li>
              <li>Footer with 3-column layout</li>
              <li>Section band template with 4 variants</li>
              <li>Smooth scrolling behavior</li>
              <li>Full keyboard accessibility</li>
              <li>Design system consistency</li>
            </ul>
            <div style={{ marginTop: 'var(--space-6)' }}>
              <Button variant="primary">Continue to Phase 3 →</Button>
            </div>
          </div>
        </SectionBand>
      </main>

      <Footer />
    </>
  );
}
