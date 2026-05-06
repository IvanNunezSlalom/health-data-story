'use client';

import React, { useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Badge } from '@/components/atoms/Badge';
import { Divider } from '@/components/atoms/Divider';
import { Card, CardHeader, CardBody, CardFooter } from '@/components/molecules/Card';
import { FeatureCard } from '@/components/molecules/FeatureCard';
import { MetricCard } from '@/components/molecules/MetricCard';
import { ChartContainer } from '@/components/molecules/ChartContainer';
import { Tooltip, TooltipItem } from '@/components/molecules/Tooltip';
import styles from './page.module.css';

export default function ComponentsDemo() {
  const [inputValue, setInputValue] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <main className="container section">
      <h1 style={{ marginBottom: 'var(--space-6)' }}>Component Library Demo</h1>
      <p style={{ marginBottom: 'var(--space-8)', color: 'var(--neutral-600)' }}>
        Phase 1: Core Components Library - Interactive showcase of all atoms and molecules
      </p>

      {/* Atoms Section */}
      <section className={styles.demoSection}>
        <h2 className={styles.sectionTitle}>Atoms</h2>

        {/* Buttons */}
        <div className={styles.componentGroup}>
          <h3 className={styles.componentTitle}>Buttons</h3>
          <div className={styles.componentRow}>
            <div className={styles.componentItem}>
              <span className={styles.label}>Primary Large</span>
              <Button variant="primary" size="large">
                Explore Neighborhoods
              </Button>
            </div>
            <div className={styles.componentItem}>
              <span className={styles.label}>Primary Medium</span>
              <Button variant="primary" size="medium">
                View Details
              </Button>
            </div>
            <div className={styles.componentItem}>
              <span className={styles.label}>Primary Small</span>
              <Button variant="primary" size="small">
                Learn More
              </Button>
            </div>
          </div>
          <div className={styles.componentRow}>
            <div className={styles.componentItem}>
              <span className={styles.label}>Secondary</span>
              <Button variant="secondary">Download Data</Button>
            </div>
            <div className={styles.componentItem}>
              <span className={styles.label}>Tertiary</span>
              <Button variant="tertiary">Read Report →</Button>
            </div>
            <div className={styles.componentItem}>
              <span className={styles.label}>Disabled</span>
              <Button variant="primary" disabled>
                Coming Soon
              </Button>
            </div>
          </div>
        </div>

        {/* Inputs */}
        <div className={styles.componentGroup}>
          <h3 className={styles.componentTitle}>Inputs</h3>
          <div className={styles.componentRow}>
            <div className={styles.componentItem} style={{ flex: '1' }}>
              <Input
                label="Search Neighborhoods"
                placeholder="Type neighborhood name or ZIP code..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                helperText="Enter at least 3 characters to search"
              />
            </div>
            <div className={styles.componentItem} style={{ flex: '1' }}>
              <Input
                label="Email Address"
                type="email"
                placeholder="your@email.com"
                error="Please enter a valid email address"
              />
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className={styles.componentGroup}>
          <h3 className={styles.componentTitle}>Badges</h3>
          <div className={styles.componentRow}>
            <Badge variant="neutral">Very Low</Badge>
            <Badge variant="primary">Low</Badge>
            <Badge variant="success">Moderate</Badge>
            <Badge variant="warning">High</Badge>
            <Badge variant="error">Very High</Badge>
          </div>
        </div>

        {/* Dividers */}
        <div className={styles.componentGroup}>
          <h3 className={styles.componentTitle}>Dividers</h3>
          <p>Horizontal divider below:</p>
          <Divider orientation="horizontal" />
          <p>Content after divider</p>
        </div>
      </section>

      <Divider />

      {/* Molecules Section */}
      <section className={styles.demoSection}>
        <h2 className={styles.sectionTitle}>Molecules</h2>

        {/* Cards */}
        <div className={styles.componentGroup}>
          <h3 className={styles.componentTitle}>Cards</h3>
          <div className={styles.cardGrid}>
            <Card>
              <CardHeader
                eyebrow="Health Outcomes"
                title="Life Expectancy by Neighborhood"
                description="See how life expectancy varies across 25 neighborhoods in our city."
              />
              <CardBody>
                <p>Interactive map showing geographic distribution of health outcomes.</p>
              </CardBody>
              <CardFooter>
                <Button variant="tertiary">View Map →</Button>
              </CardFooter>
            </Card>

            <Card interactive>
              <CardHeader
                eyebrow="Disparities"
                title="Health Gaps"
                description="Explore differences by race, ethnicity, and income."
              />
              <CardBody>
                <p>Bar charts and visualizations showing health equity gaps.</p>
              </CardBody>
            </Card>

            <Card>
              <CardHeader
                eyebrow="Social Determinants"
                title="Neighborhood Conditions"
                description="How housing, education, and employment affect health."
              />
              <CardBody>
                <Badge variant="success">HOI Score: 72</Badge>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Feature Card */}
        <div className={styles.componentGroup}>
          <h3 className={styles.componentTitle}>Feature Card</h3>
          <FeatureCard
            eyebrow="Key Finding"
            title="Where you live shapes your health"
            description="Life expectancy varies by 11 years across neighborhoods, driven by social and economic conditions."
            interactive
          >
            <Button variant="secondary" style={{ marginTop: 'var(--space-4)' }}>
              Read Full Report
            </Button>
          </FeatureCard>
        </div>

        {/* Metric Cards */}
        <div className={styles.componentGroup}>
          <h3 className={styles.componentTitle}>Metric Cards</h3>
          <div className={styles.metricGrid}>
            <MetricCard
              label="Life Expectancy"
              value="78.4 years"
              context="City average: 77.6 years"
              trend="positive"
            />
            <MetricCard
              label="HOI Score"
              value="62"
              context="High opportunity category"
              trend="positive"
            />
            <MetricCard
              label="Poverty Rate"
              value="24.3%"
              context="vs city avg: 28.1%"
              trend="positive"
            />
            <MetricCard
              label="Premature Mortality"
              value="420"
              context="per 100,000 residents"
              trend="negative"
            />
          </div>
        </div>

        {/* Chart Container */}
        <div className={styles.componentGroup}>
          <h3 className={styles.componentTitle}>Chart Container</h3>
          <ChartContainer
            eyebrow="Health Outcomes"
            title="Life Expectancy by Neighborhood"
            description="Hover over the chart area to see tooltip demo"
            legend={
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <div
                    style={{
                      width: '16px',
                      height: '16px',
                      background: 'var(--primary-500)',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  />
                  <span>Life Expectancy</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <div
                    style={{
                      width: '16px',
                      height: '16px',
                      background: 'var(--accent-teal)',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  />
                  <span>City Average</span>
                </div>
              </>
            }
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '300px',
                background: 'var(--neutral-200)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--neutral-600)',
                fontSize: 'var(--font-size-lg)',
              }}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onMouseMove={handleMouseMove}
            >
              Chart visualization will render here (Phase 4)
            </div>
          </ChartContainer>
        </div>

        {/* Tooltip */}
        <div className={styles.componentGroup}>
          <h3 className={styles.componentTitle}>Tooltip</h3>
          <p style={{ color: 'var(--neutral-600)' }}>
            Hover over the chart placeholder above to see the tooltip in action
          </p>
        </div>
      </section>

      {showTooltip && (
        <Tooltip title="Downtown Core" position={tooltipPos} visible={showTooltip}>
          <TooltipItem label="Life Expectancy" value="76.4 years" color="var(--primary-500)" />
          <TooltipItem label="City Average" value="77.6 years" color="var(--accent-teal)" />
          <TooltipItem label="Difference" value="-1.2 years" />
        </Tooltip>
      )}

      <Divider />

      {/* Status */}
      <section className={styles.demoSection}>
        <div
          style={{
            background: 'var(--success-green)',
            color: 'white',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <h3 style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
            ✓ Phase 1 Complete
          </h3>
          <p style={{ margin: 0 }}>
            All core components implemented with design system tokens, accessibility features, and
            interactive states.
          </p>
        </div>
      </section>
    </main>
  );
}
