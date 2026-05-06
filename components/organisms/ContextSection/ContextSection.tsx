import { ReactNode } from 'react';
import styles from './ContextSection.module.css';

export interface ContextSectionProps {
  children: ReactNode;
  image?: ReactNode;
  imagePosition?: 'left' | 'right';
  className?: string;
}

export function ContextSection({
  children,
  image,
  imagePosition = 'right',
  className = ''
}: ContextSectionProps) {
  return (
    <div className={`${styles.context} ${styles[`image-${imagePosition}`]} ${className}`}>
      <div className={styles.content}>
        {children}
      </div>
      {image && (
        <div className={styles.imageWrapper}>
          {image}
        </div>
      )}
    </div>
  );
}
