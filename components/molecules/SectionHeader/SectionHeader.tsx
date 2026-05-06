import styles from './SectionHeader.module.css';

export interface SectionHeaderProps {
  eyebrow?: string;
  headline: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  eyebrow,
  headline,
  description,
  align = 'left',
  className = ''
}: SectionHeaderProps) {
  return (
    <div className={`${styles.header} ${styles[align]} ${className}`}>
      {eyebrow && (
        <div className={styles.eyebrow}>{eyebrow}</div>
      )}
      <h2 className={styles.headline}>{headline}</h2>
      {description && (
        <p className={styles.description}>{description}</p>
      )}
    </div>
  );
}
