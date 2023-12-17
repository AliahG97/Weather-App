//My API Key
var apiKey = '9d4f7891d210f1159950e1f367f4e01d';

//Function to update current weather display.
function updateCurrentWeather(city, temperature, conditions) {
    var currentTempElement = document.getElementById('currentTempId');

    var currentDate = new Date().toLocaleDateString('en-US',{ month: '2-digit', day: '2-digit', year:'numeric'});
    
    currentDate.innerHTML = 
    currentTempElement.innerHTML = `<h2>${city} - ${currentDate}</h2><p>Temperature:${temperature}°C<br>Conditions: ${conditions}</p>`;
        
}

    //Function to handle city history button click.
function addCityToHistory(city) {
    var historyElement = document.getElementById('historyId');
    historyElement.innerHTML += `<button>${city}</button>`;
}
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
    }}) 
    .catch(error => {
        console.error('Error Fetching Data:', error);
    });
});

