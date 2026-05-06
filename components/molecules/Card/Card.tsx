import React from 'react';
import styles from './Card.module.css';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  interactive = false,
  onClick,
}) => {
  const classNames = [
    styles.card,
    interactive && styles.interactive,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const Element = interactive || onClick ? 'button' : 'div';

  return (
    <Element className={classNames} onClick={onClick} type={onClick ? 'button' : undefined}>
      {children}
    </Element>
  );
};

export interface CardHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  eyebrow,
  title,
  description,
  className,
}) => {
  return (
    <div className={`${styles.cardHeader} ${className || ''}`}>
      {eyebrow && <span className={styles.cardEyebrow}>{eyebrow}</span>}
      <h3 className={styles.cardTitle}>{title}</h3>
      {description && <p className={styles.cardDescription}>{description}</p>}
    </div>
  );
};

export interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const CardBody: React.FC<CardBodyProps> = ({ children, className }) => {
  return <div className={`${styles.cardBody} ${className || ''}`}>{children}</div>;
};

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => {
  return <div className={`${styles.cardFooter} ${className || ''}`}>{children}</div>;
};
