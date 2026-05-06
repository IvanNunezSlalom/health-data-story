'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navigation.module.css';

export interface NavigationProps {
  className?: string;
}

export function Navigation({ className }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`${styles.navigation} ${isScrolled ? styles.scrolled : ''} ${className || ''}`}
      role="banner"
    >
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" aria-label="Health Equity Explorer Home">
            Health Equity Explorer
          </Link>
        </div>

        <div className={styles.searchPlaceholder} aria-hidden="true">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11 11L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span>Search neighborhoods...</span>
        </div>

        <nav className={styles.nav} aria-label="Main navigation">
          <Link href="#about" className={styles.navLink}>
            About
          </Link>
          <Link href="#methods" className={styles.navLink}>
            Methods
          </Link>
          <Link href="#contact" className={styles.navLink}>
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
