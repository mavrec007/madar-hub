import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatNumber, formatPercentage, getDeltaColor, getDeltaIcon } from './utils/number';
import { cn } from './utils/cn';
import type { KPI } from './mocks/demoData';

interface KPIGridProps {
  kpis: KPI[];
  className?: string;
  locale?: 'ar' | 'en';
}

interface SparkLineProps {
  data: number[];
  color: string;
  className?: string;
}

const SparkLine: React.FC<SparkLineProps> = ({ data, color, className }) => {
  if (!data || data.length === 0) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className={cn('h-8 w-20', className)}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={points}
          className="opacity-80"
        />
      </svg>
    </div>
  );
};

const KPICard: React.FC<{
  kpi: KPI;
  index: number;
  locale: 'ar' | 'en';
}> = ({ kpi, index, locale }) => {
  const deltaColor = kpi.deltaPct ? getDeltaColor(kpi.deltaPct) : 'text-muted-foreground';
  const deltaIcon = kpi.deltaPct ? getDeltaIcon(kpi.deltaPct) : '→';
  
  const DeltaIcon = kpi.deltaPct 
    ? kpi.deltaPct > 0 
      ? TrendingUp 
      : TrendingDown
    : Minus;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {locale === 'ar' ? getArabicTitle(kpi.titleKey) : getEnglishTitle(kpi.titleKey)}
          </CardTitle>
          {kpi.spark && (
            <SparkLine 
              data={kpi.spark} 
              color="rgb(var(--primary))"
              className="opacity-60"
            />
          )}
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">
                {formatNumber(kpi.value, locale)}
              </div>
              {kpi.deltaPct !== undefined && (
                <div className={cn('flex items-center text-xs', deltaColor)}>
                  <DeltaIcon className="h-3 w-3 ml-1" />
                  {formatPercentage(Math.abs(kpi.deltaPct), locale, 1)}
                  <span className="mr-1">
                    {locale === 'ar' ? 'من الشهر الماضي' : 'from last month'}
                  </span>
                </div>
              )}
            </div>
            <div className="text-2xl opacity-50">
              {deltaIcon}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const KPIGrid: React.FC<KPIGridProps> = ({ kpis, className, locale = 'ar' }) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4', className)}>
      {kpis.map((kpi, index) => (
        <KPICard 
          key={kpi.titleKey} 
          kpi={kpi} 
          index={index} 
          locale={locale} 
        />
      ))}
    </div>
  );
};

// Translation helpers
const getArabicTitle = (key: string): string => {
  const translations: Record<string, string> = {
    totalContracts: 'إجمالي العقود',
    activeLitigations: 'القضايا النشطة',
    legalAdvices: 'الاستشارات القانونية',
    investigations: 'التحقيقات',
    completedCases: 'القضايا المكتملة',
    pendingReviews: 'المراجعات المعلقة',
    revenue: 'الإيرادات',
    clientSatisfaction: 'رضا العملاء'
  };
  return translations[key] || key;
};

const getEnglishTitle = (key: string): string => {
  const translations: Record<string, string> = {
    totalContracts: 'Total Contracts',
    activeLitigations: 'Active Litigations',
    legalAdvices: 'Legal Advices',
    investigations: 'Investigations',
    completedCases: 'Completed Cases',
    pendingReviews: 'Pending Reviews',
    revenue: 'Revenue',
    clientSatisfaction: 'Client Satisfaction'
  };
  return translations[key] || key;
};

export default KPIGrid;