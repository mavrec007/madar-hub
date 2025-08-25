import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { RefreshCw, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import FiltersBar from './FiltersBar';
import KPIGrid from './KPIGrid';
import TimeSeriesMulti from './TimeSeriesMulti';
import CategoryBreakdown from './CategoryBreakdown';
import WorldChoropleth from './WorldChoropleth';
import { cn } from './utils/cn';
import { 
  demoKPIs, 
  generateTimeSeriesData, 
  demoCategoryData, 
  demoChoroplethData,
  type Filters 
} from './mocks/demoData';

interface GlobalDashboardProps {
  className?: string;
  isLoading?: boolean;
  onRefresh?: () => void;
  onExport?: (format: 'pdf' | 'csv') => void;
}

export const GlobalDashboard: React.FC<GlobalDashboardProps> = ({
  className,
  isLoading = false,
  onRefresh,
  onExport
}) => {
  const { i18n } = useTranslation();
  const locale = i18n.language as 'ar' | 'en';
  
  const [filters, setFilters] = useState<Filters>({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Demo data with filtering applied
  const [kpiData] = useState(demoKPIs);
  const [timeSeriesData] = useState(generateTimeSeriesData(12));
  const [categoryData] = useState(demoCategoryData);
  const [choroplethData] = useState(demoChoroplethData);

  const handleRefresh = async () => {
    if (onRefresh) {
      setIsRefreshing(true);
      try {
        await onRefresh();
        toast.success(locale === 'ar' ? 'تم تحديث البيانات' : 'Data refreshed successfully');
      } catch (error) {
        toast.error(locale === 'ar' ? 'فشل في تحديث البيانات' : 'Failed to refresh data');
      } finally {
        setIsRefreshing(false);
      }
    }
  };

  const handleExport = (format: 'pdf' | 'csv') => {
    if (onExport) {
      onExport(format);
      toast.success(
        locale === 'ar' 
          ? `تم تصدير البيانات بصيغة ${format.toUpperCase()}` 
          : `Data exported as ${format.toUpperCase()}`
      );
    }
  };

  const handleCountryClick = (iso3: string) => {
    const currentCountries = filters.countries || [];
    const newCountries = currentCountries.includes(iso3)
      ? currentCountries.filter(c => c !== iso3)
      : [...currentCountries, iso3];
    
    setFilters(prev => ({ ...prev, countries: newCountries }));
  };

  if (isLoading) {
    return (
      <div className={cn('space-y-6', className)}>
        <Skeleton className="h-20 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={cn('space-y-6', className)}
    >
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {locale === 'ar' ? 'لوحة التحليلات القانونية العالمية' : 'Global Legal Analytics Dashboard'}
          </h1>
          <p className="text-muted-foreground">
            {locale === 'ar' 
              ? 'رؤى شاملة للبيانات القانونية عبر المناطق الجغرافية' 
              : 'Comprehensive insights into legal data across geographic regions'
            }
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={cn('h-4 w-4 ml-2', isRefreshing && 'animate-spin')} />
            {locale === 'ar' ? 'تحديث' : 'Refresh'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport('csv')}
          >
            <Download className="h-4 w-4 ml-2" />
            CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport('pdf')}
          >
            <Download className="h-4 w-4 ml-2" />
            PDF
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 ml-2" />
            {locale === 'ar' ? 'مشاركة' : 'Share'}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <FiltersBar
        filters={filters}
        onFiltersChange={setFilters}
        locale={locale}
      />

      {/* KPI Grid */}
      <KPIGrid kpis={kpiData} locale={locale} />

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time Series */}
        <TimeSeriesMulti
          data={timeSeriesData}
          locale={locale}
          chartType="area"
        />

        {/* World Map */}
        <WorldChoropleth
          data={choroplethData}
          locale={locale}
          onCountryClick={handleCountryClick}
        />
      </div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Category Breakdown */}
        <div className="xl:col-span-2">
          <CategoryBreakdown
            data={categoryData}
            locale={locale}
            layout="horizontal"
            showSubcategories
          />
        </div>

        {/* Additional Analytics Space */}
        <div className="space-y-4">
          <div className="p-6 bg-muted/20 rounded-lg border border-dashed border-border">
            <div className="text-center text-muted-foreground">
              <div className="text-lg font-medium mb-2">
                {locale === 'ar' ? 'إحصائيات إضافية' : 'Additional Analytics'}
              </div>
              <div className="text-sm">
                {locale === 'ar' 
                  ? 'المزيد من التحليلات والمؤشرات قريباً'
                  : 'More analytics and insights coming soon'
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">
            {choroplethData.length}
          </div>
          <div className="text-xs text-muted-foreground">
            {locale === 'ar' ? 'البلدان النشطة' : 'Active Countries'}
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-success">
            {categoryData.length}
          </div>
          <div className="text-xs text-muted-foreground">
            {locale === 'ar' ? 'التصنيفات' : 'Categories'}
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-warning">
            {timeSeriesData.length}
          </div>
          <div className="text-xs text-muted-foreground">
            {locale === 'ar' ? 'نقاط البيانات' : 'Data Points'}
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-destructive">
            {kpiData.reduce((sum, kpi) => sum + kpi.value, 0)}
          </div>
          <div className="text-xs text-muted-foreground">
            {locale === 'ar' ? 'إجمالي العمليات' : 'Total Operations'}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GlobalDashboard;