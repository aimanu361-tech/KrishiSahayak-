import { CropAlertItem } from '../types';

export const SAMPLE_CROP_ALERTS: CropAlertItem[] = [
  {
    id: 'alert_01',
    title: 'High Temperature & Heat Stress Warning',
    titleKn: 'ಹೆಚ್ಚಿನ ತಾಪಮಾನ ಮತ್ತು ಶಾಖದ ಒತ್ತಡದ ಎಚ್ಚರಿಕೆ',
    type: 'temperature',
    severity: 'high',
    message: 'Ambient field temperature has reached 33.4°C, exceeding the 32°C safety threshold for flowering crops.',
    messageKn: 'ಹೊಲದ ವಾತಾವರಣದ ತಾಪಮಾನವು 33.4°C ತಲುಪಿದ್ದು, ಹೂಬಿಡುವ ಬೆಳೆಗಳ 32°C ಸುರಕ್ಷತಾ ಮಿತಿಯನ್ನು ಮೀರಿದೆ.',
    advice: [
      'Schedule drip or light sprinkler irrigation during early morning (6:00 AM - 8:30 AM) or after sunset.',
      'Apply organic mulch (paddy straw or coir pith) around fruit and vegetable plants to conserve soil moisture.',
      'Avoid foliar chemical sprays during peak afternoon hours (11:30 AM - 3:30 PM).',
    ],
    adviceKn: [
      'ಬೆಳಿಗ್ಗೆ ಬೇಗನೆ (6:00 - 8:30) ಅಥವಾ ಸೂರ್ಯಾಸ್ತದ ನಂತರ ತುಂತುರು/ಹನಿ ನೀರಾವರಿ ಒದಗಿಸಿ.',
      'ಮಣ್ಣಿನ ತೇವಾಂಶವನ್ನು ಕಾಪಾಡಲು ಹಣ್ಣು ಮತ್ತು ತರಕಾರಿ ಗಿಡಗಳ ಬುಡಕ್ಕೆ ಒಣಹುಲ್ಲು ಅಥವಾ ತೆಂಗಿನ ನಾರಿನ ತ್ಯಾಜ್ಯದಿಂದ ಹೊದಿಕೆ ಹಾಕಿ.',
      'ಮಧ್ಯಾಹ್ನದ ಬಿರುಬಿಸಿಲಿನಲ್ಲಿ (11:30 - 3:30) ಯಾವುದೇ ಎಲೆ ಸಿಂಪಡಣೆ ರಾಸಾಯನಿಕಗಳನ್ನು ಬಳಸಬೇಡಿ.',
    ],
    date: '25 Oct 2026, 09:30 AM',
    affectedCrops: ['Tomato', 'Capsicum', 'Paddy in panicle stage', 'Pulses'],
    affectedCropsKn: ['ಟೊಮೆಟೊ', 'ದಪ್ಪ ಮೆಣಸಿನಕಾಯಿ', 'ತೆನೆ ಹಂತದ ಭತ್ತ', 'ದ್ವಿದಳ ಧಾನ್ಯಗಳು'],
    status: 'active',
  },
  {
    id: 'alert_02',
    title: 'High Humidity Fungal Pathogen Watch',
    titleKn: 'ಅಧಿಕ ತೇವಾಂಶ - ಶಿಲೀಂಧ್ರ ರೋಗಗಳ ನಿಗಾ ಎಚ್ಚರಿಕೆ',
    type: 'humidity',
    severity: 'high',
    message: 'Relative humidity is currently at 78% (exceeding 75% threshold) with low night winds.',
    messageKn: 'ರಾತ್ರಿಯ ವೇಳೆ ಕಡಿಮೆ ಗಾಳಿಯೊಂದಿಗೆ ಸಾಪೇಕ್ಷ ತೇವಾಂಶವು 78% ರಷ್ಟಿದ್ದು (75% ಮಿತಿಯನ್ನು ಮೀರಿದೆ).',
    advice: [
      'Inspect underside of leaves for early signs of downy mildew and powdery mildew spores.',
      'Ensure proper drainage channels to prevent stagnating moisture around root zones.',
      'Prophylactic spray of copper oxychloride or bio-fungicide (Trichoderma viride) recommended if clouds persist.',
    ],
    adviceKn: [
      'ಬೂದಿ ರೋಗ ಮತ್ತು ಎಲೆ ಚುಕ್ಕೆ ರೋಗದ ಆರಂಭಿಕ ಲಕ್ಷಣಗಳಿಗಾಗಿ ಎಲೆಗಳ ಕೆಳಭಾಗವನ್ನು ಪರಿಶೀಲಿಸಿ.',
      'ಬೇರಿನ ಭಾಗದಲ್ಲಿ ನೀರು ನಿಲ್ಲದಂತೆ ಕಾಲುವೆಗಳನ್ನು ಸ್ವಚ್ಛವಾಗಿಡಿ.',
      'ಮೋಡ ಮುಸುಕಿದ ವಾತಾವರಣ ಮುಂದುವರಿದರೆ ತಾಮ್ರದ ಆಕ್ಸಿಕ್ಲೋರೈಡ್ ಅಥವಾ ಜೈವಿಕ ಶಿಲೀಂಧ್ರನಾಶಕ (ಟ್ರೈಕೋಡರ್ಮಾ) ಸಿಂಪಡಿಸಿ.',
    ],
    date: '25 Oct 2026, 07:15 AM',
    affectedCrops: ['Paddy', 'Grapes', 'Pomegranate', 'Green Chilli'],
    affectedCropsKn: ['ಭತ್ತ', 'ದ್ರಾಕ್ಷಿ', 'ದಾಳಿಂಬೆ', 'ಹಸಿ ಮೆಣಸಿನಕಾಯಿ'],
    status: 'active',
  },
  {
    id: 'alert_03',
    title: 'Isolated Afternoon Rain & Wind Gusts',
    titleKn: 'ಮಧ್ಯಾಹ್ನ ಚದುರಿದ ಮಳೆ ಮತ್ತು ಬಿರುಗಾಳಿ ಸಾಧ್ಯತೆ',
    type: 'rainfall',
    severity: 'medium',
    message: 'Radar indicates 40% chance of localized thunder shower with winds up to 22 km/h over south-interior taluks.',
    messageKn: 'ದಕ್ಷಿಣ ಒಳನಾಡಿನ ತಾಲ್ಲೂಕುಗಳಲ್ಲಿ 22 ಕಿಮೀ/ಗಂ ವೇಗದ ಗಾಳಿಯೊಂದಿಗೆ 40% ಚದುರಿದ ಮಳೆಯಾಗುವ ಸಾಧ್ಯತೆಯಿದೆ.',
    advice: [
      'Provide staking support for young banana pseudostems and tall papaya saplings.',
      'Safeguard harvested grains lying on open drying yards under waterproof tarpaulins.',
      'Suspend open fertilizer broadcasting until post-shower soil moisture stabilizes.',
    ],
    adviceKn: [
      'ಎಳೆಯ ಬಾಳೆ ಗಿಡಗಳು ಮತ್ತು ಎತ್ತರದ ಪರಂಗಿ ಗಿಡಗಳಿಗೆ ಆಸರೆ ಕೋಲುಗಳನ್ನು ಕಟ್ಟಿ ಬೆಂಬಲ ನೀಡಿ.',
      'ಕಣದಲ್ಲಿ ಒಣಗಲು ಹಾಕಿರುವ ಕೊಯ್ಲು ಮಾಡಿದ ಧಾನ್ಯಗಳನ್ನು ಟಾರ್ಪಲಿನ್‌ಗಳಿಂದ ಮುಚ್ಚಿ ರಕ್ಷಿಸಿ.',
      'ಮಳೆಯು ನಿಂತು ಮಣ್ಣು ಹದವಾಗುವವರೆಗೆ ತೆರೆದ ಹೊಲದಲ್ಲಿ ರಸಗೊಬ್ಬರ ಎರಚುವುದನ್ನು ಮುಂದೂಡಿ.',
    ],
    date: '24 Oct 2026, 04:00 PM',
    affectedCrops: ['Banana', 'Papaya', 'Open Yard Grain'],
    affectedCropsKn: ['ಬಾಳೆ', 'ಪರಂಗಿ', 'ಕಣದಲ್ಲಿರುವ ಧಾನ್ಯಗಳು'],
    status: 'monitoring',
  },
  {
    id: 'alert_04',
    title: 'Pest Scouting: Fall Armyworm (FAW) on Late Maize',
    titleKn: 'ಕೀಟ ತಪಾಸಣೆ: ತಡವಾಗಿ ಬಿತ್ತಿದ ಮೆಕ್ಕೆಜೋಳದಲ್ಲಿ ಲದ್ದಿ ಹುಳು ಬಾಧೆ',
    type: 'pest',
    severity: 'medium',
    message: 'Entomological station reports early instar FAW larvae in 20-30 day old maize crops in neighbouring plots.',
    messageKn: 'ನೆರೆಹೊರೆಯ ಜಮೀನುಗಳಲ್ಲಿ 20-30 ದಿನಗಳ ಮೆಕ್ಕೆಜೋಳದ ಬೆಳೆಗಳಲ್ಲಿ ಲದ್ದಿ ಹುಳುಗಳ ಬಾಧೆ ಕಂಡುಬಂದಿದೆ.',
    advice: [
      'Install pheromone traps @ 5 traps per acre for pest population monitoring.',
      'Apply neem seed kernel extract (NSKE 5%) or Bacillus thuringiensis (Bt) at early whorl stage.',
      'Place fine dry sand or sawdust with neem powder into central plant whorls.',
    ],
    adviceKn: [
      'ಕೀಟಗಳ ಸಂಖ್ಯೆಯನ್ನು ತಿಳಿಯಲು ಎಕರೆಗೆ 5 ರಂತೆ ಮೋಹಕ ಬಲೆಗಳನ್ನು ಅಳವಡಿಸಿ.',
      'ಆರಂಭಿಕ ಹಂತದಲ್ಲಿ ಬೇವಿನ ಬೀಜದ ಕಷಾಯ (NSKE 5%) ಅಥವಾ ಜೈವಿಕ ಬ್ಯಾಸಿಲಸ್ ಸಿಂಪಡಿಸಿ.',
      'ಸುಳಿಯ ಒಳಗೆ ಬೇವಿನ ಪುಡಿ ಮಿಶ್ರಿತ ಮರಳು ಅಥವಾ ಮರದ ಪುಡಿಯನ್ನು ಉದುರಿಸಿ.',
    ],
    date: '23 Oct 2026, 11:00 AM',
    affectedCrops: ['Maize / Corn', 'Sorghum'],
    affectedCropsKn: ['ಮೆಕ್ಕೆಜೋಳ', 'ಜೋಳ'],
    status: 'active',
  },
];

export const getCropAlerts = (severity?: string): CropAlertItem[] => {
  if (!severity || severity === 'all') return SAMPLE_CROP_ALERTS;
  return SAMPLE_CROP_ALERTS.filter((item) => item.severity === severity);
};
