const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItems = document.getElementById('current-weather-items');
const timezone = document.getElementById('timezone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');
const searchbutton = document.getElementById ('search');
const currentInfo = document.querySelector (".current-info");
const fivedayContainer = document.querySelector (".future-forecast");

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const API_Key = '3300dbba9e6e9fc35f6ec213bde7badf';

// setInterval(() => {
//     const time = new Date();
//     const month = time.getMonth();
//     const date = time.getDate();
//     const day = time.getDay();
//     const hour = time.getHours();
//     const hoursInHrFormat = hour >= 13 ? hour % 12 : hour;
//     const minutes = time.getMinutes();
//     const ampm = hour >= 12 ? 'PM' : 'AM';

//     timeEl.innerHTML = `${hoursInHrFormat < 10 ? '0' + hoursInHrFormat : hoursInHrFormat}:${minutes < 10 ? '0' + minutes : minutes} <span id="am-pm">${ampm}</span>`;
//     dateEl.innerHTML = `${days[day]}, ${date} ${months[month]}`;
// }, 1000);

// getWeatherData();

// function getWeatherData() {
//     navigator.geolocation.getCurrentPosition((success) => {
//         let { latitude, longitude } = success.coords;

//         fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_Key}`)
//             .then(res => res.json())
//             .then(data => {
//                 console.log(data);
//                 showWeatherData(data);
//             });
//     });
// }

// function showWeatherData(data) {
//     if (data.current) {
//         let { humidity, pressure, sunrise, sunset, wind_speed } = data.current;

//         timezone.innerHTML = data.timezone;
//         countryEl.innerHTML = data.city.country;

//         currentWeatherItems.innerHTML = '';

//         data.daily.forEach((day, idx) => {
//             if (idx !== 0) {
//                 let weatherIcon = `https://api.openweathermap.org/data/2.5/forecast?lat=${data.city.coord.lat}&lon=${data.city.coord.lon}&appid=${API_Key}`;
//                 let dayName = days[new Date(day.dt * 1000).getDay()];
//                 let dayTemperature = day.temp.day;
//                 let nightTemperature = day.temp.night;

//                 currentWeatherItems.innerHTML += `
//                     <div class="weather-forecast-item">
//                         <img src="${weatherIcon}" alt="weather icon" class="w-icon">
//                         <div class="day">${dayName}</div>
//                         <div id="temp">Day - ${dayTemperature}&#176; F</div>
//                         <div id="temp">Night - ${nightTemperature}&#176; F</div>
//                     </div>`;
//             }
//         });

//         let otherDayForecast = '';
//         data.daily.forEach((day, idx) => {
//             if (idx == 0) {
//                 currentTempEl.innerHTML = `
//                     <img src="https://api.openweathermap.org/data/2.5/forecast?lat=${data.city.coord.lat}&lon=${data.city.coord.lon}&appid=${API_Key}" alt="weather icon" class="w-icon">
//                     <div class="other">
//                         <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
//                         <div id="temp">Day - ${day.temp.day}&#176; F</div>
//                         <div id="temp">Night - ${day.temp.night}&#176; F</div>
//                     </div>`;
//             } else {
//                 otherDayForecast += `
//                     <div class="weather-forecast">
//                         <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
//                         <img src="https://api.openweathermap.org/data/2.5/forecast?lat=${data.city.coord.lat}&lon=${data.city.coord.lon}&appid=${API_Key}" alt="weather icon" class="w-icon">
//                         <div id="temp">Day - ${day.temp.day}&#176; F</div>
//                         <div id="temp">Night - ${day.temp.night}&#176; F</div>
//                     </div>`;
//             }
//         });

//         weatherForecastEl.innerHTML = otherDayForecast;
//     } else {
//         console.error('Error: Missing current weather data!');
//     }
// }


// For the Search Bar

const searchInput = document.getElementById('searchInput');
const searchHistoryContainer = document.getElementById('searchHistory');

// Load search history from local storage
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

// Display search history
// function displaySearchHistory() {
//     searchHistoryContainer.innerHTML = '';
//     searchHistory.forEach(item => {
//         const historyItem = document.createElement('div');
//         historyItem.textContent = item;
//         historyItem.classList.add('history-item');
//         historyItem.addEventListener('click', () => {
//             searchInput.value = item;
//             search();
//         });
//         searchHistoryContainer.appendChild(historyItem);
//     });
// }

// // Save search history to local storage
// function saveSearchHistory() {
//     localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
// }

    
// Make the Search
function search(searchTerm) {

    console.log ("hello",searchTerm)
    if (searchTerm !== '') {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=imperial&appid=${API_Key}`)
            .then(res => res.json())
            .then(data => {
                // Update UI with searched city's weather data
                // ... (similar to showWeatherData)
                console.log (data)
                const currentDate = new Date (data.dt * 1000).toLocaleDateString()
                const currentTime = new Date (data.dt * 1000).toLocaleString().split(",")[1]
                console.log (currentTime)
                const icon = data.weather[0].icon
                const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`
                console.log (currentDate)
                let currentInfocard = `
                <div class="date-container">
                <img src = "${iconUrl}"/>
        <div id="time">
          ${currentTime} 
        </div>
        <div id="date">
          ${currentDate}
        </div>
        <div class="others" id="current-weather-items"> ${data.name}</div>
        <div id="weather-info">
          <div>
            <div>Humidity</div>
            <div>${data.main.humidity}</div>
          </div>
          <div>
          <div>Temperature</div>
          <div>${data.main.temp}</div>
        </div>
          <div>
            <div id="weather-info">Pressure</div>
            <div>${data.main.pressure}</div>
          </div>
          <div>
            <div id="weather-info">Wind Speed</div>
            <div>${data.wind.speed}</div>
          </div>
        </div>
      </div>
                
                
                `
                currentInfo.innerHTML = currentInfocard
                const lat = data.coord.lat
                const lon = data.coord.lon
                fetch (`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_Key}`)
                .then (function(response){
                    return response.json ()

                }) .then (function(fivedata){
                    const fivedayarray = fivedata.list.filter(day=>day.dt_txt.includes("12:00:00"))
                    console.log (fivedayarray)
                    let fivedaycard = ""
                    for (var i = 0; i< fivedayarray.length;i++) {
                        fivedaycard +=`
                
                <div class="date-container">
                <img src = "${iconUrl}"/>
        <div id="time">
          ${currentTime} 
        </div>
        <div id="date">
          ${currentDate}
        </div>
      <div class="other">
        <div class="day"></div>
        <div id="temp">${fivedayarray[i].main.temp}</div>
        <div id="humidity">${fivedayarray[i].main.humidity}</div>
        <div id="windspeed">${fivedayarray[i].wind.speed}</div>
         
      </div>
    </div>
                        
                        `
                        fivedayContainer.innerHTML = fivedaycard
                    }
                })
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                // Handle error gracefully, e.g., display an error message
            });

        // Update search history
        if (!searchHistory.includes(searchTerm)) {
            searchHistory.push(searchTerm);
            // saveSearchHistory();
            // displaySearchHistory();
        }

        // Clear the search input
        searchInput.value = '';
    }
}
searchbutton.addEventListener("click",function(event){
    event.preventDefault()
    console.log ("click")
    const searchTerm = searchInput.value.trim();
    search(searchTerm)
})
// Initial display of search history
// displaySearchHistory();
