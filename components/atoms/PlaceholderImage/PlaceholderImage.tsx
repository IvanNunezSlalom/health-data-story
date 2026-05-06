import styles from './PlaceholderImage.module.css';

export interface PlaceholderImageProps {
  width?: number;
  height?: number;
  label?: string;
  color?: string;
  className?: string;
}

export function PlaceholderImage({
  width = 600,
  height = 400,
  label = 'Image',
  color = 'var(--primary-200)',
  className = ''
}: PlaceholderImageProps) {
  return (
    <div
      className={`${styles.placeholder} ${className}`}
      style={{
        width: '100%',
        height: '100%',
        minHeight: `${height}px`,
        background: color
      }}
      aria-label={label}
      role="img"
    >
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.icon}
      >
        <rect x="20" y="30" width="80" height="60" rx="4" stroke="currentColor" strokeWidth="3" opacity="0.3" />
        <circle cx="45" cy="50" r="8" fill="currentColor" opacity="0.3" />
        <path d="M20 75L40 55L60 70L80 50L100 65V90H20V75Z" fill="currentColor" opacity="0.3" />
      </svg>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
