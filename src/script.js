import {weatherStackApiKey, openWeather_apiKey } from './myApis.js'

const displayedCity = document.getElementById('displayedCity')
const weatherContainer = document.getElementById('weatherFound');
const weatherDescription = document.getElementById('description');
const weatherName = document.getElementById('weather');
const weatherIcon = document.getElementById('icon');
const imageCreated = document.getElementById('weather-image');
const errorMessage = document.getElementById('error');
const temperature = document.getElementById('current-temperature');
const humidity = document.getElementById('current-humidity');
let currentCityWeatherForecast = document.querySelector('#current-city-weather-forecast');
let searchedCityWeatherForecast = document.querySelector('#search-weather-forecast');


function displayWeather(myCity='Paris'){ 
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${myCity}&appid=${openWeather_apiKey}` ;
    fetch(weatherApiUrl)
    .then(res => res.json())
    .then(data => {
                
        let searchCityWeatherForecast = document.getElementById('search-city-weather-forecast');     
        data.weather.forEach(element => {
            
            searchCityWeatherForecast.textContent = `${myCity} 5 Day Weather Forecast`;
            displayedCity.textContent = myCity;
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
    historicalData(searchedCityWeatherForecast, myCity);
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
let currentCityLatitude;
let currentCityLongitude;
function currentCity(){
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    
    function successCallback(position){
        
        // Getting the longitude and latitude
        currentCityLatitude = position.coords.latitude;
        currentCityLongitude = position.coords.longitude;     
        
        const currentCity_WeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentCityLatitude}&lon=${currentCityLongitude}&appid=${openWeather_apiKey}`
        let newErrorMessage = document.getElementById('current-city-error');

        fetch(currentCity_WeatherApiUrl)
        .then(res => res.json())
        .then(data => {

            
            errorMessage.classList.add('hidden');
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
        ).catch(err => { 
            let weatherDetails = document.getElementById('current-city-weather-details');
            weatherDetails.classList.add('hidden');
            newErrorMessage.textContent = error.message;
            console.log('Could not display content');
            
        })  
        historicalData(currentCityWeatherForecast, 'none' ,currentCityLatitude, currentCityLongitude);  
    }
    function errorCallback(position){
        console.log(position);  

        let newErrorMessage = document.getElementById('current-city-error');
        let weatherDetails = document.getElementById('current-city-weather-details');
        weatherDetails.classList.add('hidden');
        
        newErrorMessage.textContent = position.message;
        newErrorMessage.style.backgroundColor = 'red';
        newErrorMessage.style.borderRadius = '5px'
        newErrorMessage.style.height = '50px'
        newErrorMessage.style.textAlign = 'centre';
        newErrorMessage.style.padding = '10px 30px'
        console.log('Could not display content');      
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

function historicalData(currentDiv, city='none', lat=44.34,lon=10.99){
    let weatherUrl;
    if(city === 'none'){
        weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${openWeather_apiKey}`
    }else{
        weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${openWeather_apiKey}`;
    }

    fetch(weatherUrl)
        .then(response => response.json()) 
    .then(data => {
        console.log(data.list[1].weather[0].main);
        let hostingDiv = document.createElement('div');
        let parentHostingDiv = document.getElementsByClassName('hostingDiv')[0]
        console.log(parentHostingDiv);
        
        for(let i = 0; i < data.list.length; i+=8){
                    
            let newDiv = document.createElement('div');
            let newHeading = document.createElement('h4');
            newHeading.textContent = data.list[i].weather[0].main;
            newHeading.padding = '0px';
            newHeading.margin = '0px';

            let newParagraph = document.createElement('p');
            newParagraph.textContent = data.list[i].weather[0].description;
            newParagraph.padding = '0px';
            newParagraph.margin = '0px';

            let newIcon = document.createElement('img');
            newIcon.src = `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`;
            newIcon.style.width = '50px'
            
            newDiv.append(newHeading, newParagraph, newIcon)
            newDiv.classList.add('newlyCreatedDivs');
            
            if(city === 'none'){
                hostingDiv.appendChild(newDiv);
                currentDiv.appendChild(hostingDiv);
            }else{
                parentHostingDiv.textContent = '';
                hostingDiv.appendChild(newDiv);
                parentHostingDiv.appendChild(hostingDiv);
                currentDiv.appendChild(parentHostingDiv);
            }
            
        }
    
  }) 
  .catch(error => console.error("Error:", error));
}



function main(){
    displayWeather();
    allowingSearching();
    currentCity();
    updateClock(); 
   
}

document.addEventListener('DOMContentLoaded', function(){
    main()
})


