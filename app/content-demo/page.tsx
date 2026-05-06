'use client';

import { Navigation, Footer, HeroSection, SectionBand, ContextSection, InsightsGrid } from '@/components/organisms';
import { SectionHeader } from '@/components/molecules';
import { PlaceholderImage, Button, Badge } from '@/components/atoms';
import type { InsightCardData } from '@/components/organisms/InsightsGrid';
import styles from './page.module.css';

export default function ContentDemo() {
  const sampleInsights: InsightCardData[] = [
    {
      id: '1',
      icon: '📊',
      eyebrow: 'Category 1',
      title: 'First Feature Card',
      description: 'This demonstrates the FeatureCard component within the InsightsGrid. It has a dark background and supports icons, titles, and descriptions.',
      linkText: 'Learn More',
      linkHref: '#'
    },
    {
      id: '2',
      icon: '🏘️',
      eyebrow: 'Category 2',
      title: 'Second Feature Card',
      description: 'Each card is interactive with hover states and can trigger actions. The grid layout automatically handles three columns.',
      linkText: 'Explore',
      linkHref: '#'
    },
    {
      id: '3',
      icon: '🔍',
      eyebrow: 'Category 3',
      title: 'Third Feature Card',
      description: 'Cards include eyebrow labels, emoji icons, and call-to-action links with arrow icons that animate on hover.',
      linkText: 'Get Started',
      linkHref: '#'
    }
  ];

  return (
    <>
      <Navigation />

      <main>
        <HeroSection
          eyebrow="Phase 3 Demo"
          headline="Static Content Sections"
          subheadline="Demonstrating context bands, featured insights grid, section headers, and content layout patterns."
        />

        <SectionBand variant="light">
          <div className={styles.demoHeader}>
            <Badge variant="success">Phase 3 Complete</Badge>
            <h1>Static Content Section Components</h1>
            <p>
              This page demonstrates all Phase 3 deliverables: section headers, context sections with two-column layouts, featured insights grids, and callout cards.
            </p>
          </div>
        </SectionBand>

        <SectionBand variant="neutral">
          <h2 className={styles.componentTitle}>Section Header Component</h2>
          <p className={styles.description}>
            The SectionHeader provides consistent structure for section introductions with optional eyebrow, headline, and description.
          </p>

          <div className={styles.examples}>
            <div className={styles.example}>
              <h3>Left Aligned (Default)</h3>
              <div className={styles.exampleBox}>
                <SectionHeader
                  eyebrow="Eyebrow Label"
                  headline="Section Headline Goes Here"
                  description="This is a description that provides additional context about the section content. It supports longer text for explanatory purposes."
                  align="left"
                />
              </div>
            </div>

            <div className={styles.example}>
              <h3>Center Aligned</h3>
              <div className={styles.exampleBox}>
                <SectionHeader
                  eyebrow="Centered Layout"
                  headline="Centered Section Header"
                  description="Center alignment is ideal for introduction sections that precede visual content like card grids or featured elements."
                  align="center"
                />
              </div>
            </div>
          </div>
        </SectionBand>

        <SectionBand variant="light">
          <h2 className={styles.componentTitle}>Context Section Component</h2>
          <p className={styles.description}>
            Two-column layout for text content with supporting images or callout cards. Supports left and right image positioning.
          </p>

          <div className={styles.example}>
            <h3>Image Right (Default)</h3>
            <ContextSection
              image={<PlaceholderImage label="Supporting Image" />}
              imagePosition="right"
            >
              <h3>Content Section Title</h3>
              <p>
                The ContextSection component creates a balanced two-column layout. The left column contains text content while the right displays an image or visual element.
              </p>
              <p>
                This layout works well for explanatory content that benefits from visual support. The component automatically handles spacing and alignment.
              </p>
              <div style={{
                background: 'var(--primary-900)',
                color: 'white',
                padding: 'var(--space-6)',
                borderRadius: 'var(--radius-lg)'
              }}>
                <h4 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>
                  Callout Card Example
                </h4>
                <p style={{ margin: 0 }}>
                  Callout cards within the content area highlight key messages or important insights.
                </p>
              </div>
            </ContextSection>
          </div>

          <div className={styles.example} style={{ marginTop: 'var(--space-12)' }}>
            <h3>Image Left</h3>
            <ContextSection
              image={<PlaceholderImage label="Alternate Layout" />}
              imagePosition="left"
            >
              <h3>Flexible Layout Options</h3>
              <p>
                The image can be positioned on either side of the content. This creates visual variety when multiple context sections appear on the same page.
              </p>
              <p>
                Content flows naturally and maintains readability across different viewport sizes.
              </p>
            </ContextSection>
          </div>
        </SectionBand>

        <SectionBand variant="neutral">
          <SectionHeader
            eyebrow="Featured Content"
            headline="Insights Grid Component"
            description="Three-column grid of feature cards for highlighting key topics, insights, or navigation options."
            align="center"
          />
          <InsightsGrid
            insights={sampleInsights}
            onCardClick={(id) => console.log('Card clicked:', id)}
          />
        </SectionBand>

        <SectionBand variant="light">
          <h2 className={styles.componentTitle}>Content Layout Patterns</h2>
          <p className={styles.description}>
            Phase 3 establishes reusable patterns for content presentation that maintain consistency across the application.
          </p>

          <div className={styles.patterns}>
            <div className={styles.pattern}>
              <div className={styles.patternIcon}>📄</div>
              <h4>Section Headers</h4>
              <p>Eyebrow, headline, and description structure for clear content hierarchy</p>
            </div>
            <div className={styles.pattern}>
              <div className={styles.patternIcon}>⚖️</div>
              <h4>Two-Column Layout</h4>
              <p>Balanced text and image presentation for explanatory content</p>
            </div>
            <div className={styles.pattern}>
              <div className={styles.patternIcon}>🎴</div>
              <h4>Feature Card Grid</h4>
              <p>Three-column grid for showcasing key insights or navigation</p>
            </div>
            <div className={styles.pattern}>
              <div className={styles.patternIcon}>💬</div>
              <h4>Callout Cards</h4>
              <p>Highlighted messages within content for emphasis</p>
            </div>
          </div>
        </SectionBand>

        <SectionBand variant="tinted">
          <div className={styles.completion}>
            <h2>Phase 3 Complete ✓</h2>
            <p>All static content section components implemented:</p>
            <ul>
              <li>SectionHeader with eyebrow/headline/description</li>
              <li>ContextSection with two-column layout</li>
              <li>InsightsGrid with three FeatureCards</li>
              <li>PlaceholderImage for supporting visuals</li>
              <li>Callout card pattern for key messages</li>
              <li>Integrated narrative flow on main page</li>
            </ul>
            <div style={{ marginTop: 'var(--space-6)' }}>
              <Button variant="primary">Continue to Phase 4: Data Visualizations →</Button>
            </div>
          </div>
        </SectionBand>
      </main>

      <Footer />
    </>
  );
}
