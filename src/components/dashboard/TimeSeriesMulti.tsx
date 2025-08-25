import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDate } from './utils/dates';
import { formatNumber } from './utils/number';
import { getChartColor } from './utils/colors';
import { cn } from './utils/cn';
import type { TimePoint } from './mocks/demoData';

interface TimeSeriesMultiProps {
  data: TimePoint[];
  title?: string;
  className?: string;
  locale?: 'ar' | 'en';
  chartType?: 'line' | 'area';
  showBrush?: boolean;
}

interface SeriesConfig {
  key: string;
  name: { ar: string; en: string };
  color: string;
  visible: boolean;
}

const DEFAULT_SERIES: SeriesConfig[] = [
  {
    key: 'contracts',
    name: { ar: 'العقود', en: 'Contracts' },
    color: getChartColor(0),
    visible: true
  },
  {
    key: 'litigations',
    name: { ar: 'القضايا', en: 'Litigations' },
    color: getChartColor(1),
    visible: true
  },
  {
    key: 'advices',
    name: { ar: 'الاستشارات', en: 'Advices' },
    color: getChartColor(2),
    visible: true
  },
  {
    key: 'investigations',
    name: { ar: 'التحقيقات', en: 'Investigations' },
    color: getChartColor(3),
    visible: true
  }
];

const CustomTooltip: React.FC<any> = ({ active, payload, label, locale }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
      <div className="font-medium text-card-foreground mb-2">
        {formatDate(label, 'MMM DD, YYYY', locale)}
      </div>
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-muted-foreground">{entry.name}:</span>
          <span className="font-medium text-card-foreground">
            {formatNumber(entry.value, locale)}
          </span>
        </div>
      ))}
    </div>
  );
};

const CustomLegend: React.FC<{
  series: SeriesConfig[];
  onToggle: (key: string) => void;
  locale: 'ar' | 'en';
}> = ({ series, onToggle, locale }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {series.map((item) => (
        <Badge
          key={item.key}
          variant={item.visible ? 'default' : 'outline'}
          className={cn(
            'cursor-pointer transition-all',
            item.visible 
              ? 'bg-primary text-primary-foreground' 
              : 'text-muted-foreground hover:text-foreground'
          )}
          onClick={() => onToggle(item.key)}
        >
          <div 
            className="w-2 h-2 rounded-full ml-2" 
            style={{ backgroundColor: item.visible ? 'currentColor' : item.color }}
          />
          {item.name[locale]}
        </Badge>
      ))}
    </div>
  );
};

export const TimeSeriesMulti: React.FC<TimeSeriesMultiProps> = ({
  data,
  title,
  className,
  locale = 'ar',
  chartType = 'line',
  showBrush = false
}) => {
  const [series, setSeries] = useState<SeriesConfig[]>(DEFAULT_SERIES);
  const [isStacked, setIsStacked] = useState(false);

  const handleSeriesToggle = (key: string) => {
    setSeries(prev => prev.map(s => 
      s.key === key ? { ...s, visible: !s.visible } : s
    ));
  };

  const visibleSeries = series.filter(s => s.visible);

  const ChartComponent = chartType === 'area' ? AreaChart : LineChart;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card className={cn('w-full', className)}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              {title || (locale === 'ar' ? 'الاتجاهات الزمنية' : 'Time Series Trends')}
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant={chartType === 'line' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setIsStacked(false)}
              >
                {locale === 'ar' ? 'خطوط' : 'Lines'}
              </Button>
              <Button
                variant={isStacked ? 'default' : 'outline'}
                size="sm"
                onClick={() => setIsStacked(true)}
              >
                {locale === 'ar' ? 'مكدس' : 'Stacked'}
              </Button>
            </div>
          </div>
          <CustomLegend 
            series={series} 
            onToggle={handleSeriesToggle} 
            locale={locale}
          />
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ChartComponent
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => formatDate(value, 'MMM DD', locale)}
                  className="text-xs"
                />
                <YAxis 
                  tickFormatter={(value) => formatNumber(value, locale, { notation: 'compact' })}
                  className="text-xs"
                />
                <Tooltip content={<CustomTooltip locale={locale} />} />
                
                {visibleSeries.map((seriesItem) => {
                  if (chartType === 'area') {
                    return (
                      <Area
                        key={seriesItem.key}
                        type="monotone"
                        dataKey={`series.${seriesItem.key}`}
                        stackId={isStacked ? "1" : seriesItem.key}
                        stroke={seriesItem.color}
                        fill={seriesItem.color}
                        fillOpacity={0.6}
                        strokeWidth={2}
                        name={seriesItem.name[locale]}
                      />
                    );
                  } else {
                    return (
                      <Line
                        key={seriesItem.key}
                        type="monotone"
                        dataKey={`series.${seriesItem.key}`}
                        stroke={seriesItem.color}
                        strokeWidth={2}
                        dot={{ r: 4, strokeWidth: 2 }}
                        activeDot={{ r: 6, strokeWidth: 2 }}
                        name={seriesItem.name[locale]}
                      />
                    );
                  }
                })}
              </ChartComponent>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TimeSeriesMulti;