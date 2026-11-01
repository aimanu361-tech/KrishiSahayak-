export type Language = 'en' | 'kn';

export interface FarmerUser {
  id: string;
  name: string;
  phone: string;
  village: string;
  latitude?: number;
  longitude?: number;
  locationAddress?: string;
  avatar?: string;
}

export interface WeatherCurrent {
  temperature: number; // in °C
  humidity: number; // in %
  windSpeed: number; // in km/h
  rainfall: number; // in mm
  condition: 'Sunny' | 'Partly Cloudy' | 'Cloudy' | 'Rainy' | 'Thunderstorm';
  iconName: string;
  updatedAt: string;
}

export interface DayForecast {
  day: string;
  dayShort: string;
  dayKn: string;
  date: string;
  maxTemp: number;
  minTemp: number;
  humidity: number;
  rainProbability: number;
  condition: string;
  conditionKn: string;
  iconName: string;
}

export interface MandiRecord {
  id: string;
  cropName: string;
  cropNameKn: string;
  category: 'Vegetables' | 'Cereals' | 'Cash Crops' | 'Pulses' | 'Fruits';
  categoryKn: string;
  marketName: string;
  marketNameKn: string;
  district: string;
  districtKn: string;
  state: string;
  minPrice: number; // per quintal
  maxPrice: number;
  modalPrice: number;
  unit: string;
  unitKn: string;
  date: string;
  priceTrend: 'up' | 'down' | 'stable';
  changePercent: number;
}

export interface CropAlertItem {
  id: string;
  title: string;
  titleKn: string;
  type: 'temperature' | 'humidity' | 'rainfall' | 'pest' | 'general';
  severity: 'high' | 'medium' | 'info';
  message: string;
  messageKn: string;
  advice: string[];
  adviceKn: string[];
  date: string;
  affectedCrops: string[];
  affectedCropsKn: string[];
  status: 'active' | 'monitoring' | 'resolved';
}

export interface AgriNewsArticle {
  id: string;
  title: string;
  titleKn: string;
  summary: string;
  summaryKn: string;
  content: string;
  contentKn: string;
  category: 'Schemes' | 'Technology' | 'Markets' | 'Weather' | 'Advisory';
  categoryKn: string;
  date: string;
  readTime: string;
  source: string;
  imageUrl: string;
}

export interface WeatherThresholdConfig {
  HIGH_TEMP_THRESHOLD: number; // Default 32°C
  HIGH_HUMIDITY_THRESHOLD: number; // Default 75%
  HEAVY_RAINFALL_THRESHOLD: number; // Default 35mm
  HIGH_WIND_THRESHOLD: number; // Default 30 km/h
}
