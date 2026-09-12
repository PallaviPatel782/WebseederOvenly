import Geolocation from '@react-native-community/geolocation';

export interface LocationAddressResult {
  displayName: string;
  houseNo: string;
  roadArea: string;
  landmark: string;
  cityState: string;
  lat: number;
  lon: number;
}

export const getCurrentCoordinates = (): Promise<{ lat: number; lon: number }> => {
  return new Promise((resolve) => {
    // Tier 1: Try High Accuracy (GPS/Fused Location) with 15s timeout
    Geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (err1) => {
        console.warn('High accuracy location timeout/error:', err1);
        // Tier 2: Try Low Accuracy (Network provider)
        Geolocation.getCurrentPosition(
          (pos2) => {
            resolve({
              lat: pos2.coords.latitude,
              lon: pos2.coords.longitude,
            });
          },
          (err2) => {
            console.warn('Low accuracy location error, trying IP location:', err2);
            // Tier 3: Try IP-based location service
            fetch('https://ipapi.co/json/')
              .then((res) => res.json())
              .then((data) => {
                if (data && typeof data.latitude === 'number' && typeof data.longitude === 'number') {
                  resolve({ lat: data.latitude, lon: data.longitude });
                } else {
                  // Tier 4: Default coordinates (Bangalore, India)
                  resolve({ lat: 12.9716, lon: 77.5946 });
                }
              })
              .catch(() => {
                resolve({ lat: 12.9716, lon: 77.5946 });
              });
          },
          { enableHighAccuracy: false, timeout: 15000, maximumAge: 60000 }
        );
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 }
    );
  });
};

export const fetchAddressFromOpenStreetMap = async (
  lat: number,
  lon: number
): Promise<LocationAddressResult> => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`,
    {
      headers: {
        'User-Agent': 'WebseederOvenlyApp/1.0',
        'Accept-Language': 'en',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`OpenStreetMap Nominatim status: ${response.status}`);
  }

  const data = await response.json();
  const addressObj = data.address || {};

  const displayName = data.display_name || '';

  // Extract house/flat number or plus code
  const houseNo =
    addressObj.house_number ||
    addressObj.building ||
    addressObj.amenity ||
    '';

  // Extract road / area
  const roadParts = [
    addressObj.road || addressObj.street || addressObj.footway || '',
    addressObj.suburb ||
      addressObj.neighbourhood ||
      addressObj.village ||
      addressObj.city_district ||
      '',
  ].filter(Boolean);
  const roadArea = roadParts.join(', ');

  // Extract city, state, postal code, country
  const cityStateParts = [
    addressObj.county || addressObj.city || addressObj.town || '',
    addressObj.state || '',
    addressObj.postcode || '',
    addressObj.country || '',
  ].filter(Boolean);
  const cityState = cityStateParts.join(', ');

  const landmark =
    addressObj.amenity || addressObj.shop || addressObj.landmark || '';

  return {
    displayName,
    houseNo,
    roadArea,
    landmark,
    cityState,
    lat,
    lon,
  };
};
