export function getWeatherDescription(code) {
  const descriptions = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    80: 'Rain showers',
    81: 'Heavy rain showers',
    82: 'Violent rain showers',
    95: 'Thunderstorm',
  };

  return descriptions[code] || 'Unknown weather';
}

export function getWeatherIcon(code) {
  const icons = {
    0: '☀️',
    1: '🌤️',
    2: '⛅',
    3: '☁️',
    45: '🌫️',
    48: '🌫️',
    51: '🌦️',
    53: '🌦️',
    55: '🌦️',
    61: '🌧️',
    63: '🌧️',
    65: '🌧️',
    71: '🌨️',
    73: '🌨️',
    75: '❄️',
    80: '🌦️',
    81: '🌧️',
    82: '⛈️',
    95: '⛈️',
  };

  return icons[code] || '🌍';
}

export function formatHour(dateString) {
  return new Date(dateString).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatDay(dateString) {
  return new Date(dateString).toLocaleDateString('en-GB', {
    weekday: 'short',
  });
}
