import { Button } from '@/components/atoms/Button';
import styles from './HeroSection.module.css';

export interface HeroSectionProps {
  eyebrow?: string;
  headline: string;
  subheadline: string;
  ctaText?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
}

export function HeroSection({
  eyebrow,
  headline,
  subheadline,
  ctaText = 'Explore Neighborhoods',
  ctaHref = '#explore',
  onCtaClick
}: HeroSectionProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onCtaClick) {
      e.preventDefault();
      onCtaClick();
    }
  };

  return (
    <section className={styles.hero}>
      <div className={styles.pattern} aria-hidden="true">
        <svg
          viewBox="0 0 800 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M0,300 Q200,100 400,300 T800,300"
            stroke="var(--primary-200)"
            strokeWidth="3"
            opacity="0.4"
            fill="none"
          />
          <path
            d="M0,350 Q200,150 400,350 T800,350"
            stroke="var(--primary-200)"
            strokeWidth="2"
            opacity="0.3"
            fill="none"
          />
          <path
            d="M0,400 Q200,200 400,400 T800,400"
            stroke="var(--primary-200)"
            strokeWidth="2"
            opacity="0.2"
            fill="none"
          />
        </svg>
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          {eyebrow && (
            <div className={styles.eyebrow}>{eyebrow}</div>
          )}
          <h1 className={styles.headline}>{headline}</h1>
          <p className={styles.subheadline}>{subheadline}</p>
          <div className={styles.cta}>
            <a href={ctaHref} onClick={handleClick}>
              <Button variant="primary" size="large">
                {ctaText}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
