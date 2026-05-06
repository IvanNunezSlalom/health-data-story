'use client';

import { useEffect, useState } from 'react';
import { Navigation, Footer } from '@/components/organisms';
import { SectionHeader, ChartContainer } from '@/components/molecules';
import { Badge } from '@/components/atoms';
import { ChoroplethMap, HorizontalBarChart, ScatterPlot } from '@/components/visualizations';
import type { Neighborhood } from '@/types';
import type { BarChartDataItem } from '@/components/visualizations/HorizontalBarChart';
import styles from '../content-demo/page.module.css';

export default function VizDemo() {
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
  const [demographicData, setDemographicData] = useState<BarChartDataItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/data/neighborhoods.json').then(res => res.json()),
      fetch('/data/demographic-data.json').then(res => res.json())
    ])
      .then(([neighborhoodsData, demoData]) => {
        setNeighborhoods(neighborhoodsData);

        const raceEthnicityData = demoData
          .filter((item: any) => item.groupType === 'race_ethnicity')
          .map((item: any) => ({
            category: item.demographicGroup,
            value: item.lifeExpectancy
          }));

        setDemographicData(raceEthnicityData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <>
        <Navigation />
        <main>
          <div style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
            <h1>Loading visualizations...</h1>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const avgLE = neighborhoods.reduce((sum, n) => sum + n.healthMetrics.lifeExpectancy, 0) / neighborhoods.length;

  return (
    <>
      <Navigation />

      <main>
        <div style={{ padding: 'var(--space-8)', background: 'var(--neutral-100)' }}>
          <div className={styles.demoHeader}>
            <Badge variant="success">Phase 4: Data Visualizations</Badge>
            <h1>Interactive Data Visualizations Demo</h1>
            <p>
              Demonstrating choropleth map, horizontal bar chart, and scatter plot components.
            </p>
          </div>
        </div>

        <div style={{ padding: 'var(--space-12) var(--space-8)', maxWidth: '1200px', margin: '0 auto' }}>
          <section style={{ marginBottom: 'var(--space-16)' }}>
            <ChartContainer
              eyebrow="Visualization 1"
              title="Choropleth Map: Life Expectancy by Neighborhood"
              description="Interactive grid map showing life expectancy across neighborhoods. Hover for details, click to select."
            >
              <ChoroplethMap
                neighborhoods={neighborhoods}
                metric="lifeExpectancy"
                width={900}
                height={600}
              />
            </ChartContainer>
          </section>

          <section style={{ marginBottom: 'var(--space-16)' }}>
            <ChartContainer
              eyebrow="Visualization 2"
              title="Bar Chart: Life Expectancy by Race/Ethnicity"
              description="Horizontal bar chart showing disparities with gap annotations compared to state average."
            >
              <HorizontalBarChart
                data={demographicData}
                averageValue={avgLE}
                xAxisLabel="Life Expectancy (years)"
              />
            </ChartContainer>
          </section>

          <section style={{ marginBottom: 'var(--space-16)' }}>
            <ChartContainer
              eyebrow="Visualization 3"
              title="Scatter Plot: HOI Score vs Life Expectancy"
              description="Each dot represents a neighborhood. Trendline shows positive correlation between opportunity and health outcomes."
            >
              <ScatterPlot
                neighborhoods={neighborhoods}
                width={900}
                height={600}
              />
            </ChartContainer>
          </section>

          <div style={{
            background: 'var(--success-green)',
            color: 'white',
            padding: 'var(--space-8)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-12)'
          }}>
            <h2 style={{ color: 'white', marginBottom: 'var(--space-4)' }}>
              Phase 4 Complete ✓
            </h2>
            <p style={{ marginBottom: 'var(--space-4)' }}>
              All three data visualizations implemented:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: 'var(--space-2)' }}>✓ Choropleth map with 7-step color scale and hover tooltips</li>
              <li style={{ marginBottom: 'var(--space-2)' }}>✓ Horizontal bar chart with gap annotations and reference line</li>
              <li style={{ marginBottom: 'var(--space-2)' }}>✓ Scatter plot with trendline, quadrant labels, and outlier annotations</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
