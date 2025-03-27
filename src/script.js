
//require('dotenv').config();

//const openWeather_apiKey = process.env.OPEN_WEATHER_API_KEY;


const openWeather_apiKey = 'a028b132d6ba934de2daf58ff4577283';

const displayedCity = document.getElementById('displayedCity')
const weatherContainer = document.getElementById('weatherFound');
const weatherDescription = document.getElementById('description');
const weatherName = document.getElementById('weather');
const weatherIcon = document.getElementById('icon');
const imageCreated = document.getElementById('weather-image');
const errorMessage = document.getElementById('error');
const temperature = document.getElementById('current-temperature');
const humidity = document.getElementById('current-humidity');


function displayWeather(city='Paris'){ 
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeather_apiKey}` ;
    fetch(weatherApiUrl)
    .then(res => res.json())
    .then(data => {
                
        let searchCityWeatherForecast = document.getElementById('search-city-weather-forecast');     
        data.weather.forEach(element => {
            
            searchCityWeatherForecast.textContent = `${city} 5 Day Weather Forecast`;
            displayedCity.textContent = city;
            weatherName.textContent = element.main;

            imageCreated.src = `https://openweathermap.org/img/wn/${element.icon}@2x.png`;
                        
            weatherDescription.textContent = element.description; 
            error.classList.add('hidden');
            
            })            
                temperature.textContent = parseFloat((data.main.temp - 273.15).toFixed(2));
                humidity.textContent = data.main.humidity;
            
    }).catch(error => {
        console.log(error.message);
        console.log('I am here');
        
    })

}

function allowingSearching(){
    const form = document.getElementById('my-form');
    const formInput = document.getElementById('city');

    form.addEventListener('submit', function(e){
        e.preventDefault();
        const currentCity = formInput.value;
        displayWeather(currentCity);
    })
}
let currentCityPrediction_weatherApiUrl;

function currentCity(){
    navigator.geolocation.watchPosition(successCallback, errorCallback);
    
    function successCallback(position){
        
        // Getting the longitude and latitude
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;     
                
        const currentCity_WeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeather_apiKey}`
        
        fetch(currentCity_WeatherApiUrl)
        .then(res => res.json())
        .then(data => {
            let currentCity = document.getElementById('currentCity');
            let currentCityWeatherImage = document.getElementById('current-city-weather-image');
            let currentWeather = document.getElementById('current-city-weather');
            let currentCityDescription = document.getElementById('current-city-description');
            let currentCityTemperature = document.getElementById('current-city-temperature')
            let currentCityHumidity = document.getElementById('current-city-humidity');
            let currentCityWeatherForecast = document.getElementById('current-city-search-forecast');

            currentCityWeatherForecast.textContent = `${data.name} 5 Day Weather Forecast`;
            currentCity.textContent = data.name;  
            for(let element of data.weather){
                    
                currentWeather.textContent = element.main;
    
                currentCityWeatherImage.src = `https://openweathermap.org/img/wn/${element.icon}@2x.png`;
                            
                currentCityDescription.textContent = element.description; 
                
            }
                           
                    currentCityTemperature.textContent = parseFloat((data.main.temp - 273.15).toFixed(2));
                    currentCityHumidity.textContent = data.main.humidity;
        }        
        )        
    }
    function errorCallback(position){
        console.log(position);        
    }    
    
}   

function updateClock() {
    const now = new Date();
    document.getElementById("clock").textContent = now.toLocaleTimeString();
    const date = document.getElementById('date');    
    const [formattedDate, formattedTime] = now.toLocaleString().split(',');
    date.textContent = formattedDate; 
        
} 
setInterval(updateClock, 1000);



function main(){
    displayWeather();
    allowingSearching();
    currentCity();
    updateClock(); 
}

document.addEventListener('DOMContentLoaded', function(){
    main()
})


