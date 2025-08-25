import React from 'react';
import { Search, Calendar, Globe, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getDateRangeOptions } from './utils/dates';
import { cn } from './utils/cn';
import type { Filters } from './mocks/demoData';

interface FiltersBarProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  className?: string;
  locale?: 'ar' | 'en';
}

const REGIONS = [
  { value: 'mena', label: { ar: 'الشرق الأوسط وشمال أفريقيا', en: 'MENA' } },
  { value: 'gcc', label: { ar: 'دول مجلس التعاون الخليجي', en: 'GCC' } },
  { value: 'levant', label: { ar: 'بلاد الشام', en: 'Levant' } },
  { value: 'maghreb', label: { ar: 'المغرب العربي', en: 'Maghreb' } },
  { value: 'global', label: { ar: 'عالمي', en: 'Global' } }
];

const CATEGORIES = [
  { value: 'commercial', label: { ar: 'تجاري', en: 'Commercial' } },
  { value: 'corporate', label: { ar: 'شركات', en: 'Corporate' } },
  { value: 'litigation', label: { ar: 'تقاضي', en: 'Litigation' } },
  { value: 'employment', label: { ar: 'عمالة', en: 'Employment' } },
  { value: 'ip', label: { ar: 'ملكية فكرية', en: 'IP & Technology' } }
];

export const FiltersBar: React.FC<FiltersBarProps> = ({
  filters,
  onFiltersChange,
  className,
  locale = 'ar'
}) => {
  const dateRangeOptions = getDateRangeOptions(locale);

  const handleFilterChange = (key: keyof Filters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleCategoryToggle = (category: string) => {
    const currentCategories = filters.categories || [];
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter(c => c !== category)
      : [...currentCategories, category];
    
    handleFilterChange('categories', newCategories);
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.keys(filters).some(key => {
    const value = filters[key as keyof Filters];
    return value && (Array.isArray(value) ? value.length > 0 : true);
  });

  return (
    <Card className={cn('p-4 space-y-4', className)}>
      {/* Search and Date Range */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder={locale === 'ar' ? 'البحث...' : 'Search...'}
            value={filters.search || ''}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="pr-10"
          />
        </div>
        
        <Select
          value={filters.dateFrom && filters.dateTo ? 
            `${filters.dateFrom}_${filters.dateTo}` : ''
          }
          onValueChange={(value) => {
            if (value) {
              const option = dateRangeOptions.find(opt => 
                `${opt.from}_${opt.to}` === value
              );
              if (option) {
                handleFilterChange('dateFrom', option.from);
                handleFilterChange('dateTo', option.to);
              }
            }
          }}
        >
          <SelectTrigger className="w-48">
            <Calendar className="h-4 w-4 ml-2" />
            <SelectValue placeholder={locale === 'ar' ? 'اختر الفترة' : 'Select Period'} />
          </SelectTrigger>
          <SelectContent>
            {dateRangeOptions.map((option) => (
              <SelectItem key={option.key} value={`${option.from}_${option.to}`}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Region and Categories */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Select
          value={filters.region || ''}
          onValueChange={(value) => handleFilterChange('region', value || undefined)}
        >
          <SelectTrigger className="w-48">
            <Globe className="h-4 w-4 ml-2" />
            <SelectValue placeholder={locale === 'ar' ? 'المنطقة' : 'Region'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">
              {locale === 'ar' ? 'جميع المناطق' : 'All Regions'}
            </SelectItem>
            {REGIONS.map((region) => (
              <SelectItem key={region.value} value={region.value}>
                {region.label[locale]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex flex-wrap gap-2 flex-1">
          {CATEGORIES.map((category) => {
            const isActive = filters.categories?.includes(category.value);
            return (
              <Badge
                key={category.value}
                variant={isActive ? 'default' : 'outline'}
                className={cn(
                  'cursor-pointer transition-colors',
                  isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                )}
                onClick={() => handleCategoryToggle(category.value)}
              >
                {category.label[locale]}
              </Badge>
            );
          })}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <Filter className="h-4 w-4 ml-2" />
            {locale === 'ar' ? 'مسح الفلاتر' : 'Clear Filters'}
          </Button>
        </div>
      )}
    </Card>
  );
};

export default FiltersBar;