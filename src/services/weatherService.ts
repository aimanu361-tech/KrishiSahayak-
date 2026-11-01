import { WeatherCurrent, DayForecast, WeatherThresholdConfig } from '../types';

export const WEATHER_THRESHOLDS: WeatherThresholdConfig = {
  HIGH_TEMP_THRESHOLD: 32, // °C
  HIGH_HUMIDITY_THRESHOLD: 75, // %
  HEAVY_RAINFALL_THRESHOLD: 35, // mm
  HIGH_WIND_THRESHOLD: 30, // km/h
};

export const getCurrentWeather = (userVillage?: string): WeatherCurrent => {
  return {
    temperature: 33.4, // Exceeds 32°C threshold to demonstrate real-time high-heat advisory
    humidity: 78, // Exceeds 75% threshold to demonstrate humidity blight alert
    windSpeed: 14.5,
    rainfall: 4.2,
    condition: 'Partly Cloudy',
    iconName: 'CloudSun',
    updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
};

export const getSevenDayForecast = (): DayForecast[] => {
  return [
    {
      day: 'Today',
      dayShort: 'Sun',
      dayKn: 'ಇಂದು',
      date: 'Oct 25',
      maxTemp: 33.4,
      minTemp: 22.1,
      humidity: 78, // High humidity
      rainProbability: 25,
      condition: 'Partly Sunny',
      conditionKn: 'ಭಾಗಶಃ ಬಿಸಿಲು',
      iconName: 'SunMedium',
    },
    {
      day: 'Monday',
      dayShort: 'Mon',
      dayKn: 'ಸೋಮವಾರ',
      date: 'Oct 26',
      maxTemp: 34.0,
      minTemp: 23.0,
      humidity: 82, // High humidity
      rainProbability: 40,
      condition: 'Afternoon Rain',
      conditionKn: 'ಮಧ್ಯಾಹ್ನ ಮಳೆ',
      iconName: 'CloudRain',
    },
    {
      day: 'Tuesday',
      dayShort: 'Tue',
      dayKn: 'ಮಂಗಳವಾರ',
      date: 'Oct 27',
      maxTemp: 31.5,
      minTemp: 21.8,
      humidity: 76,
      rainProbability: 60,
      condition: 'Scattered Showers',
      conditionKn: 'ಚದುರಿದ ಮಳೆ',
      iconName: 'CloudDrizzle',
    },
    {
      day: 'Wednesday',
      dayShort: 'Wed',
      dayKn: 'ಬುಧವಾರ',
      date: 'Oct 28',
      maxTemp: 30.2,
      minTemp: 21.0,
      humidity: 68,
      rainProbability: 20,
      condition: 'Clear Sky',
      conditionKn: 'ಸ್ವಚ್ಛ ಆಕಾಶ',
      iconName: 'Sun',
    },
    {
      day: 'Thursday',
      dayShort: 'Thu',
      dayKn: 'ಗುರುವಾರ',
      date: 'Oct 29',
      maxTemp: 31.0,
      minTemp: 22.0,
      humidity: 65,
      rainProbability: 15,
      condition: 'Sunny & Pleasant',
      conditionKn: 'ಬಿಸಿಲು ಮತ್ತು ಆಹ್ಲಾದಕರ',
      iconName: 'Sun',
    },
    {
      day: 'Friday',
      dayShort: 'Fri',
      dayKn: 'ಶುಕ್ರವಾರ',
      date: 'Oct 30',
      maxTemp: 32.8,
      minTemp: 22.5,
      humidity: 71,
      rainProbability: 30,
      condition: 'Cloudy',
      conditionKn: 'ಮೋಡ ಕವಿದ ವಾತಾವರಣ',
      iconName: 'Cloud',
    },
    {
      day: 'Saturday',
      dayShort: 'Sat',
      dayKn: 'ಶನಿವಾರ',
      date: 'Oct 31',
      maxTemp: 33.2,
      minTemp: 23.1,
      humidity: 79,
      rainProbability: 45,
      condition: 'Thunder Showers',
      conditionKn: 'ಗುಡುಗು ಸಹಿತ ಮಳೆ',
      iconName: 'CloudLightning',
    },
  ];
};
