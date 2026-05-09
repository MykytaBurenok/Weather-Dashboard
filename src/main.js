import './styles.css';
import { refs } from './js/refs.js';
import { fetchCoordinates, fetchWeather } from './js/api.js';
import {
  renderCurrentWeather,
  renderHourlyWeather,
  renderDailyWeather,
  setStatus,
} from './js/render.js';

async function handleSearch(event) {
  event.preventDefault();

  const city = refs.cityInput.value.trim();

  if (!city) {
    setStatus('Please enter a city name', 'error');
    return;
  }

  try {
    setStatus('Searching weather data...');

    const cityData = await fetchCoordinates(city);
    const weatherData = await fetchWeather(
      cityData.latitude,
      cityData.longitude
    );

    renderCurrentWeather(cityData, weatherData);
    renderHourlyWeather(weatherData);
    renderDailyWeather(weatherData);

    setStatus(`Weather loaded for ${cityData.name}`, 'success');
    refs.searchForm.reset();
  } catch (error) {
    setStatus(error.message, 'error');
  }
}

refs.searchForm.addEventListener('submit', handleSearch);

refs.locationButton.addEventListener('click', handleCurrentLocation);

function handleCurrentLocation() {
  if (!navigator.geolocation) {
    setStatus('Geolocation is not supported by your browser', 'error');
    return;
  }

  refs.locationButton.disabled = true;
  refs.locationButton.textContent = 'Loading...';
  setStatus('Getting your location...');

  navigator.geolocation.getCurrentPosition(
    async position => {
      try {
        const { latitude, longitude } = position.coords;

        const weatherData = await fetchWeather(latitude, longitude);

        const cityData = {
          name: 'Your location',
          country: '',
          latitude,
          longitude,
        };

        renderCurrentWeather(cityData, weatherData);
        renderHourlyWeather(weatherData);
        renderDailyWeather(weatherData);

        setStatus('Weather loaded for your current location', 'success');
      } catch (error) {
        setStatus(
          error.message || 'Failed to load weather for your location',
          'error'
        );
      } finally {
        refs.locationButton.disabled = false;
        refs.locationButton.textContent = 'Use my location';
      }
    },
    error => {
      setStatus(getGeolocationErrorMessage(error), 'error');
      refs.locationButton.disabled = false;
      refs.locationButton.textContent = 'Use my location';
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    }
  );
}

const themeToggleBtn = document.getElementById('theme-toggle');

let savedTheme = null;

try {
  savedTheme = localStorage.getItem('theme');
} catch (error) {
  savedTheme = null;
}

if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
} else {
  document.documentElement.setAttribute('data-theme', 'dark');
}

updateThemeButton();

themeToggleBtn.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', newTheme);

  try {
    localStorage.setItem('theme', newTheme);
  } catch (error) {}

  updateThemeButton();
});

function updateThemeButton() {
  const currentTheme = document.documentElement.getAttribute('data-theme');

  if (currentTheme === 'dark') {
    themeToggleBtn.textContent = '☀️';
  } else {
    themeToggleBtn.textContent = '🌙';
  }
}
