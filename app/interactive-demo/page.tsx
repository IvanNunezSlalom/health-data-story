'use client';

import { useEffect, useState } from 'react';
import { Navigation, Footer, ExploreSection, SectionBand } from '@/components/organisms';
import { SectionHeader } from '@/components/molecules';
import { Badge } from '@/components/atoms';
import { ChoroplethMap } from '@/components/visualizations';
import type { Neighborhood } from '@/types';
import styles from '../content-demo/page.module.css';

export default function InteractiveDemo() {
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
  const [selectedNeighborhoodId, setSelectedNeighborhoodId] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/neighborhoods.json')
      .then(res => res.json())
      .then(data => {
        setNeighborhoods(data);
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
            <h1>Loading interactive features...</h1>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const avgLE = neighborhoods.reduce((sum, n) => sum + n.healthMetrics.lifeExpectancy, 0) / neighborhoods.length;
  const avgHOI = neighborhoods.reduce((sum, n) => sum + n.sdohScores.hoiScore, 0) / neighborhoods.length;
  const selectedNeighborhood = neighborhoods.find(n => n.id === selectedNeighborhoodId) || null;

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

  return (
    <>
      <Navigation />

      <main>
        <div style={{ padding: 'var(--space-8)', background: 'var(--neutral-100)' }}>
          <div className={styles.demoHeader}>
            <Badge variant="success">Phase 5: Interactive Features</Badge>
            <h1>Interactive Neighborhood Explorer Demo</h1>
            <p>
              Demonstrating autocomplete search, dynamic metric cards, and map-to-explore integration.
            </p>
          </div>
        </div>

        <div style={{ padding: 'var(--space-12) var(--space-8)', maxWidth: '1200px', margin: '0 auto' }}>
          <section style={{ marginBottom: 'var(--space-16)' }}>
            <SectionHeader
              eyebrow="Feature 5C"
              headline="Map-to-Explore Integration"
              description="Click on any neighborhood in the map below. The explore section will automatically populate with detailed metrics and scroll into view."
            />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-6)' }}>
              <ChoroplethMap
                neighborhoods={neighborhoods}
                metric="lifeExpectancy"
                width={900}
                height={600}
                onNeighborhoodClick={handleMapClick}
                selectedId={selectedNeighborhoodId}
              />
            </div>
          </section>

          <SectionBand variant="light" id="explore">
            <SectionHeader
              eyebrow="Features 5A & 5B"
              headline="Autocomplete Search & Dynamic Metric Cards"
              description="Type to search for neighborhoods. Selection updates metric cards with comparison visualizations showing how the neighborhood compares to city averages."
            />
            <ExploreSection
              neighborhoods={neighborhoods}
              selectedNeighborhood={selectedNeighborhood}
              onNeighborhoodSelect={handleNeighborhoodSelect}
              cityAverages={{
                lifeExpectancy: avgLE,
                hoiScore: avgHOI
              }}
            />
          </SectionBand>

          <div style={{
            background: 'var(--success-green)',
            color: 'white',
            padding: 'var(--space-8)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-12)'
          }}>
            <h2 style={{ color: 'white', marginBottom: 'var(--space-4)' }}>
              Phase 5 Complete ✓
            </h2>
            <p style={{ marginBottom: 'var(--space-4)' }}>
              All interactive features implemented:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: 'var(--space-2)' }}>
                <strong>✓ Autocomplete Search (5A):</strong> Type-ahead filtering with keyboard navigation (↑↓ arrows, Enter, Escape)
              </li>
              <li style={{ marginBottom: 'var(--space-2)' }}>
                <strong>✓ Dynamic Metric Cards (5B):</strong> Shows 6 metrics with comparison bars (green for above average, orange for below)
              </li>
              <li style={{ marginBottom: 'var(--space-2)' }}>
                <strong>✓ Map Integration (5C):</strong> Click on map highlights neighborhood and scrolls to explore section
              </li>
              <li style={{ marginBottom: 'var(--space-2)' }}>
                <strong>✓ Visual Feedback:</strong> Selected neighborhood highlighted on map with dark border
              </li>
              <li style={{ marginBottom: 'var(--space-2)' }}>
                <strong>✓ Default State:</strong> Shows city averages when no neighborhood selected
              </li>
              <li style={{ marginBottom: 'var(--space-2)' }}>
                <strong>✓ Accessibility:</strong> Full keyboard support, ARIA labels, and semantic HTML
              </li>
            </ul>
            <div style={{
              marginTop: 'var(--space-6)',
              padding: 'var(--space-4)',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 'var(--radius-md)'
            }}>
              <p style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>
                <strong>Try it:</strong> Type "Downtown" in the search box above, or click on a neighborhood in the map.
                Use arrow keys to navigate dropdown results. Press Escape to clear. Click "Clear selection" to reset.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
