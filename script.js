const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItems = document.getElementById('current-weather-items');
const timezone = document.getElementById('timezone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const API_Key = 'e05bf99b4ea4f2b50aa6227820271560';

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursInHrFormat = hour >= 13 ? hour % 12 : hour;
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM';

    timeEl.innerHTML = `${hoursInHrFormat < 10 ? '0' + hoursInHrFormat : hoursInHrFormat}:${minutes < 10 ? '0' + minutes : minutes} <span id="am-pm">${ampm}</span>`;
    dateEl.innerHTML = `${days[day]}, ${date} ${months[month]}`;
}, 1000);

getWeatherData();

function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {
        let { latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_Key}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                showWeatherData(data);
            });
    });
}

function showWeatherData(data) {
    let { humidity, pressure, sunrise, sunset, wind_speed } = data.current;
   
    timezone.innerHTML = data.timezone;
    countryEl.innerHTML = data.lat + 'N' + data.lon + 'E';
   
    currentWeatherItems.innerHTML = '';

    data.daily.forEach((day, idx) => {
        if (idx !== 0) {
            let weatherIcon = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
            let dayName = days[new Date(day.dt * 1000).getDay()];
            let dayTemperature = day.temp.day;
            let nightTemperature = day.temp.night;

            currentWeatherItems.innerHTML += `
                <div class="weather-forecast-item">
                    <img src="${weatherIcon}" alt="weather icon" class="w-icon">
                    <div class="day">${dayName}</div>
                    <div id="temp">Day - ${dayTemperature}&#176; F</div>
                    <div id="temp">Night - ${nightTemperature}&#176; F</div>
                </div>`;
        }
    });

    let otherDayForecast = '';
    data.daily.forEach((day, idx) => {
        if (idx == 0) {
            currentTempEl.innerHTML = `
                <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
                <div class="other">
                    <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
                    <div id="temp">Day - ${day.temp.day}&#176; F</div>
                    <div id="temp">Night - ${day.temp.night}&#176; F</div>
                </div>`;
        } else {
            otherDayForecast += `
                <div class="weather-forecast">
                    <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
                    <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                    <div id="temp">Day - ${day.temp.day}&#176; F</div>
                    <div id="temp">Night - ${day.temp.night}&#176; F</div>
                </div>`;
        }
    });

    weatherForecastEl.innerHTML = otherDayForecast;
}

// For the Search Bar

const searchInput = document.getElementById('searchInput');
const searchHistoryContainer = document.getElementById('searchHistory');

// Load search history from local storage
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

// Display search history
function displaySearchHistory() {
  searchHistoryContainer.innerHTML = '';
  searchHistory.forEach(item => {
    const historyItem = document.createElement('div');
    historyItem.textContent = item;
    historyItem.classList.add('history-item');
    historyItem.addEventListener('click', () => {
      searchInput.value = item;
      search();
    });
    searchHistoryContainer.appendChild(historyItem);
  });
}

// Save search history to local storage
function saveSearchHistory() {
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

// Make the Search
function search() {
  const searchTerm = searchInput.value.trim();
  if (searchTerm !== '') {
    // Perform the actual search logic here

    // Update search history
    if (!searchHistory.includes(searchTerm)) {
      searchHistory.push(searchTerm);
      saveSearchHistory();
      displaySearchHistory();
    }

    // Clear the search input
    searchInput.value = '';
  }
}

// Initial display of search history
displaySearchHistory();
