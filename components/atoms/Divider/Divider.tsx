import React from 'react';
import styles from './Divider.module.css';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  className,
}) => {
  const classNames = [styles.divider, styles[orientation], className]
    .filter(Boolean)
    .join(' ');

  return <div className={classNames} role="separator" aria-orientation={orientation} />;
};
