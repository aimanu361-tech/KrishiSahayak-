export interface GeolocationResult {
  latitude: number;
  longitude: number;
  accuracy: number;
  village?: string;
  district?: string;
  state?: string;
  fullAddress?: string;
}

export interface GeolocationError {
  code: 'PERMISSION_DENIED' | 'POSITION_UNAVAILABLE' | 'TIMEOUT' | 'NOT_SUPPORTED' | 'GEOCODING_FAILED';
  message: string;
}

export const detectBrowserLocation = async (): Promise<GeolocationResult> => {
  if (!navigator.geolocation) {
    throw {
      code: 'NOT_SUPPORTED',
      message: 'Geolocation is not supported by your browser.',
    } as GeolocationError;
  }

  const position = await new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      resolve,
      (err) => {
        let code: GeolocationError['code'] = 'POSITION_UNAVAILABLE';
        if (err.code === err.PERMISSION_DENIED) {
          code = 'PERMISSION_DENIED';
        } else if (err.code === err.TIMEOUT) {
          code = 'TIMEOUT';
        }
        reject({
          code,
          message: err.message || 'Failed to detect location.',
        } as GeolocationError);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  });

  const { latitude, longitude, accuracy } = position.coords;

  // Real reverse geocoding using OpenStreetMap Nominatim with a brief timeout
  let village = '';
  let district = '';
  let state = '';
  let fullAddress = '';

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
      {
        headers: {
          'Accept-Language': 'en',
          'User-Agent': 'KrishiSahayak-AgricultureApp/1.0',
        },
        signal: controller.signal,
      }
    );
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const addr = data.address || {};
      village = addr.village || addr.suburb || addr.town || addr.city || addr.county || 'Rural Farmland';
      district = addr.state_district || addr.county || '';
      state = addr.state || '';
      fullAddress = data.display_name || `${village}, ${state}`;
    }
  } catch (err) {
    // Reverse geocoding failed or timed out; we still have valid coordinates!
    console.warn('Reverse geocoding fetch failed or timed out:', err);
    village = 'Detected Farm Coordinates';
    fullAddress = `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`;
  }

  return {
    latitude: Number(latitude.toFixed(6)),
    longitude: Number(longitude.toFixed(6)),
    accuracy: Math.round(accuracy),
    village,
    district,
    state,
    fullAddress,
  };
};
