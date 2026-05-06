import { Skeleton } from '@/components/atoms';
import styles from './SkeletonChart.module.css';

export interface SkeletonChartProps {
  width?: number;
  height?: number;
  variant?: 'map' | 'bar' | 'scatter';
  className?: string;
}

export function SkeletonChart({
  width = 800,
  height = 600,
  variant = 'map',
  className
}: SkeletonChartProps) {
  return (
    <div
      className={`${styles.container} ${className || ''}`}
      style={{ width, height }}
      role="status"
      aria-label="Loading chart..."
    >
      {variant === 'map' && (
        <div className={styles.mapGrid}>
          {Array.from({ length: 25 }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" width="100%" height="100%" />
          ))}
        </div>
      )}

      {variant === 'bar' && (
        <div className={styles.barChart}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={styles.barRow}>
              <Skeleton variant="text" width={120} height={20} />
              <Skeleton variant="rectangular" width={`${60 + Math.random() * 30}%`} height={30} />
            </div>
          ))}
        </div>
      )}

      {variant === 'scatter' && (
        <div className={styles.scatterPlot}>
          <div className={styles.scatterAxes}>
            <Skeleton variant="rectangular" width={2} height="100%" />
            <Skeleton variant="rectangular" width="100%" height={2} />
          </div>
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className={styles.scatterDot}
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`
              }}
            >
              <Skeleton variant="circular" width={8} height={8} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
