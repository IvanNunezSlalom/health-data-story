import React from 'react';
import styles from './Tooltip.module.css';

export interface TooltipProps {
  title?: string;
  children: React.ReactNode;
  position?: { x: number; y: number };
  visible?: boolean;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  title,
  children,
  position = { x: 0, y: 0 },
  visible = true,
  className,
}) => {
  if (!visible) return null;

  const style: React.CSSProperties = {
    left: `${position.x}px`,
    top: `${position.y}px`,
  };

  return (
    <div className={`${styles.tooltip} ${className || ''}`} style={style} role="tooltip">
      {title && <div className={styles.tooltipTitle}>{title}</div>}
      <div className={styles.tooltipContent}>{children}</div>
    </div>
  );
};

export interface TooltipItemProps {
  label: string;
  value: string | number;
  color?: string;
}

export const TooltipItem: React.FC<TooltipItemProps> = ({ label, value, color }) => {
  return (
    <div className={styles.tooltipItem}>
      {color && (
        <span className={styles.tooltipColorDot} style={{ backgroundColor: color }} />
      )}
      <span className={styles.tooltipLabel}>{label}:</span>
      <span className={styles.tooltipValue}>{value}</span>
    </div>
  );
};
