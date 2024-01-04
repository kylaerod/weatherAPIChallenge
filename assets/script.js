const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItems = document.getElementById('current-weather-items');
const timezone = document.getElementById('timezone');
const countryEl =document.getElementById('country');
const weatherForecastEl =document.getElementById('weather-forecast');
const currentTempEl =document.getElementById('current-temp');


const days = {'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'}
const months = {'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'}

const API_Key = 'e05bf99b4ea4f2b50aa6227820271560';

setInterval{() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursInHrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hours >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = hoursIn12HrFormat + ':' + minutes + ''+ <span 
    id="am-pm">$(ampm)</span>$

    dateEl.innerHTML = days[day] + ',' + date+ ' '+ months[month]

}, 1000};

getWeatherData ()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition(success)=> {

        let {latitude, longitude} = success.coords;

        fetch ('https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units-metric&appid=${API_key}').then(res => res.json()).then(data => {

        console.log(data)
        showWeatherData(data);
        })

    }
}

function  showWeatherData(data){
    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;
    

}
