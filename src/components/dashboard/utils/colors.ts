/**
 * Color utilities and scales for charts and visualizations
 */

// Heat map colors (5 levels from light to dark)
export const HEAT_COLORS = [
  'rgb(var(--heat-1))', // Lightest
  'rgb(var(--heat-2))',
  'rgb(var(--heat-3))',
  'rgb(var(--heat-4))',
  'rgb(var(--heat-5))'  // Darkest
];

// Chart color palette
export const CHART_COLORS = [
  'rgb(var(--primary))',
  'rgb(var(--secondary))',
  'rgb(var(--accent))',
  'rgb(var(--success))',
  'rgb(var(--warning))',
  'rgb(var(--destructive))'
];

// Status colors
export const STATUS_COLORS = {
  active: 'rgb(var(--success))',
  pending: 'rgb(var(--warning))',
  inactive: 'rgb(var(--muted))',
  error: 'rgb(var(--destructive))',
  info: 'rgb(var(--primary))'
};

/**
 * Get color by index with cycling
 */
export const getChartColor = (index: number): string => {
  return CHART_COLORS[index % CHART_COLORS.length];
};

/**
 * Get heat color by value (0-1 normalized)
 */
export const getHeatColor = (value: number, min: number = 0, max: number = 1): string => {
  const normalized = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const index = Math.floor(normalized * (HEAT_COLORS.length - 1));
  return HEAT_COLORS[index];
};

/**
 * Generate gradient definition for charts
 */
export const createGradient = (id: string, color: string, opacity: number = 0.8) => ({
  id,
  stops: [
    { offset: '0%', stopColor: color, stopOpacity: opacity },
    { offset: '100%', stopColor: color, stopOpacity: 0.1 }
  ]
});

/**
 * Get contrasting text color
 */
export const getContrastColor = (isDark: boolean): string => {
  return isDark ? 'rgb(var(--foreground))' : 'rgb(var(--background))';
};

/**
 * Color scale for categorical data
 */
export const getCategoryColor = (category: string, categories: string[]): string => {
  const index = categories.indexOf(category);
  return getChartColor(index);
};