/**
 * Demo data for dashboard components
 */

import { addDays, subDays, subMonths } from 'date-fns';

export interface KPI {
  titleKey: string;
  value: number;
  deltaPct?: number;
  spark?: number[];
  icon?: string;
}

export interface TimePoint {
  date: string;
  series: Record<string, number>;
}

export interface ChoroplethDatum {
  iso3: string;
  metric: number;
  label?: string;
}

export interface CategoryDatum {
  category: string;
  value: number;
  region?: string;
  subcategories?: CategoryDatum[];
}

export interface GeoPoint {
  iso3: string;
  lat: number;
  lon: number;
  value: number;
  label?: string;
  status?: 'active' | 'pending' | 'inactive';
}

export interface Filters {
  dateFrom?: string;
  dateTo?: string;
  region?: string;
  countries?: string[];
  categories?: string[];
  search?: string;
}

// KPI Demo Data
export const demoKPIs: KPI[] = [
  {
    titleKey: 'totalContracts',
    value: 1247,
    deltaPct: 12.5,
    spark: [120, 132, 145, 128, 156, 142, 167, 189, 178, 195, 210, 234],
    icon: 'FileText'
  },
  {
    titleKey: 'activeLitigations',
    value: 89,
    deltaPct: -5.2,
    spark: [95, 92, 98, 87, 91, 85, 89, 94, 88, 92, 87, 89],
    icon: 'Scale'
  },
  {
    titleKey: 'legalAdvices',
    value: 456,
    deltaPct: 8.7,
    spark: [420, 435, 448, 452, 461, 445, 456, 469, 472, 468, 475, 456],
    icon: 'MessageSquare'
  },
  {
    titleKey: 'investigations',
    value: 234,
    deltaPct: 15.3,
    spark: [200, 205, 212, 218, 225, 230, 228, 235, 242, 238, 245, 234],
    icon: 'Search'
  }
];

// Time Series Demo Data
export const generateTimeSeriesData = (months: number = 12): TimePoint[] => {
  const data: TimePoint[] = [];
  const startDate = subMonths(new Date(), months);
  
  for (let i = 0; i < months * 30; i++) {
    const date = addDays(startDate, i);
    data.push({
      date: date.toISOString().split('T')[0],
      series: {
        contracts: Math.floor(Math.random() * 50) + 20,
        litigations: Math.floor(Math.random() * 15) + 5,
        advices: Math.floor(Math.random() * 30) + 10,
        investigations: Math.floor(Math.random() * 20) + 8
      }
    });
  }
  
  return data;
};

// Choropleth Demo Data
export const demoChoroplethData: ChoroplethDatum[] = [
  { iso3: 'EGY', metric: 234, label: 'مصر' },
  { iso3: 'USA', metric: 189, label: 'United States' },
  { iso3: 'SAU', metric: 156, label: 'السعودية' },
  { iso3: 'ARE', metric: 98, label: 'الإمارات' },
  { iso3: 'JOR', metric: 76, label: 'الأردن' },
  { iso3: 'LBN', metric: 54, label: 'لبنان' },
  { iso3: 'SYR', metric: 43, label: 'سوريا' },
  { iso3: 'IRQ', metric: 65, label: 'العراق' },
  { iso3: 'KWT', metric: 32, label: 'الكويت' },
  { iso3: 'QAT', metric: 28, label: 'قطر' },
  { iso3: 'BHR', metric: 15, label: 'البحرين' },
  { iso3: 'OMN', metric: 41, label: 'عمان' },
  { iso3: 'YEM', metric: 37, label: 'اليمن' },
  { iso3: 'MAR', metric: 67, label: 'المغرب' },
  { iso3: 'DZA', metric: 89, label: 'الجزائر' },
  { iso3: 'TUN', metric: 52, label: 'تونس' },
  { iso3: 'LBY', metric: 29, label: 'ليبيا' },
  { iso3: 'SDN', metric: 48, label: 'السودان' }
];

// Category Demo Data
export const demoCategoryData: CategoryDatum[] = [
  {
    category: 'Commercial',
    value: 345,
    region: 'MENA',
    subcategories: [
      { category: 'Contracts', value: 156 },
      { category: 'Disputes', value: 89 },
      { category: 'Compliance', value: 100 }
    ]
  },
  {
    category: 'Corporate',
    value: 278,
    region: 'MENA',
    subcategories: [
      { category: 'M&A', value: 124 },
      { category: 'Governance', value: 89 },
      { category: 'Securities', value: 65 }
    ]
  },
  {
    category: 'Litigation',
    value: 189,
    region: 'MENA',
    subcategories: [
      { category: 'Civil', value: 89 },
      { category: 'Criminal', value: 54 },
      { category: 'Administrative', value: 46 }
    ]
  },
  {
    category: 'IP & Technology',
    value: 156,
    region: 'Global',
    subcategories: [
      { category: 'Patents', value: 67 },
      { category: 'Trademarks', value: 45 },
      { category: 'Licensing', value: 44 }
    ]
  },
  {
    category: 'Employment',
    value: 134,
    region: 'MENA',
    subcategories: [
      { category: 'Labor Law', value: 78 },
      { category: 'Benefits', value: 32 },
      { category: 'Immigration', value: 24 }
    ]
  }
];

// Geo Bubbles Demo Data
export const demoGeoBubbles: GeoPoint[] = [
  { iso3: 'EGY', lat: 30.0444, lon: 31.2357, value: 234, label: 'القاهرة', status: 'active' },
  { iso3: 'USA', lat: 40.7128, lon: -74.0060, value: 189, label: 'New York', status: 'active' },
  { iso3: 'SAU', lat: 24.7136, lon: 46.6753, value: 156, label: 'الرياض', status: 'active' },
  { iso3: 'ARE', lat: 25.2048, lon: 55.2708, value: 98, label: 'دبي', status: 'pending' },
  { iso3: 'JOR', lat: 31.9454, lon: 35.9284, value: 76, label: 'عمان', status: 'active' },
  { iso3: 'LBN', lat: 33.8938, lon: 35.5018, value: 54, label: 'بيروت', status: 'inactive' },
  { iso3: 'KWT', lat: 29.3759, lon: 47.9774, value: 32, label: 'الكويت', status: 'active' },
  { iso3: 'QAT', lat: 25.2867, lon: 51.5333, value: 28, label: 'الدوحة', status: 'pending' },
  { iso3: 'MAR', lat: 33.9716, lon: -6.8498, value: 67, label: 'الرباط', status: 'active' },
  { iso3: 'DZA', lat: 36.7538, lon: 3.0588, value: 89, label: 'الجزائر', status: 'active' }
];

// Recent Signals Demo Data
export const demoRecentSignals = [
  {
    id: '1',
    type: 'alert',
    titleKey: 'High litigation volume in MENA region',
    timestamp: new Date().toISOString(),
    severity: 'high',
    category: 'litigation'
  },
  {
    id: '2',
    type: 'notification',
    titleKey: 'New compliance requirements in UAE',
    timestamp: subDays(new Date(), 1).toISOString(),
    severity: 'medium',
    category: 'compliance'
  },
  {
    id: '3',
    type: 'insight',
    titleKey: 'Contract automation opportunity identified',
    timestamp: subDays(new Date(), 2).toISOString(),
    severity: 'low',
    category: 'automation'
  }
];

// Distribution data for box plots or histograms
export const demoDistributionData = [
  { range: '0-10', count: 15, percentage: 12.5 },
  { range: '11-25', count: 28, percentage: 23.3 },
  { range: '26-50', count: 35, percentage: 29.2 },
  { range: '51-100', count: 25, percentage: 20.8 },
  { range: '101-200', count: 12, percentage: 10.0 },
  { range: '201+', count: 5, percentage: 4.2 }
];