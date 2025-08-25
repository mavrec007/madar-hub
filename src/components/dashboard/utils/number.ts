/**
 * Number formatting utilities for Arabic/English locales
 */

export const formatNumber = (
  value: number,
  locale: 'ar' | 'en' = 'ar',
  options?: Intl.NumberFormatOptions
): string => {
  const localeMap = {
    ar: 'ar-EG',
    en: 'en-US'
  };

  return new Intl.NumberFormat(localeMap[locale], options).format(value);
};

export const formatCurrency = (
  value: number,
  currency: string = 'EGP',
  locale: 'ar' | 'en' = 'ar'
): string => {
  return formatNumber(value, locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
};

export const formatPercentage = (
  value: number,
  locale: 'ar' | 'en' = 'ar',
  decimals: number = 1
): string => {
  return formatNumber(value / 100, locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
};

export const formatCompactNumber = (
  value: number,
  locale: 'ar' | 'en' = 'ar'
): string => {
  return formatNumber(value, locale, {
    notation: 'compact',
    compactDisplay: 'short'
  });
};

export const getDeltaColor = (delta: number): string => {
  if (delta > 0) return 'text-success';
  if (delta < 0) return 'text-destructive';
  return 'text-muted-foreground';
};

export const getDeltaIcon = (delta: number): '↗' | '↘' | '→' => {
  if (delta > 0) return '↗';
  if (delta < 0) return '↘';
  return '→';
};