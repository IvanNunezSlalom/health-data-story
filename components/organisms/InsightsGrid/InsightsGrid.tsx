import { FeatureCard } from '@/components/molecules';
import styles from './InsightsGrid.module.css';

export interface InsightCardData {
  id: string;
  icon: string;
  eyebrow?: string;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
}

export interface InsightsGridProps {
  insights: InsightCardData[];
  onCardClick?: (id: string) => void;
}

export function InsightsGrid({ insights, onCardClick }: InsightsGridProps) {
  return (
    <div className={styles.grid}>
      {insights.map((insight) => (
        <FeatureCard
          key={insight.id}
          eyebrow={insight.eyebrow}
          title={insight.title}
          description={insight.description}
          interactive
          onClick={() => onCardClick?.(insight.id)}
        >
          <div className={styles.cardContent}>
            <div className={styles.icon} aria-hidden="true">
              {insight.icon}
            </div>
            <div className={styles.link}>
              <a href={insight.linkHref} onClick={(e) => {
                e.preventDefault();
                onCardClick?.(insight.id);
              }}>
                {insight.linkText}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M6 3L11 8L6 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </FeatureCard>
      ))}
    </div>
  );
}
