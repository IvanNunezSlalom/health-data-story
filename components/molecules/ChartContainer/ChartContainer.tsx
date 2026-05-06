import React from 'react';
import styles from './ChartContainer.module.css';

export interface ChartContainerProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  legend?: React.ReactNode;
  className?: string;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  eyebrow,
  title,
  description,
  children,
  legend,
  className,
}) => {
  return (
    <div className={`${styles.chartContainer} ${className || ''}`}>
      <div className={styles.chartHeader}>
        {eyebrow && <span className={styles.chartEyebrow}>{eyebrow}</span>}
        <h3 className={styles.chartTitle}>{title}</h3>
        {description && <p className={styles.chartDescription}>{description}</p>}
      </div>
      <div className={styles.chartBody}>{children}</div>
      {legend && <div className={styles.chartLegend}>{legend}</div>}
    </div>
  );
};
