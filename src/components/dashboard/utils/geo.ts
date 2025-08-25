/**
 * Geographic utilities for world map and country data
 */

// ISO2 to ISO3 country code mapping
export const ISO2_TO_ISO3: Record<string, string> = {
  'AD': 'AND', 'AE': 'ARE', 'AF': 'AFG', 'AG': 'ATG', 'AI': 'AIA', 'AL': 'ALB',
  'AM': 'ARM', 'AO': 'AGO', 'AQ': 'ATA', 'AR': 'ARG', 'AS': 'ASM', 'AT': 'AUT',
  'AU': 'AUS', 'AW': 'ABW', 'AX': 'ALA', 'AZ': 'AZE', 'BA': 'BIH', 'BB': 'BRB',
  'BD': 'BGD', 'BE': 'BEL', 'BF': 'BFA', 'BG': 'BGR', 'BH': 'BHR', 'BI': 'BDI',
  'BJ': 'BEN', 'BL': 'BLM', 'BM': 'BMU', 'BN': 'BRN', 'BO': 'BOL', 'BQ': 'BES',
  'BR': 'BRA', 'BS': 'BHS', 'BT': 'BTN', 'BV': 'BVT', 'BW': 'BWA', 'BY': 'BLR',
  'BZ': 'BLZ', 'CA': 'CAN', 'CC': 'CCK', 'CD': 'COD', 'CF': 'CAF', 'CG': 'COG',
  'CH': 'CHE', 'CI': 'CIV', 'CK': 'COK', 'CL': 'CHL', 'CM': 'CMR', 'CN': 'CHN',
  'CO': 'COL', 'CR': 'CRI', 'CU': 'CUB', 'CV': 'CPV', 'CW': 'CUW', 'CX': 'CXR',
  'CY': 'CYP', 'CZ': 'CZE', 'DE': 'DEU', 'DJ': 'DJI', 'DK': 'DNK', 'DM': 'DMA',
  'DO': 'DOM', 'DZ': 'DZA', 'EC': 'ECU', 'EE': 'EST', 'EG': 'EGY', 'EH': 'ESH',
  'ER': 'ERI', 'ES': 'ESP', 'ET': 'ETH', 'FI': 'FIN', 'FJ': 'FJI', 'FK': 'FLK',
  'FM': 'FSM', 'FO': 'FRO', 'FR': 'FRA', 'GA': 'GAB', 'GB': 'GBR', 'GD': 'GRD',
  'GE': 'GEO', 'GF': 'GUF', 'GG': 'GGY', 'GH': 'GHA', 'GI': 'GIB', 'GL': 'GRL',
  'GM': 'GMB', 'GN': 'GIN', 'GP': 'GLP', 'GQ': 'GNQ', 'GR': 'GRC', 'GS': 'SGS',
  'GT': 'GTM', 'GU': 'GUM', 'GW': 'GNB', 'GY': 'GUY', 'HK': 'HKG', 'HM': 'HMD',
  'HN': 'HND', 'HR': 'HRV', 'HT': 'HTI', 'HU': 'HUN', 'ID': 'IDN', 'IE': 'IRL',
  'IL': 'ISR', 'IM': 'IMN', 'IN': 'IND', 'IO': 'IOT', 'IQ': 'IRQ', 'IR': 'IRN',
  'IS': 'ISL', 'IT': 'ITA', 'JE': 'JEY', 'JM': 'JAM', 'JO': 'JOR', 'JP': 'JPN',
  'KE': 'KEN', 'KG': 'KGZ', 'KH': 'KHM', 'KI': 'KIR', 'KM': 'COM', 'KN': 'KNA',
  'KP': 'PRK', 'KR': 'KOR', 'KW': 'KWT', 'KY': 'CYM', 'KZ': 'KAZ', 'LA': 'LAO',
  'LB': 'LBN', 'LC': 'LCA', 'LI': 'LIE', 'LK': 'LKA', 'LR': 'LBR', 'LS': 'LSO',
  'LT': 'LTU', 'LU': 'LUX', 'LV': 'LVA', 'LY': 'LBY', 'MA': 'MAR', 'MC': 'MCO',
  'MD': 'MDA', 'ME': 'MNE', 'MF': 'MAF', 'MG': 'MDG', 'MH': 'MHL', 'MK': 'MKD',
  'ML': 'MLI', 'MM': 'MMR', 'MN': 'MNG', 'MO': 'MAC', 'MP': 'MNP', 'MQ': 'MTQ',
  'MR': 'MRT', 'MS': 'MSR', 'MT': 'MLT', 'MU': 'MUS', 'MV': 'MDV', 'MW': 'MWI',
  'MX': 'MEX', 'MY': 'MYS', 'MZ': 'MOZ', 'NA': 'NAM', 'NC': 'NCL', 'NE': 'NER',
  'NF': 'NFK', 'NG': 'NGA', 'NI': 'NIC', 'NL': 'NLD', 'NO': 'NOR', 'NP': 'NPL',
  'NR': 'NRU', 'NU': 'NIU', 'NZ': 'NZL', 'OM': 'OMN', 'PA': 'PAN', 'PE': 'PER',
  'PF': 'PYF', 'PG': 'PNG', 'PH': 'PHL', 'PK': 'PAK', 'PL': 'POL', 'PM': 'SPM',
  'PN': 'PCN', 'PR': 'PRI', 'PS': 'PSE', 'PT': 'PRT', 'PW': 'PLW', 'PY': 'PRY',
  'QA': 'QAT', 'RE': 'REU', 'RO': 'ROU', 'RS': 'SRB', 'RU': 'RUS', 'RW': 'RWA',
  'SA': 'SAU', 'SB': 'SLB', 'SC': 'SYC', 'SD': 'SDN', 'SE': 'SWE', 'SG': 'SGP',
  'SH': 'SHN', 'SI': 'SVN', 'SJ': 'SJM', 'SK': 'SVK', 'SL': 'SLE', 'SM': 'SMR',
  'SN': 'SEN', 'SO': 'SOM', 'SR': 'SUR', 'SS': 'SSD', 'ST': 'STP', 'SV': 'SLV',
  'SX': 'SXM', 'SY': 'SYR', 'SZ': 'SWZ', 'TC': 'TCA', 'TD': 'TCD', 'TF': 'ATF',
  'TG': 'TGO', 'TH': 'THA', 'TJ': 'TJK', 'TK': 'TKL', 'TL': 'TLS', 'TM': 'TKM',
  'TN': 'TUN', 'TO': 'TON', 'TR': 'TUR', 'TT': 'TTO', 'TV': 'TUV', 'TW': 'TWN',
  'TZ': 'TZA', 'UA': 'UKR', 'UG': 'UGA', 'UM': 'UMI', 'US': 'USA', 'UY': 'URY',
  'UZ': 'UZB', 'VA': 'VAT', 'VC': 'VCT', 'VE': 'VEN', 'VG': 'VGB', 'VI': 'VIR',
  'VN': 'VNM', 'VU': 'VUT', 'WF': 'WLF', 'WS': 'WSM', 'YE': 'YEM', 'YT': 'MYT',
  'ZA': 'ZAF', 'ZM': 'ZMB', 'ZW': 'ZWE'
};

// Country names in Arabic and English
export const COUNTRY_NAMES: Record<string, { ar: string; en: string }> = {
  'EGY': { ar: 'مصر', en: 'Egypt' },
  'USA': { ar: 'الولايات المتحدة', en: 'United States' },
  'SAU': { ar: 'السعودية', en: 'Saudi Arabia' },
  'ARE': { ar: 'الإمارات', en: 'United Arab Emirates' },
  'JOR': { ar: 'الأردن', en: 'Jordan' },
  'LBN': { ar: 'لبنان', en: 'Lebanon' },
  'SYR': { ar: 'سوريا', en: 'Syria' },
  'IRQ': { ar: 'العراق', en: 'Iraq' },
  'KWT': { ar: 'الكويت', en: 'Kuwait' },
  'QAT': { ar: 'قطر', en: 'Qatar' },
  'BHR': { ar: 'البحرين', en: 'Bahrain' },
  'OMN': { ar: 'عمان', en: 'Oman' },
  'YEM': { ar: 'اليمن', en: 'Yemen' },
  'MAR': { ar: 'المغرب', en: 'Morocco' },
  'DZA': { ar: 'الجزائر', en: 'Algeria' },
  'TUN': { ar: 'تونس', en: 'Tunisia' },
  'LBY': { ar: 'ليبيا', en: 'Libya' },
  'SDN': { ar: 'السودان', en: 'Sudan' },
  'SOM': { ar: 'الصومال', en: 'Somalia' },
  'DJI': { ar: 'جيبوتي', en: 'Djibouti' },
  'COM': { ar: 'جزر القمر', en: 'Comoros' },
  'MRT': { ar: 'موريتانيا', en: 'Mauritania' }
};

/**
 * Get country name by ISO3 code
 */
export const getCountryName = (iso3: string, locale: 'ar' | 'en' = 'ar'): string => {
  const country = COUNTRY_NAMES[iso3];
  return country ? country[locale] : iso3;
};

/**
 * Convert ISO2 to ISO3
 */
export const convertISO2toISO3 = (iso2: string): string => {
  return ISO2_TO_ISO3[iso2.toUpperCase()] || iso2;
};

/**
 * Load world topology data
 */
export const loadWorldTopology = async () => {
  try {
    // In a real app, you would load from a CDN or local file
    const response = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/world-110m.json');
    const topology = await response.json();
    return topology;
  } catch (error) {
    console.error('Failed to load world topology:', error);
    return null;
  }
};

/**
 * Get geographic center of a country (simplified)
 */
export const getCountryCenter = (iso3: string): [number, number] => {
  // Simplified coordinates for major countries
  const centers: Record<string, [number, number]> = {
    'EGY': [30.0444, 31.2357],  // Cairo
    'USA': [39.8283, -98.5795], // Geographic center
    'SAU': [23.8859, 45.0792],  // Riyadh
    'ARE': [23.4241, 53.8478],  // Abu Dhabi
    'JOR': [30.5852, 36.2384],  // Amman
    'LBN': [33.8547, 35.8623],  // Beirut
    'SYR': [34.8021, 38.9968],  // Damascus
    'IRQ': [33.2232, 43.6793],  // Baghdad
    'KWT': [29.3117, 47.4818],  // Kuwait City
    'QAT': [25.3548, 51.1839],  // Doha
    'BHR': [25.9304, 50.6378],  // Manama
    'OMN': [21.4735, 55.9754],  // Muscat
    'YEM': [15.5527, 48.5164],  // Sana'a
    'MAR': [31.7917, -7.0926],  // Rabat
    'DZA': [28.0339, 1.6596],   // Algiers
    'TUN': [33.8869, 9.5375],   // Tunis
    'LBY': [26.3351, 17.2283],  // Tripoli
    'SDN': [12.8628, 30.2176],  // Khartoum
  };
  
  return centers[iso3] || [0, 0];
};