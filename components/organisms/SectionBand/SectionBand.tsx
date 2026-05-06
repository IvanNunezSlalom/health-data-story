import { ReactNode } from 'react';
import styles from './SectionBand.module.css';

export interface SectionBandProps {
  children: ReactNode;
  variant?: 'light' | 'tinted' | 'dark' | 'neutral';
  width?: 'standard' | 'wide' | 'full';
  className?: string;
  id?: string;
}

export function SectionBand({
  children,
  variant = 'light',
  width = 'standard',
  className = '',
  id
}: SectionBandProps) {
  const variantClass = styles[variant];
  const widthClass = styles[`width-${width}`];

  return (
    <section
      className={`${styles.section} ${variantClass} ${className}`}
      id={id}
    >
      <div className={`${styles.container} ${widthClass}`}>
        {children}
      </div>
    </section>
  );
}
