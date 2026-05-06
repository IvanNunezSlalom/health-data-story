import React from 'react';
import styles from './FeatureCard.module.css';

export interface FeatureCardProps {
  eyebrow?: string;
  title: string;
  description: string;
  children?: React.ReactNode;
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  eyebrow,
  title,
  description,
  children,
  interactive = false,
  onClick,
  className,
}) => {
  const classNames = [
    styles.featureCard,
    interactive && styles.interactive,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const Element = interactive || onClick ? 'button' : 'div';

  return (
    <Element className={classNames} onClick={onClick} type={onClick ? 'button' : undefined}>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      {children && <div className={styles.content}>{children}</div>}
    </Element>
  );
};
