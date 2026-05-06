'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { Neighborhood } from '@/types';
import { FadeIn, LazyLoad } from '@/components/atoms';
import { SectionHeader, Card } from '@/components/molecules';
import {
  Navigation,
  Footer,
  HeroSection,
  SectionBand,
  InsightsGrid,
  ExploreSection
} from '@/components/organisms';
import type { InsightCardData } from '@/components/organisms/InsightsGrid';
import { ChoroplethMap, HorizontalBarChart, ScatterPlot, SkeletonChart } from '@/components/visualizations';
import type { BarChartDataItem } from '@/components/visualizations/HorizontalBarChart';
import styles from './page.module.css';

export default function Home() {
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
  const [demographicData, setDemographicData] = useState<BarChartDataItem[]>([]);
  const [selectedNeighborhoodId, setSelectedNeighborhoodId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [neighborhoodsRes, demographicRes] = await Promise.all([
          fetch('/data/neighborhoods.json'),
          fetch('/data/demographic-data.json')
        ]);

        const neighborhoodsData = await neighborhoodsRes.json();
        const demoData = await demographicRes.json();

        setNeighborhoods(neighborhoodsData);

        // Filter race/ethnicity data for bar chart
        const raceEthnicityData = demoData
          .filter((item: any) => item.groupType === 'race_ethnicity')
          .map((item: any) => ({
            category: item.demographicGroup,
            value: item.lifeExpectancy
          }));

        setDemographicData(raceEthnicityData);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load data:', error);
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  const handleNeighborhoodSelect = (neighborhoodId: string) => {
    setSelectedNeighborhoodId(neighborhoodId);
    if (neighborhoodId) {
      setTimeout(() => {
        document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const handleMapClick = (neighborhood: Neighborhood) => {
    handleNeighborhoodSelect(neighborhood.id);
  };

  const handleExploreClick = () => {
    document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleInsightClick = (id: string) => {
    const sectionMap: Record<string, string> = {
      'health-gaps': 'disparities',
      'neighborhood-conditions': 'geographic',
      'explore-community': 'explore'
    };
    const targetId = sectionMap[id];
    if (targetId) {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const avgLE = neighborhoods.length > 0
    ? neighborhoods.reduce((sum, n) => sum + n.healthMetrics.lifeExpectancy, 0) / neighborhoods.length
    : 78.5;

  const avgHOI = neighborhoods.length > 0
    ? neighborhoods.reduce((sum, n) => sum + n.sdohScores.hoiScore, 0) / neighborhoods.length
    : 50;

  const cityAverages = {
    lifeExpectancy: avgLE,
    hoiScore: avgHOI
  };

  const selectedNeighborhood = neighborhoods.find(n => n.id === selectedNeighborhoodId) || null;

  const insights: InsightCardData[] = [
    {
      id: 'health-gaps',
      icon: '',
      eyebrow: 'Data Story',
      title: 'Health Gaps',
      description: 'Life expectancy varies by up to 10 years across racial and ethnic groups, revealing persistent disparities.',
      linkText: 'View Disparities',
      linkHref: '#disparities'
    },
    {
      id: 'neighborhood-conditions',
      icon: '',
      eyebrow: 'Geographic Patterns',
      title: 'Neighborhood Conditions',
      description: 'The Health Opportunity Index shows how access to resources and opportunities differs across neighborhoods.',
      linkText: 'See Patterns',
      linkHref: '#geographic'
    },
    {
      id: 'explore-community',
      icon: '',
      eyebrow: 'Interactive',
      title: 'Explore Your Community',
      description: 'Look up your neighborhood to see how local conditions compare to city averages and shape health outcomes.',
      linkText: 'Search Neighborhoods',
      linkHref: '#explore'
    }
  ];

  return (
    <div className={styles.page}>
      <Navigation />

      {/* Hero Section */}
      <HeroSection
        headline="Understanding Health Equity in Your Community"
        subheadline="Explore how neighborhood conditions shape health outcomes across our city. Discover the connection between where you live and your opportunity for a healthy life."
        ctaText="Explore Neighborhoods"
        onCtaClick={handleExploreClick}
      />

      {/* Context Band */}
      <SectionBand variant="light">
        <FadeIn>
          <div className={styles.contextGrid}>
            <div className={styles.contextText}>
              <h2 className={styles.contextHeadline}>Making the Connection</h2>
              <p className={styles.contextParagraph}>
                <strong>Health equity</strong> means that everyone has a fair and just opportunity to be as healthy as possible. This requires removing obstacles to health such as poverty, discrimination, and their consequences, including powerlessness and lack of access to good jobs with fair pay, quality education and housing, safe environments, and health care.
              </p>
              <p className={styles.contextParagraph}>
                Your neighborhood shapes your health in profound ways. Access to healthy food, safe parks, quality schools, stable housing, and economic opportunities all vary by where you live. These <strong>social determinants of health</strong> create different levels of opportunity across our communities.
              </p>
              <p className={styles.contextParagraph}>
                The data on this page reveals how neighborhood conditions drive health disparities across our city. By understanding these patterns, we can work together to create healthier, more equitable communities for everyone.
              </p>
            </div>
            <div className={styles.contextImage}>
              <Image
                src="/images/community-gathering.jpg"
                alt="Diverse community members sharing a meal together, representing community health and connection"
                width={1200}
                height={800}
                style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-lg)' }}
                priority
              />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div style={{ marginTop: 'var(--space-8)' }}>
            <Card>
              <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--primary-50)', border: '2px solid var(--primary-200)', borderRadius: 'var(--radius-lg)' }}>
                <h3 style={{
                  fontSize: 'var(--font-size-xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--primary-700)',
                  marginBottom: 'var(--space-3)'
                }}>
                  Where You Live Shapes Your Health
                </h3>
                <p style={{
                  fontSize: 'var(--font-size-md)',
                  lineHeight: 'var(--line-height-relaxed)',
                  color: 'var(--neutral-700)',
                  margin: 0
                }}>
                  Explore how neighborhood conditions create different health opportunities across our city. The interactive tools below help you discover these patterns in your own community.
                </p>
              </div>
            </Card>
          </div>
        </FadeIn>
      </SectionBand>

      {/* Featured Insights Band */}
      <SectionBand variant="tinted">
        <FadeIn>
          <SectionHeader
            eyebrow="Three Key Stories"
            headline="What the Data Reveals"
            description="Navigate to the sections below to explore different aspects of health equity in our community."
          />
        </FadeIn>

        <FadeIn delay={0.2}>
          <InsightsGrid insights={insights} onCardClick={handleInsightClick} />
        </FadeIn>
      </SectionBand>

      {/* Geographic Overview Band */}
      <SectionBand variant="light">
        <FadeIn>
          <SectionHeader
            eyebrow="Geographic Patterns"
            headline="Health Outcomes Vary Dramatically Across Neighborhoods"
            description="This map shows life expectancy by neighborhood. Hover over any area to see details, or click to explore that neighborhood's metrics below."
          />
        </FadeIn>

        <FadeIn delay={0.2}>
          <div id="geographic" style={{ scrollMarginTop: '80px' }}>
            {!isLoading && neighborhoods.length > 0 ? (
              <ChoroplethMap
                neighborhoods={neighborhoods}
                metric="lifeExpectancy"
                onNeighborhoodClick={handleMapClick}
                selectedId={selectedNeighborhoodId}
                width={900}
                height={600}
              />
            ) : (
              <SkeletonChart width={900} height={600} variant="map" />
            )}
          </div>
        </FadeIn>
      </SectionBand>

      {/* Disparities Deep Dive Band */}
      <SectionBand variant="tinted">
        <FadeIn>
          <SectionHeader
            eyebrow="Health Disparities"
            headline="Health Gaps Persist Across Race and Ethnicity"
            description="Life expectancy varies significantly by demographic group, reflecting systemic inequities in access to resources and opportunities. These gaps represent years of life lost due to social and structural barriers."
          />
        </FadeIn>

        <FadeIn delay={0.2}>
          <div id="disparities" style={{ scrollMarginTop: '80px' }}>
            {!isLoading && demographicData.length > 0 ? (
              <HorizontalBarChart
                data={demographicData}
                averageValue={avgLE}
                xAxisLabel="Life Expectancy (years)"
              />
            ) : (
              <SkeletonChart width={900} height={400} variant="bar" />
            )}
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div style={{ marginTop: 'var(--space-8)' }}>
            <Card>
              <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--accent-50)', border: '2px solid var(--accent-orange)', borderRadius: 'var(--radius-lg)' }}>
                <h3 style={{
                  fontSize: 'var(--font-size-xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--accent-orange)',
                  marginBottom: 'var(--space-3)'
                }}>
                  The Gap: Up to 6.8 Years
                </h3>
                <p style={{
                  fontSize: 'var(--font-size-md)',
                  lineHeight: 'var(--line-height-relaxed)',
                  color: 'var(--neutral-700)',
                  margin: 0
                }}>
                  The difference between the highest and lowest life expectancy groups represents nearly 7 years of life—time that should be available to everyone, regardless of background.
                </p>
              </div>
            </Card>
          </div>
        </FadeIn>
      </SectionBand>

      {/* Relationships & Drivers Band */}
      <SectionBand variant="light">
        <FadeIn>
          <SectionHeader
            eyebrow="What Drives Health Outcomes"
            headline="Neighborhood Conditions Shape Health"
            description="The Health Opportunity Index (HOI) measures access to resources like quality housing, education, employment, and healthy environments. This chart shows the strong relationship between neighborhood opportunity and life expectancy."
          />
        </FadeIn>

        <LazyLoad rootMargin="200px">
          <FadeIn delay={0.2}>
            <div id="relationships" style={{ scrollMarginTop: '80px' }}>
              {!isLoading && neighborhoods.length > 0 ? (
                <ScatterPlot
                  neighborhoods={neighborhoods}
                  width={900}
                  height={600}
                />
              ) : (
                <SkeletonChart width={900} height={600} variant="scatter" />
              )}
            </div>
          </FadeIn>
        </LazyLoad>

        <FadeIn delay={0.3}>
          <div className={styles.interpretationText}>
            <p>
              <strong>Each dot represents a neighborhood.</strong> The upward trend shows that neighborhoods with higher opportunity scores tend to have higher life expectancy. This demonstrates how improving neighborhood conditions—through better housing, education, employment, and environmental quality—can directly improve health outcomes.
            </p>
          </div>
        </FadeIn>
      </SectionBand>

      {/* Explore Your Community Band */}
      <SectionBand variant="tinted">
        <FadeIn>
          <SectionHeader
            eyebrow="Interactive Explorer"
            headline="Look Up Your Neighborhood"
            description="Search for your neighborhood to see how local conditions and health outcomes compare to city averages. Click on the map above or use the search below."
          />
        </FadeIn>

        <FadeIn delay={0.2}>
          <div id="explore" style={{ scrollMarginTop: '80px' }}>
            {!isLoading && neighborhoods.length > 0 ? (
              <ExploreSection
                neighborhoods={neighborhoods}
                selectedNeighborhood={selectedNeighborhood}
                onNeighborhoodSelect={handleNeighborhoodSelect}
                cityAverages={cityAverages}
              />
            ) : (
              <div className={styles.exploreSkeleton}>
                <SkeletonChart width={900} height={400} variant="bar" />
              </div>
            )}
          </div>
        </FadeIn>
      </SectionBand>

      <Footer />
    </div>
  );
}
