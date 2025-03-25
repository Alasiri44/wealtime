
//require('dotenv').config();

//const openWeather_apiKey = process.env.OPEN_WEATHER_API_KEY;


const openWeather_apiKey = 'a028b132d6ba934de2daf58ff4577283';

const displayedCity = document.getElementById('displayedCity')
const weatherContainer = document.getElementById('weatherFound');
const weatherDescription = document.getElementById('description');
const weatherName = document.getElementById('weather');
const weatherIcon = document.getElementById('icon');
const imageCreated = document.getElementById('weather-image');
const error = document.getElementById('error');
const temperature = document.getElementById('current-temperature');
const humidity = document.getElementById('current-humidity');

function displayWeather(city='Nairobi'){   
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeather_apiKey}`  
    fetch(weatherApiUrl)
    .then(res => res.json())
    .then(data => {
        console.log(data.main);
        data.weather.forEach(element => {
            console.log(element);
            
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

function currentCity(){
    function successCallback(position){
        console.log(position);        
    }
    function errorCallback(position){
        console.log(position);        
    }

    const watchId =navigator.geolocation.watchPosition(successCallback, errorCallback);
    console.log(watchId);
}   


function main(){
    displayWeather();
    allowingSearching();
   // currentCity();
}

document.addEventListener('DOMContentLoaded', function(){
    main()
})


