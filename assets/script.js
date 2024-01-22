//My API Key
var apiKey = '9d4f7891d210f1159950e1f367f4e01d';

//Function to update current weather display.
function updateCurrentWeather(city, temperature, conditions) {
    var currentTempElement = document.getElementById('currentTempId');
    var weatherEmoji = getWeatherEmoji(conditions); // Get corresponding emoji

    var currentDate = new Date().toLocaleDateString('en-US',{ month: '2-digit', day: '2-digit', year:'numeric'});
    
    currentTempElement.innerHTML = `<h2>${city} - ${currentDate}</h2><p>Temperature:${temperature}°C<br>Conditions: ${conditions}</p>`;  
}

//Function to handle city history button click.
function addCityToHistory(city) {
    var historyElement = document.getElementById('historyId');
    var history = JSON.parse(localStorage.getItem('weatherHistory')) || []; // Get existing history from local storage

    // Add the new city to the history
    history.push(city);

    // Save the updated history to local storage
    localStorage.setItem('weatherHistory', JSON.stringify(history));

    // Update the history buttons
    renderHistoryButtons();
}
//function to render history buttons
function renderHistoryButtons() {
    var historyElement = document.getElementById('history');
    var history = JSON.parse(localStorage.getItem('weatherHistory')) || [];

    // Clear exisiting buttons
    historyElement.innerHTML = '';

//-----------fix this-------//
    // Add buttons for each city in the history
    history.forEach(city => {
        historyElement.innerHTML += `<button onclick="getWeatherForCity('${city}')">${city}</button>`;
    });
}
// Function to get the 5-day forecast based on city name
function getWeatherForecast(cityName) {
    var forecastElement = document.getElementById('forecastId'); //Tareget the forecast Section

    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

   //---- fix this too ----
    fetch(apiUrl)
        .then(response =>response.json())
        .then(data => {
            if (data.list && data.list.length > 0) {
                // Process the 5-day forecast data aand update the forecast section
                forecastElement.innerHTML = `<h2>5-Day Forecast for ${cityName}</h2`;

                // Create an array to track displayed dates
                var displayDates = [];

                //Loop through the forecast datta and append it to the forecast section
                data.list.forEach(item => {
                    var date = new Date(item.dt * 1000); // Convert timestamp to date
                    var day = date.toLocaleDateString('en-US', { weekday: 'short'});
                    var temperature = item.main.temp;
                    var conditons = item.weather[0].description;
                    var weatherEmoji = getWeatherEmoji(conditions);// Get the corresponding Emoji

                    // Check if the date has already been displayed
                    if(!displayDates.includes(day)) {
                        forecastElement.innerHTML += `<div><p>${day}<p><p>Temerature: ${temperature}°C</p><p>Conditions: ${conditions} ${weatherEmoji}</p></div`;
                        displayedDates.push(day);//Add the dates to the display dates array
                    }
                });
            }

        })
        .catch(error => {
            console.error(`Error fetching 5-day forecast for ${cityName}:`, error);
        });
}
// function to get the corresponding emoji based on weather conditions
function getWeatherEmoji(conditions) {
    if (conditions.includes('clear sky')) {
        return '☀️';
    } else if (conditions.includes('clouds')) {
        return '☁️';
    } else if (conditions.includes('rain')) {
        return '🌧️';
    } else if (conditions.includes('thunderstorm')) {
        return '⛈️';
    } else if (conditions.includes('snow')) {
        return '❄️';
    } else if (conditions.includes('mist')) {
        return '🌫️';
    } else if (conditions.includes('fog')) {
        return '🌁';
    } else {
        return '';//No matching emoji for other conditions
    }
}
// Function to fetch  weather for a specific city when history button is clicked
function getWeatherForCity(city) {
    var apiUrlCurrent = 'https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric';

    fetch(apiCurrent)
        .then(response => response.json())
        .then(data => {
            if (data.main && data.weather.length > 0) {
                var temperature = data.main.temp;
                var conditions =  data.weather[0].description;

                // Update current weather display
                updateCurrentWeather(city, temperature, conditions);

                // Get 5-day forecast for the city name
                getWeatherForecast(city);
            }
        })
        .catch(error => {
            console.error('Error Fetching Data:', error);
        });
    }
    // render history buttons on page load
    renderHistoryButtons();

 //Event listener for search button
document.getElementById('searchButtonId').addEventListener('click', function() {
    var cityInput = document.getElementById('citySearchInput').value;

    //Api Call to get weather data    
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;
    
    //use fetch to make the API Call
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {

            if (data.main && data.weather.length > 0) {            
                var temperature = data.main.temp;
                var conditions = data.weather[0].description;

                //Update current weather display
                updateCurrentWeather(cityInput, temperature, conditions);

                //Add to city history
                addCityToHistory(cityInput);
            }
        }) 
        .catch(error => {
            console.error('Error Fetching Data:', error);
        });
});

