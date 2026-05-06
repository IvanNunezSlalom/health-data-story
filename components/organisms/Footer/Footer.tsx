import Link from 'next/link';
import styles from './Footer.module.css';

export interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={`${styles.footer} ${className || ''}`} role="contentinfo">
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Column 1: Agency Info */}
          <div className={styles.column}>
            <div className={styles.agency}>
              <div className={styles.agencySeal} aria-hidden="true">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24" cy="24" r="22" stroke="white" strokeWidth="2" opacity="0.4" />
                  <circle cx="24" cy="24" r="16" stroke="white" strokeWidth="2" opacity="0.6" />
                  <path d="M24 8L28 20H40L30 28L34 40L24 32L14 40L18 28L8 20H20L24 8Z" fill="white" opacity="0.4" />
                </svg>
              </div>
              <div>
                <div className={styles.agencyName}>Health Equity Explorer</div>
                <div className={styles.disclaimer}>
                  Prototype using fictitious data for demonstration purposes
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: About Links */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>About</h3>
            <ul className={styles.linkList}>
              <li>
                <Link href="#mission" className={styles.footerLink}>
                  Our Mission
                </Link>
              </li>
              <li>
                <Link href="#team" className={styles.footerLink}>
                  Team
                </Link>
              </li>
              <li>
                <Link href="#partners" className={styles.footerLink}>
                  Partners
                </Link>
              </li>
              <li>
                <Link href="#accessibility" className={styles.footerLink}>
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Data & Methods Links */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Data & Methods</h3>
            <ul className={styles.linkList}>
              <li>
                <Link href="#data-sources" className={styles.footerLink}>
                  Data Sources
                </Link>
              </li>
              <li>
                <Link href="#methodology" className={styles.footerLink}>
                  Methodology
                </Link>
              </li>
              <li>
                <Link href="#definitions" className={styles.footerLink}>
                  Definitions
                </Link>
              </li>
              <li>
                <Link href="#contact" className={styles.footerLink}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.copyright}>
          <p>© 2026 Health Equity Explorer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
