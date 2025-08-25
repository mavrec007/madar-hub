import React, { useState, useMemo } from 'react';
import { 
  ComposableMap, 
  Geographies, 
  Geography, 
  ZoomableGroup,
  Sphere,
  Graticule
} from 'react-simple-maps';
import { scaleQuantile, scaleThreshold } from 'd3-scale';
import { motion } from 'framer-motion';
import { ZoomIn, ZoomOut, RotateCcw, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HEAT_COLORS } from './utils/colors';
import { getCountryName } from './utils/geo';
import { formatNumber } from './utils/number';
import { cn } from './utils/cn';
import type { ChoroplethDatum } from './mocks/demoData';

// World topology URL (using Natural Earth data)
const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/world-110m.json";

interface WorldChoroplethProps {
  data: ChoroplethDatum[];
  title?: string;
  className?: string;
  locale?: 'ar' | 'en';
  colorScale?: 'quantile' | 'threshold';
  customThresholds?: number[];
  onCountryClick?: (iso3: string) => void;
}

interface TooltipData {
  name: string;
  value: number;
  x: number;
  y: number;
}

const ColorLegend: React.FC<{
  scale: any;
  locale: 'ar' | 'en';
  type: 'quantile' | 'threshold';
}> = ({ scale, locale, type }) => {
  const domain = scale.domain();
  const range = scale.range();

  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs font-medium text-muted-foreground">
        {locale === 'ar' ? 'مقياس الألوان' : 'Color Scale'}
      </div>
      <div className="flex items-center gap-1">
        {range.map((color: string, index: number) => (
          <div key={index} className="flex flex-col items-center">
            <div 
              className="w-4 h-4 border border-border"
              style={{ backgroundColor: color }}
            />
            <div className="text-xs text-muted-foreground mt-1">
              {type === 'quantile' 
                ? formatNumber(domain[index] || 0, locale, { notation: 'compact' })
                : index === 0 
                  ? `<${formatNumber(domain[0], locale)}`
                  : index === range.length - 1
                    ? `>${formatNumber(domain[index - 1], locale)}`
                    : `${formatNumber(domain[index - 1], locale)}-${formatNumber(domain[index], locale)}`
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const WorldChoropleth: React.FC<WorldChoroplethProps> = ({
  data,
  title,
  className,
  locale = 'ar',
  colorScale = 'quantile',
  customThresholds,
  onCountryClick
}) => {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState<[number, number]>([0, 0]);

  // Create color scale
  const scale = useMemo(() => {
    const values = data.map(d => d.metric);
    
    if (colorScale === 'threshold' && customThresholds) {
      return scaleThreshold<number, string>()
        .domain(customThresholds)
        .range(HEAT_COLORS);
    } else {
      return scaleQuantile<string>()
        .domain(values)
        .range(HEAT_COLORS);
    }
  }, [data, colorScale, customThresholds]);

  // Create data lookup
  const dataLookup = useMemo(() => {
    return data.reduce((acc, d) => {
      acc[d.iso3] = d;
      return acc;
    }, {} as Record<string, ChoroplethDatum>);
  }, [data]);

  const handleMouseEnter = (geo: any, event: React.MouseEvent) => {
    const iso3 = geo.properties.ISO_A3;
    const countryData = dataLookup[iso3];
    
    if (countryData) {
      setTooltip({
        name: getCountryName(iso3, locale),
        value: countryData.metric,
        x: event.clientX,
        y: event.clientY
      });
    }
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  const handleCountryClick = (geo: any) => {
    const iso3 = geo.properties.ISO_A3;
    if (onCountryClick && dataLookup[iso3]) {
      onCountryClick(iso3);
    }
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.5, 8));
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.5, 1));
  const handleReset = () => {
    setZoom(1);
    setCenter([0, 0]);
  };

  const getGeographyFill = (geo: any) => {
    const iso3 = geo.properties.ISO_A3;
    const countryData = dataLookup[iso3];
    
    if (!countryData) {
      return 'rgb(var(--muted))';
    }
    
    return scale(countryData.metric);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className={cn('w-full', className)}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              {title || (locale === 'ar' ? 'الخريطة العالمية' : 'World Map')}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative h-96 w-full bg-background rounded-lg overflow-hidden">
            <ComposableMap
              projection="geoNaturalEarth1"
              projectionConfig={{
                scale: 120,
                center: center
              }}
              width={800}
              height={400}
            >
              <ZoomableGroup zoom={zoom} center={center} onMoveEnd={setCenter}>
                <Sphere stroke="rgb(var(--border))" strokeWidth={0.5} />
                <Graticule stroke="rgb(var(--border))" strokeWidth={0.5} opacity={0.3} />
                <Geographies geography={GEO_URL}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={getGeographyFill(geo)}
                        stroke="rgb(var(--border))"
                        strokeWidth={0.5}
                        onMouseEnter={(event) => handleMouseEnter(geo, event)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleCountryClick(geo)}
                        className={cn(
                          'transition-all duration-200',
                          dataLookup[geo.properties.ISO_A3] 
                            ? 'hover:stroke-primary hover:stroke-2 cursor-pointer' 
                            : 'hover:fill-muted-foreground/20'
                        )}
                      />
                    ))
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>

            {/* Tooltip */}
            {tooltip && (
              <div
                className="absolute z-10 bg-card border border-border rounded-lg p-2 shadow-lg pointer-events-none"
                style={{
                  left: tooltip.x + 10,
                  top: tooltip.y - 10,
                  transform: 'translate(-50%, -100%)'
                }}
              >
                <div className="font-medium text-card-foreground text-sm">
                  {tooltip.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatNumber(tooltip.value, locale)}
                </div>
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="mt-4 flex justify-center">
            <ColorLegend scale={scale} locale={locale} type={colorScale} />
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
            <div className="text-center">
              <div className="text-xs text-muted-foreground">
                {locale === 'ar' ? 'عدد البلدان' : 'Countries'}
              </div>
              <div className="text-lg font-semibold">
                {data.length}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground">
                {locale === 'ar' ? 'أعلى قيمة' : 'Max Value'}
              </div>
              <div className="text-lg font-semibold">
                {formatNumber(Math.max(...data.map(d => d.metric)), locale)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground">
                {locale === 'ar' ? 'المتوسط' : 'Average'}
              </div>
              <div className="text-lg font-semibold">
                {formatNumber(
                  data.reduce((sum, d) => sum + d.metric, 0) / data.length,
                  locale
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default WorldChoropleth;