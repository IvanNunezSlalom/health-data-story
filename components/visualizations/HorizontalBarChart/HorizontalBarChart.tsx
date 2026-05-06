'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer, Cell } from 'recharts';
import styles from './HorizontalBarChart.module.css';

export interface BarChartDataItem {
  category: string;
  value: number;
  gap?: number;
}

export interface HorizontalBarChartProps {
  data: BarChartDataItem[];
  averageValue: number;
  xAxisLabel?: string;
  yAxisLabel?: string;
  className?: string;
}

export function HorizontalBarChart({
  data,
  averageValue,
  xAxisLabel = 'Life Expectancy (years)',
  yAxisLabel,
  className
}: HorizontalBarChartProps) {
  // Sort data descending by value
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  // Calculate gaps from average
  const dataWithGaps = sortedData.map(item => ({
    ...item,
    gap: item.value - averageValue
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      const gap = item.gap;
      const gapText = gap >= 0
        ? `+${gap.toFixed(1)} years above average`
        : `${gap.toFixed(1)} years below average`;

      return (
        <div className={styles.tooltip}>
          <p className={styles.tooltipLabel}><strong>{item.category}</strong></p>
          <p className={styles.tooltipValue}>
            Life Expectancy: <strong>{item.value.toFixed(1)} years</strong>
          </p>
          <p className={styles.tooltipGap}>{gapText}</p>
        </div>
      );
    }
    return null;
  };

  const chartHeight = 400;
  const barHeight = (chartHeight - 40) / dataWithGaps.length; // Subtract margins
  const topMargin = 20;

  return (
    <div className={`${styles.wrapper} ${className || ''}`} role="img" aria-label="Bar chart showing life expectancy by race and ethnicity with gaps compared to state average">
      <div className={styles.labelsColumn}>
        <div style={{ height: topMargin }} /> {/* Top margin spacer */}
        {dataWithGaps.map((item, index) => (
          <div
            key={`label-${index}`}
            className={styles.gapLabel}
            style={{
              height: barHeight,
              color: item.gap >= 0 ? 'var(--success-green)' : 'var(--accent-orange)'
            }}
          >
            {item.gap >= 0 ? `+${item.gap.toFixed(1)}` : item.gap.toFixed(1)} yrs
          </div>
        ))}
      </div>
      <div className={styles.chartColumn}>
        <ResponsiveContainer width="100%" height={chartHeight}>
          <BarChart
            data={dataWithGaps}
            layout="vertical"
            margin={{ top: topMargin, right: 80, bottom: 20, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--neutral-300)" />
            <XAxis
              type="number"
              domain={[70, 86]}
              label={{ value: xAxisLabel, position: 'bottom', offset: 0, style: { fill: 'var(--neutral-900)', fontWeight: 600 } }}
              tick={{ fill: 'var(--neutral-700)', fontSize: 14 }}
            />
            <YAxis
              type="category"
              dataKey="category"
              width={180}
              tick={{ fill: 'var(--neutral-900)', fontSize: 14 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--primary-50)' }} />
            <ReferenceLine
              x={averageValue}
              stroke="var(--neutral-700)"
              strokeDasharray="6 6"
              strokeWidth={2}
              label={{
                value: `State Avg: ${averageValue.toFixed(1)}`,
                position: 'top',
                fill: 'var(--neutral-700)',
                fontSize: 13,
                fontWeight: 600
              }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {dataWithGaps.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.gap >= 0 ? 'var(--primary-500)' : 'var(--accent-orange)'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
