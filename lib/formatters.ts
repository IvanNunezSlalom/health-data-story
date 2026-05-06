export function formatNumber(value: number, decimals: number = 1): string {
  return value.toFixed(decimals);
}

export function formatPercent(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPopulation(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
}

export function formatDifference(value: number, cityAverage: number, unit: string = ''): string {
  const diff = value - cityAverage;
  const sign = diff > 0 ? '+' : '';
  const formattedDiff = diff.toFixed(1);

  return `${sign}${formattedDiff}${unit} vs. city avg`;
}

export function formatYears(value: number): string {
  return `${value.toFixed(1)} years`;
}

export function formatRate(value: number, perAmount: number = 100000): string {
  return `${Math.round(value)} per ${formatPopulation(perAmount)}`;
}
