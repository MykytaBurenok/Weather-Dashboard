const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

export async function fetchCoordinates(city) {
  const params = new URLSearchParams({
    name: city,
    count: '1',
    language: 'en',
    format: 'json',
  });

  const response = await fetch(`${GEOCODING_URL}?${params}`);
  if (!response.ok) {
    throw new Error('Failed to fetch city coordinates');
  }

  const data = await response.json();

  if (!data.results?.length) {
    throw new Error('City not found');
  }

  const cityData = data.results[0];

  return {
    name: cityData.name,
    country: cityData.country,
    latitude: cityData.latitude,
    longitude: cityData.longitude,
  };
}

export async function fetchWeather(latitude, longitude) {
  if (latitude == null || longitude == null) {
    throw new Error('Latitude and longitude are required');
  }

  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current:
      'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m',
    hourly: 'temperature_2m,weather_code',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    timezone: 'auto',
    forecast_days: '7',
  });

  const response = await fetch(`${WEATHER_URL}?${params}`);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  const data = await response.json();

  if (!data.current || !data.hourly || !data.daily) {
    throw new Error('Incomplete weather data received');
  }

  return {
    current: data.current,
    hourly: data.hourly,
    daily: data.daily,
    timezone: data.timezone,
  };
}
