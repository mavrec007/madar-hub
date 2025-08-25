import dayjs, { Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/ar';
import 'dayjs/locale/en';

// Configure dayjs plugins
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localeData);

// Default timezone
export const DEFAULT_TIMEZONE = 'Africa/Cairo';

/**
 * Format date for display
 */
export const formatDate = (
  date: string | Date | Dayjs,
  format: string = 'YYYY-MM-DD',
  locale: 'ar' | 'en' = 'ar',
  timezone: string = DEFAULT_TIMEZONE
): string => {
  return dayjs(date)
    .tz(timezone)
    .locale(locale)
    .format(format);
};

/**
 * Format date with relative time
 */
export const formatRelativeDate = (
  date: string | Date | Dayjs,
  locale: 'ar' | 'en' = 'ar',
  timezone: string = DEFAULT_TIMEZONE
): string => {
  const now = dayjs().tz(timezone);
  const targetDate = dayjs(date).tz(timezone);
  
  const diffDays = now.diff(targetDate, 'day');
  
  if (diffDays === 0) {
    return locale === 'ar' ? 'اليوم' : 'Today';
  } else if (diffDays === 1) {
    return locale === 'ar' ? 'أمس' : 'Yesterday';
  } else if (diffDays <= 7) {
    return locale === 'ar' ? `منذ ${diffDays} أيام` : `${diffDays} days ago`;
  }
  
  return formatDate(date, 'MMM DD, YYYY', locale, timezone);
};

/**
 * Get date range options for filters
 */
export const getDateRangeOptions = (locale: 'ar' | 'en' = 'ar') => {
  const now = dayjs().tz(DEFAULT_TIMEZONE);
  
  return [
    {
      key: 'last7days',
      label: locale === 'ar' ? 'آخر 7 أيام' : 'Last 7 days',
      from: now.subtract(7, 'day').format('YYYY-MM-DD'),
      to: now.format('YYYY-MM-DD')
    },
    {
      key: 'last30days',
      label: locale === 'ar' ? 'آخر 30 يوم' : 'Last 30 days',
      from: now.subtract(30, 'day').format('YYYY-MM-DD'),
      to: now.format('YYYY-MM-DD')
    },
    {
      key: 'last3months',
      label: locale === 'ar' ? 'آخر 3 أشهر' : 'Last 3 months',
      from: now.subtract(3, 'month').format('YYYY-MM-DD'),
      to: now.format('YYYY-MM-DD')
    },
    {
      key: 'last12months',
      label: locale === 'ar' ? 'آخر 12 شهر' : 'Last 12 months',
      from: now.subtract(12, 'month').format('YYYY-MM-DD'),
      to: now.format('YYYY-MM-DD')
    }
  ];
};

/**
 * Generate time series data points
 */
export const generateTimePoints = (
  from: string,
  to: string,
  interval: 'day' | 'week' | 'month' = 'day'
): string[] => {
  const start = dayjs(from);
  const end = dayjs(to);
  const points: string[] = [];
  
  let current = start;
  while (current.isBefore(end) || current.isSame(end)) {
    points.push(current.format('YYYY-MM-DD'));
    current = current.add(1, interval);
  }
  
  return points;
};