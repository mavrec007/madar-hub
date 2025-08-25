import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { motion } from 'framer-motion';
import { MoreHorizontal, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatNumber } from './utils/number';
import { getChartColor } from './utils/colors';
import { cn } from './utils/cn';
import type { CategoryDatum } from './mocks/demoData';

interface CategoryBreakdownProps {
  data: CategoryDatum[];
  title?: string;
  className?: string;
  locale?: 'ar' | 'en';
  layout?: 'vertical' | 'horizontal';
  showSubcategories?: boolean;
}

const CustomTooltip: React.FC<any> = ({ active, payload, label, locale }) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;

  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-lg max-w-xs">
      <div className="font-medium text-card-foreground mb-2">
        {label}
      </div>
      <div className="flex items-center gap-2 text-sm mb-2">
        <div 
          className="w-3 h-3 rounded-full" 
          style={{ backgroundColor: payload[0].color }}
        />
        <span className="text-muted-foreground">
          {locale === 'ar' ? 'القيمة:' : 'Value:'}
        </span>
        <span className="font-medium text-card-foreground">
          {formatNumber(payload[0].value, locale)}
        </span>
      </div>
      {data.region && (
        <div className="text-xs text-muted-foreground">
          {locale === 'ar' ? 'المنطقة:' : 'Region:'} {data.region}
        </div>
      )}
    </div>
  );
};

const SubcategoryList: React.FC<{
  subcategories: CategoryDatum[];
  locale: 'ar' | 'en';
}> = ({ subcategories, locale }) => {
  return (
    <div className="mt-4 space-y-2">
      <div className="text-sm font-medium text-muted-foreground">
        {locale === 'ar' ? 'التصنيفات الفرعية:' : 'Subcategories:'}
      </div>
      {subcategories.map((sub, index) => (
        <div key={sub.category} className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: getChartColor(index + 1) }}
            />
            <span className="text-card-foreground">{sub.category}</span>
          </div>
          <span className="font-medium">
            {formatNumber(sub.value, locale)}
          </span>
        </div>
      ))}
    </div>
  );
};

export const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({
  data,
  title,
  className,
  locale = 'ar',
  layout = 'vertical',
  showSubcategories = false
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryDatum | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleBarClick = (data: CategoryDatum) => {
    setSelectedCategory(data);
    if (data.subcategories) {
      setIsExpanded(true);
    }
  };

  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className={cn('w-full', className)}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              {title || (locale === 'ar' ? 'التوزيع حسب التصنيف' : 'Category Breakdown')}
            </CardTitle>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                layout={layout}
                margin={{
                  top: 5,
                  right: 30,
                  left: layout === 'vertical' ? 80 : 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                {layout === 'vertical' ? (
                  <>
                    <XAxis 
                      type="number" 
                      tickFormatter={(value) => formatNumber(value, locale, { notation: 'compact' })}
                      className="text-xs"
                    />
                    <YAxis 
                      type="category" 
                      dataKey="category" 
                      className="text-xs"
                      width={80}
                    />
                  </>
                ) : (
                  <>
                    <XAxis 
                      type="category" 
                      dataKey="category" 
                      className="text-xs"
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis 
                      type="number" 
                      tickFormatter={(value) => formatNumber(value, locale, { notation: 'compact' })}
                      className="text-xs"
                    />
                  </>
                )}
                <Tooltip content={<CustomTooltip locale={locale} />} />
                <Bar 
                  dataKey="value" 
                  radius={[0, 4, 4, 0]}
                  cursor="pointer"
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={getChartColor(index)}
                      className="hover:opacity-80 transition-opacity cursor-pointer"
                      onClick={() => handleBarClick(entry)}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Subcategories Detail */}
          {isExpanded && selectedCategory?.subcategories && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-border pt-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="font-medium">
                    {selectedCategory.category}
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsExpanded(false)}
                >
                  {locale === 'ar' ? 'إغلاق' : 'Close'}
                </Button>
              </div>
              <SubcategoryList 
                subcategories={selectedCategory.subcategories} 
                locale={locale}
              />
            </motion.div>
          )}

          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
            <div>
              <div className="text-xs text-muted-foreground">
                {locale === 'ar' ? 'إجمالي التصنيفات' : 'Total Categories'}
              </div>
              <div className="text-lg font-semibold">
                {data.length}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">
                {locale === 'ar' ? 'أعلى قيمة' : 'Highest Value'}
              </div>
              <div className="text-lg font-semibold">
                {formatNumber(maxValue, locale)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CategoryBreakdown;