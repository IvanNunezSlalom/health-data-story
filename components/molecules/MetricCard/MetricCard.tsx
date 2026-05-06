import React from 'react';
import styles from './MetricCard.module.css';

export interface MetricCardProps {
  label: string;
  value: string | number;
  context?: string;
  trend?: 'positive' | 'negative' | 'neutral';
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  context,
  trend,
  className,
}) => {
  const classNames = [styles.metricCard, className].filter(Boolean).join(' ');

  const trendClass = trend ? styles[`trend-${trend}`] : '';

  return (
    <div className={classNames}>
      <span className={styles.label}>{label}</span>
      <div className={`${styles.value} ${trendClass}`}>{value}</div>
      {context && <span className={styles.context}>{context}</span>}
    </div>
  );
};
