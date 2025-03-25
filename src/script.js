
require('dotenv').config();

const openWather_apiKey = process.env.openWeather_apiKey;


const displayedCity = document.getElementById('displayedCity')
const weatherContainer = document.getElementById('weatherFound');
const weatherDescription = document.getElementById('description');
const weatherName = document.getElementById('weather');
const weatherIcon = document.getElementById('icon');
const imageCreated = document.getElementById('weather-image');
const error = document.getElementById('error');

function displayWeather(city='Nairobi'){   
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeather_apiKey}`  
    fetch(weatherApiUrl)
    .then(res => res.json())
    .then(data => {
        data.weather.forEach(element => {
            displayedCity.textContent = city;
            weatherName.textContent = element.main;

            imageCreated.src = `https://openweathermap.org/img/wn/${element.icon}@2x.png`;
                        
            weatherDescription.textContent = element.description; 
            error.classList.add('hidden');
            
            })
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

function main(){
    displayWeather();
    allowingSearching();
}

document.addEventListener('DOMContentLoaded', function(){
    main()
})


