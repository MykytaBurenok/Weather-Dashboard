import { refs } from './refs.js';
import {
  getWeatherDescription,
  getWeatherIcon,
  formatHour,
  formatDay,
} from './helpers.js';

export function renderCurrentWeather(city, weatherData) {
  const current = weatherData.current;

  refs.cityName.textContent = `${city.name}, ${city.country}`;
  refs.currentTemp.textContent = `${Math.round(current.temperature_2m)}°`;
  refs.currentDesc.textContent = getWeatherDescription(current.weather_code);
  refs.feelsLike.textContent = `${Math.round(current.apparent_temperature)}°`;
  refs.windSpeed.textContent = `${Math.round(current.wind_speed_10m)} km/h`;
  refs.humidity.textContent = `${current.relative_humidity_2m}%`;
  refs.coordinates.textContent = `${city.latitude.toFixed(2)}, ${city.longitude.toFixed(2)}`;
  refs.currentTime.textContent = formatHour(current.time);
}

export function renderHourlyWeather(weatherData) {
  const currentTime = weatherData.current.time;
  const startIndex = weatherData.hourly.time.findIndex(
    time => time === currentTime
  );

  const safeStartIndex = startIndex >= 0 ? startIndex : 0;

  const times = weatherData.hourly.time.slice(
    safeStartIndex,
    safeStartIndex + 6
  );
  const temps = weatherData.hourly.temperature_2m.slice(
    safeStartIndex,
    safeStartIndex + 6
  );
  const codes = weatherData.hourly.weather_code.slice(
    safeStartIndex,
    safeStartIndex + 6
  );

  refs.hourlyList.innerHTML = times
    .map(
      (time, index) => `
        <li class="hourly-item">
          <span class="hourly-item__time">${formatHour(time)}</span>
          <span class="hourly-item__icon">${getWeatherIcon(codes[index])}</span>
          <span class="hourly-item__temp">${Math.round(temps[index])}°</span>
        </li>
      `
    )
    .join('');
}

export function renderDailyWeather(weatherData) {
  const days = weatherData.daily.time;
  const maxTemps = weatherData.daily.temperature_2m_max;
  const minTemps = weatherData.daily.temperature_2m_min;
  const codes = weatherData.daily.weather_code;

  refs.dailyList.innerHTML = days
    .map(
      (day, index) => `
        <li class="daily-item">
          <span class="daily-item__day">${formatDay(day)}</span>
          <span class="daily-item__icon">${getWeatherIcon(codes[index])}</span>
          <span class="daily-item__range">${Math.round(maxTemps[index])}° / ${Math.round(minTemps[index])}°</span>
        </li>
      `
    )
    .join('');
}

export function setStatus(message, type = 'default') {
  refs.statusMessage.textContent = message;

  if (type === 'error') {
    refs.statusMessage.style.color = '#f87171';
    return;
  }

  if (type === 'success') {
    refs.statusMessage.style.color = '#67e8f9';
    return;
  }

  refs.statusMessage.style.color = '';
}
