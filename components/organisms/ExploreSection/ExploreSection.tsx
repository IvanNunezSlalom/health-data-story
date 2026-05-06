'use client';

import { MetricCard, SearchInput } from '@/components/molecules';
import type { SearchOption } from '@/components/molecules/SearchInput';
import type { Neighborhood } from '@/types';
import styles from './ExploreSection.module.css';

export interface ExploreSectionProps {
  neighborhoods: Neighborhood[];
  selectedNeighborhood: Neighborhood | null;
  onNeighborhoodSelect: (neighborhoodId: string) => void;
  cityAverages: {
    lifeExpectancy: number;
    hoiScore: number;
  };
}

export function ExploreSection({
  neighborhoods,
  selectedNeighborhood,
  onNeighborhoodSelect,
  cityAverages
}: ExploreSectionProps) {
  const searchOptions: SearchOption[] = neighborhoods.map(n => ({
    id: n.id,
    label: n.name
  }));

  const handleSearchSelect = (option: SearchOption) => {
    onNeighborhoodSelect(option.id);
  };

  const getComparisonColor = (value: number, average: number): string => {
    return value >= average ? 'var(--success-green)' : 'var(--accent-orange)';
  };

  const getComparisonText = (value: number, average: number, unit: string): string => {
    const diff = value - average;
    const prefix = diff >= 0 ? '+' : '';
    return `${prefix}${diff.toFixed(1)} ${unit} vs city avg`;
  };

  const getComparisonPercentage = (value: number, min: number, max: number): number => {
    return ((value - min) / (max - min)) * 100;
  };

  // Calculate ranges for visualization
  const lifeExpectancyRange = {
    min: Math.min(...neighborhoods.map(n => n.healthMetrics.lifeExpectancy)),
    max: Math.max(...neighborhoods.map(n => n.healthMetrics.lifeExpectancy))
  };

  const hoiRange = {
    min: Math.min(...neighborhoods.map(n => n.sdohScores.hoiScore)),
    max: Math.max(...neighborhoods.map(n => n.sdohScores.hoiScore))
  };

  return (
    <div className={styles.container}>
      {/* Screen reader announcement for selection changes */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={styles.srOnly}
      >
        {selectedNeighborhood
          ? `Selected ${selectedNeighborhood.name}. Life expectancy: ${selectedNeighborhood.healthMetrics.lifeExpectancy} years. Health Opportunity Index: ${selectedNeighborhood.sdohScores.hoiScore}.`
          : 'Showing city-wide averages. Search for a neighborhood to see specific metrics.'}
      </div>

      <div className={styles.searchWrapper}>
        <SearchInput
          options={searchOptions}
          onSelect={handleSearchSelect}
          placeholder="Search neighborhoods..."
        />
      </div>

      {!selectedNeighborhood && (
        <div className={styles.prompt}>
          <p className={styles.promptText}>
            Select a neighborhood above to explore health metrics and social determinants.
          </p>
          <div className={styles.promptSubtext}>
            Currently showing city/region averages
          </div>
        </div>
      )}

      {selectedNeighborhood && (
        <div className={styles.selectedInfo}>
          <h3 className={styles.neighborhoodName}>{selectedNeighborhood.name}</h3>
          <button
            className={styles.clearButton}
            onClick={() => onNeighborhoodSelect('')}
            aria-label="Clear selection"
          >
            Clear selection
          </button>
        </div>
      )}

      <div className={styles.metricsGrid}>
        {/* Life Expectancy Card */}
        <MetricCard
          label="Life Expectancy"
          value={selectedNeighborhood
            ? `${selectedNeighborhood.healthMetrics.lifeExpectancy} years`
            : `${cityAverages.lifeExpectancy.toFixed(1)} years`
          }
          context={selectedNeighborhood
            ? getComparisonText(
                selectedNeighborhood.healthMetrics.lifeExpectancy,
                cityAverages.lifeExpectancy,
                'years'
              )
            : 'City average'
          }
          trend={selectedNeighborhood
            ? selectedNeighborhood.healthMetrics.lifeExpectancy >= cityAverages.lifeExpectancy ? 'up' : 'down'
            : undefined
          }
        >
          {selectedNeighborhood && (
            <div className={styles.comparisonBar}>
              <div className={styles.barTrack}>
                <div
                  className={styles.barFill}
                  style={{
                    width: `${getComparisonPercentage(
                      selectedNeighborhood.healthMetrics.lifeExpectancy,
                      lifeExpectancyRange.min,
                      lifeExpectancyRange.max
                    )}%`,
                    backgroundColor: getComparisonColor(
                      selectedNeighborhood.healthMetrics.lifeExpectancy,
                      cityAverages.lifeExpectancy
                    )
                  }}
                />
                <div
                  className={styles.avgMarker}
                  style={{
                    left: `${getComparisonPercentage(
                      cityAverages.lifeExpectancy,
                      lifeExpectancyRange.min,
                      lifeExpectancyRange.max
                    )}%`
                  }}
                  title={`City avg: ${cityAverages.lifeExpectancy.toFixed(1)} years`}
                />
              </div>
            </div>
          )}
        </MetricCard>

        {/* HOI Score Card */}
        <MetricCard
          label="Health Opportunity Index"
          value={selectedNeighborhood
            ? `${selectedNeighborhood.sdohScores.hoiScore}/100`
            : `${cityAverages.hoiScore.toFixed(1)}/100`
          }
          context={selectedNeighborhood
            ? `${selectedNeighborhood.sdohScores.hoiCategory} opportunity`
            : 'City average'
          }
          trend={selectedNeighborhood
            ? selectedNeighborhood.sdohScores.hoiScore >= cityAverages.hoiScore ? 'up' : 'down'
            : undefined
          }
        >
          {selectedNeighborhood && (
            <div className={styles.comparisonBar}>
              <div className={styles.barTrack}>
                <div
                  className={styles.barFill}
                  style={{
                    width: `${getComparisonPercentage(
                      selectedNeighborhood.sdohScores.hoiScore,
                      hoiRange.min,
                      hoiRange.max
                    )}%`,
                    backgroundColor: getComparisonColor(
                      selectedNeighborhood.sdohScores.hoiScore,
                      cityAverages.hoiScore
                    )
                  }}
                />
                <div
                  className={styles.avgMarker}
                  style={{
                    left: `${getComparisonPercentage(
                      cityAverages.hoiScore,
                      hoiRange.min,
                      hoiRange.max
                    )}%`
                  }}
                  title={`City avg: ${cityAverages.hoiScore.toFixed(1)}`}
                />
              </div>
            </div>
          )}
        </MetricCard>

        {/* Top SDOH Factors */}
        {selectedNeighborhood && (
          <>
            <MetricCard
              label="Economic Resources"
              value={`${selectedNeighborhood.sdohScores.economicResources}/100`}
              context="Access to jobs, income stability"
            />
            <MetricCard
              label="Housing Quality"
              value={`${selectedNeighborhood.sdohScores.housingQuality}/100`}
              context="Affordability, safety, maintenance"
            />
            <MetricCard
              label="Education Access"
              value={`${selectedNeighborhood.sdohScores.educationAccess}/100`}
              context="Schools, literacy programs"
            />
            <MetricCard
              label="Population"
              value={selectedNeighborhood.population.toLocaleString()}
              context="Neighborhood residents"
            />
          </>
        )}

        {/* City Averages for default state */}
        {!selectedNeighborhood && (
          <>
            <MetricCard
              label="Economic Resources"
              value={`${Math.round(
                neighborhoods.reduce((sum, n) => sum + n.sdohScores.economicResources, 0) /
                  neighborhoods.length
              )}/100`}
              context="City average"
            />
            <MetricCard
              label="Housing Quality"
              value={`${Math.round(
                neighborhoods.reduce((sum, n) => sum + n.sdohScores.housingQuality, 0) /
                  neighborhoods.length
              )}/100`}
              context="City average"
            />
            <MetricCard
              label="Education Access"
              value={`${Math.round(
                neighborhoods.reduce((sum, n) => sum + n.sdohScores.educationAccess, 0) /
                  neighborhoods.length
              )}/100`}
              context="City average"
            />
            <MetricCard
              label="Total Population"
              value={neighborhoods.reduce((sum, n) => sum + n.population, 0).toLocaleString()}
              context="Across all neighborhoods"
            />
          </>
        )}
      </div>
    </div>
  );
}
