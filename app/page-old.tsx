'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Neighborhood } from '../types';
import { Button, PlaceholderImage, FadeIn } from '@/components/atoms';
import { SectionHeader } from '@/components/molecules';
import { Navigation, Footer, HeroSection, SectionBand, ContextSection, InsightsGrid, ExploreSection } from '@/components/organisms';
import type { InsightCardData } from '@/components/organisms/InsightsGrid';
import { ChoroplethMap, HorizontalBarChart, ScatterPlot, SkeletonChart } from '@/components/visualizations';
import type { BarChartDataItem } from '@/components/visualizations/HorizontalBarChart';

export default function Home() {
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
  const [demographicData, setDemographicData] = useState<BarChartDataItem[]>([]);
  const [selectedNeighborhoodId, setSelectedNeighborhoodId] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/data/neighborhoods.json').then(res => res.json()),
      fetch('/data/demographic-data.json').then(res => res.json())
    ])
      .then(([neighborhoodsData, demoData]) => {
        setNeighborhoods(neighborhoodsData);

        // Filter race/ethnicity data for bar chart
        const raceEthnicityData = demoData
          .filter((item: any) => item.groupType === 'race_ethnicity')
          .map((item: any) => ({
            category: item.demographicGroup,
            value: item.lifeExpectancy
          }));

        setDemographicData(raceEthnicityData);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <>
        <Navigation />
        <main>
          <div className="container section">
            <h1>Health Equity Explorer</h1>
            <p>Loading data...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const avgLE = neighborhoods.reduce((sum, n) => sum + n.healthMetrics.lifeExpectancy, 0) / neighborhoods.length;
  const avgHOI = neighborhoods.reduce((sum, n) => sum + n.sdohScores.hoiScore, 0) / neighborhoods.length;

  const selectedNeighborhood = neighborhoods.find(n => n.id === selectedNeighborhoodId) || null;

  const handleExploreClick = () => {
    document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInsightClick = (id: string) => {
    const sectionMap: Record<string, string> = {
      'health-gaps': 'disparities',
      'neighborhood-conditions': 'relationships',
      'explore-community': 'explore'
    };
    const targetId = sectionMap[id];
    if (targetId) {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNeighborhoodSelect = (neighborhoodId: string) => {
    setSelectedNeighborhoodId(neighborhoodId);
    // If selection made from map, scroll to explore section
    if (neighborhoodId) {
      setTimeout(() => {
        document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const handleMapClick = (neighborhood: Neighborhood) => {
    handleNeighborhoodSelect(neighborhood.id);
  };

  const insights: InsightCardData[] = [
    {
      id: 'health-gaps',
      icon: '📊',
      eyebrow: 'Data Story',
      title: 'Health Gaps Across Communities',
      description: 'Life expectancy varies by up to 12 years between neighborhoods in our region. Explore the data behind these disparities.',
      linkText: 'View Disparities',
      linkHref: '#disparities'
    },
    {
      id: 'neighborhood-conditions',
      icon: '🏘️',
      eyebrow: 'Connections',
      title: 'Neighborhood Conditions Matter',
      description: 'Housing quality, economic opportunity, and environmental factors directly influence health outcomes in measurable ways.',
      linkText: 'Explore Relationships',
      linkHref: '#relationships'
    },
    {
      id: 'explore-community',
      icon: '🔍',
      eyebrow: 'Interactive',
      title: 'Explore Your Community',
      description: 'Search for your neighborhood to see local health metrics and social determinants compared to regional averages.',
      linkText: 'Get Started',
      linkHref: '#explore'
    }
  ];

  return (
    <>
      <Navigation />

      <main>
        <HeroSection
          eyebrow="Interactive Data Story"
          headline="Where You Live Affects How Long You Live"
          subheadline="Explore the connection between neighborhood conditions and health outcomes across our community."
          ctaText="Explore the Data"
          ctaHref="#explore"
          onCtaClick={handleExploreClick}
        />

        {/* Phase 3: Context Section */}
        <SectionBand variant="light" id="context">
          <SectionHeader
            eyebrow="Understanding Health Equity"
            headline="Making the Connection"
            description="Health outcomes don't just happen—they're shaped by the conditions in which we live, work, and play."
          />
          <ContextSection
            image={<PlaceholderImage label="Community Health Illustration" />}
            imagePosition="right"
          >
            <h3>Where You Live Matters</h3>
            <p>
              Research shows that social and economic factors—collectively known as social determinants of health (SDOH)—account for up to 80% of health outcomes. These factors include access to quality housing, educational opportunities, employment, safe environments, and healthcare services.
            </p>
            <p>
              The Health Opportunity Index (HOI) measures these neighborhood conditions on a 0-100 scale. Higher scores indicate better access to resources and opportunities that support health. In our region, HOI scores range from {Math.min(...neighborhoods.map(n => n.sdohScores.hoiScore))} to {Math.max(...neighborhoods.map(n => n.sdohScores.hoiScore))}, reflecting significant variation in opportunity across communities.
            </p>
            <div style={{
              background: 'var(--primary-900)',
              color: 'white',
              padding: 'var(--space-6)',
              borderRadius: 'var(--radius-lg)',
              marginTop: 'var(--space-4)'
            }}>
              <h4 style={{ color: 'white', fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-3)' }}>
                Key Insight
              </h4>
              <p style={{ margin: 0, fontSize: 'var(--font-size-base)' }}>
                Life expectancy correlates strongly with neighborhood opportunity. Our data shows communities with higher HOI scores consistently experience longer, healthier lives—a difference of up to 12 years between the highest and lowest opportunity neighborhoods.
              </p>
            </div>
          </ContextSection>
        </SectionBand>

        {/* Phase 3: Featured Insights Grid */}
        <SectionBand variant="neutral">
          <SectionHeader
            eyebrow="Explore the Data"
            headline="Three Ways to Understand Health Equity"
            align="center"
          />
          <InsightsGrid insights={insights} onCardClick={handleInsightClick} />
        </SectionBand>

        {/* Development Progress Section */}
        <SectionBand variant="tinted">
          <div style={{
            background: 'var(--success-green)',
            color: 'white',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--space-8)'
          }}>
            <h2 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--space-4)', color: 'white' }}>
              Phase 6: Polish & Accessibility ✓
            </h2>
            <p style={{ marginBottom: 'var(--space-4)' }}>
              Comprehensive polish and accessibility enhancements including scroll-triggered animations with Framer Motion, skeleton loading states, ARIA labels and live regions, focus management, keyboard navigation, lazy loading, and performance optimizations. All animations respect prefers-reduced-motion for accessibility.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: 'var(--space-4)' }}>
              <li style={{ marginBottom: 'var(--space-2)' }}>✓ FadeIn animations with Intersection Observer and configurable delays</li>
              <li style={{ marginBottom: 'var(--space-2)' }}>✓ Staggered grid animations (100ms delay per item)</li>
              <li style={{ marginBottom: 'var(--space-2)' }}>✓ Skeleton screens for all visualizations with shimmer effect</li>
              <li style={{ marginBottom: 'var(--space-2)' }}>✓ ARIA labels, live regions, and focus-visible styling</li>
              <li style={{ marginBottom: 'var(--space-2)' }}>✓ Lazy loading with 200px trigger distance</li>
              <li style={{ marginBottom: 'var(--space-2)' }}>✓ Image optimization (WebP/AVIF), code splitting, font subsetting</li>
            </ul>
            <Link href="/polish-demo" style={{ textDecoration: 'none' }}>
              <Button variant="secondary" style={{ background: 'white', color: 'var(--primary-500)', borderColor: 'white' }}>
                View Polish & Accessibility Demo →
              </Button>
            </Link>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%)',
            color: 'white',
            padding: 'var(--space-8)',
            borderRadius: 'var(--radius-lg)',
            marginBottom: 'var(--space-8)',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <h2 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--space-4)', color: 'white' }}>
              🎉 Complete Integrated Story
            </h2>
            <p style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-6)', lineHeight: 'var(--line-height-relaxed)' }}>
              Experience the full production-ready data story with all phase components seamlessly integrated: Hero → Context → Featured Insights → Geographic Map → Disparities Chart → Relationships Scatter → Interactive Explore → Footer. All features working together as one cohesive user experience.
            </p>
            <Link href="/complete-story" style={{ textDecoration: 'none' }}>
              <Button variant="secondary" style={{
                background: 'white',
                color: 'var(--primary-600)',
                borderColor: 'white',
                fontSize: 'var(--font-size-lg)',
                padding: 'var(--space-4) var(--space-6)'
              }}>
                View Complete Story →
              </Button>
            </Link>
          </div>

          <div style={{
            background: 'white',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-base)',
            marginBottom: 'var(--space-6)'
          }}>
            <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-4)' }}>
              Phase 5: Interactive Features ✓
            </h2>
            <p style={{ marginBottom: 'var(--space-4)' }}>
              Fully interactive neighborhood exploration with autocomplete search (type-ahead filtering, keyboard navigation), dynamic metric cards showing life expectancy and HOI scores with comparison bars, and map-to-explore integration with click selection and smooth scrolling.
            </p>
            <Link href="/interactive-demo" style={{ textDecoration: 'none' }}>
              <Button variant="primary">
                View Interactive Features Demo →
              </Button>
            </Link>
          </div>

          <div style={{
            background: 'white',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-base)',
            marginBottom: 'var(--space-6)'
          }}>
            <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-4)' }}>
              Phase 4: Data Visualizations ✓
            </h2>
            <p style={{ marginBottom: 'var(--space-4)' }}>
              Interactive data visualizations including choropleth map showing life expectancy by neighborhood, horizontal bar chart displaying health disparities by race/ethnicity with gap annotations, and scatter plot revealing the correlation between HOI scores and life expectancy with trendline and quadrant labels.
            </p>
            <Link href="/viz-demo" style={{ textDecoration: 'none' }}>
              <Button variant="primary">
                View Visualizations Demo →
              </Button>
            </Link>
          </div>

          <div style={{
            background: 'white',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-base)',
            marginBottom: 'var(--space-6)'
          }}>
            <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-4)' }}>
              Phase 3: Static Content Sections ✓
            </h2>
            <p style={{ marginBottom: 'var(--space-4)' }}>
              Context band with two-column layout, featured insights grid with three cards, section headers with eyebrow/headline/description structure, and callout card for key messages.
            </p>
            <Link href="/content-demo" style={{ textDecoration: 'none' }}>
              <Button variant="primary">
                View Content Demo →
              </Button>
            </Link>
          </div>

          <div style={{
            background: 'white',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-base)',
            marginBottom: 'var(--space-6)'
          }}>
            <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-4)' }}>
              Phase 2: Layout & Navigation ✓
            </h2>
            <p style={{ marginBottom: 'var(--space-4)' }}>
              Navigation bar, footer, hero section, and section band template implemented with sticky header, smooth scrolling, and design system consistency.
            </p>
            <Link href="/layout-demo" style={{ textDecoration: 'none' }}>
              <Button variant="primary">
                View Layout Demo →
              </Button>
            </Link>
          </div>

          <div style={{
            background: 'var(--primary-50)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--space-6)'
          }}>
            <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-4)' }}>
              Phase 0: Foundation Setup ✓
            </h2>
            <p style={{ marginBottom: 'var(--space-2)' }}>
              <strong>Status:</strong> Complete
            </p>
            <p style={{ marginBottom: 'var(--space-2)' }}>
              <strong>Neighborhoods loaded:</strong> {neighborhoods.length}
            </p>
            <p style={{ marginBottom: 'var(--space-2)' }}>
              <strong>Average Life Expectancy:</strong> {avgLE.toFixed(1)} years
            </p>
            <p style={{ marginBottom: 'var(--space-2)' }}>
              <strong>Average HOI Score:</strong> {avgHOI.toFixed(1)}
            </p>
            <p style={{ marginBottom: '0' }}>
              <strong>Design tokens:</strong> Loaded via CSS custom properties
            </p>
          </div>

          <div style={{
            background: 'white',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-base)',
            marginBottom: 'var(--space-6)'
          }}>
            <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-4)' }}>
              Phase 1: Core Components Library ✓
            </h2>
            <p style={{ marginBottom: 'var(--space-4)' }}>
              All atoms and molecules implemented with design system tokens, accessibility features, and interactive states.
            </p>
            <Link href="/components-demo" style={{ textDecoration: 'none' }}>
              <Button variant="primary">
                View Component Library Demo →
              </Button>
            </Link>
          </div>
        </SectionBand>

        <SectionBand variant="neutral" id="disparities">
          <FadeIn>
            <SectionHeader
              eyebrow="Health Disparities"
              headline="Life Expectancy Varies by Race and Ethnicity"
              description="Differences in life expectancy reflect systemic inequities in access to resources, healthcare, and opportunity across racial and ethnic groups."
            />
          </FadeIn>
          <FadeIn delay={0.2}>
            {demographicData.length > 0 ? (
              <HorizontalBarChart
                data={demographicData}
                averageValue={avgLE}
                xAxisLabel="Life Expectancy (years)"
              />
            ) : (
              <SkeletonChart width={900} height={400} variant="bar" />
            )}
          </FadeIn>
        </SectionBand>

        <SectionBand variant="light" id="relationships">
          <FadeIn>
            <SectionHeader
              eyebrow="The Connection"
              headline="Neighborhood Opportunity Shapes Health Outcomes"
              description="Each dot represents a neighborhood. The pattern is clear: communities with better access to resources and opportunities consistently experience longer life expectancy."
            />
          </FadeIn>
          <FadeIn delay={0.2}>
            {neighborhoods.length > 0 ? (
              <ScatterPlot
                neighborhoods={neighborhoods}
                width={900}
                height={600}
              />
            ) : (
              <SkeletonChart width={900} height={600} variant="scatter" />
            )}
          </FadeIn>
        </SectionBand>

        <SectionBand variant="neutral" id="map">
          <FadeIn>
            <SectionHeader
              eyebrow="Geographic Overview"
              headline="Life Expectancy Across Our Region"
              description="Click on a neighborhood to explore detailed metrics below."
              align="center"
            />
          </FadeIn>
          <FadeIn delay={0.2}>
            {neighborhoods.length > 0 ? (
              <ChoroplethMap
                neighborhoods={neighborhoods}
                metric="lifeExpectancy"
                width={900}
                height={600}
                onNeighborhoodClick={handleMapClick}
                selectedId={selectedNeighborhoodId}
              />
            ) : (
              <SkeletonChart width={900} height={600} variant="map" />
            )}
          </FadeIn>
        </SectionBand>

        <SectionBand variant="light" id="explore">
          <FadeIn>
            <SectionHeader
              eyebrow="Explore Your Community"
              headline="Neighborhood Health Metrics"
              description="Search for a neighborhood to see detailed health outcomes and social determinants compared to city averages."
            />
          </FadeIn>
          <FadeIn delay={0.2}>
            <ExploreSection
              neighborhoods={neighborhoods}
              selectedNeighborhood={selectedNeighborhood}
              onNeighborhoodSelect={handleNeighborhoodSelect}
              cityAverages={{
                lifeExpectancy: avgLE,
                hoiScore: avgHOI
              }}
            />
          </FadeIn>
        </SectionBand>
      </main>

      <Footer />
    </>
  );
}
