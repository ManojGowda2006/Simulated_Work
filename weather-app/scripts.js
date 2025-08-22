// OpenWeatherMap API key
const apiKey = '3a2b4c5d6e7f8g9h0i1j2k3l4m5n6o7p';

// DOM elements
const cityInput = document.getElementById('cityInput');
const resultContainer = document.getElementById('result');
const getWeatherBtn = document.getElementById('getWeatherBtn');

// Event listener for button click
getWeatherBtn.addEventListener('click', fetchWeatherData);

/**
 * Fetches weather data for the entered city
 */
function fetchWeatherData() {
    const cityName = cityInput.value.trim();

    if (!cityName) {
        resultContainer.innerHTML = '<p class="error">Please enter a city name!</p>';
        return;
    }

    resultContainer.innerHTML = '<p>Loading...</p>';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                resultContainer.innerHTML = '<p class="error">City not found!</p>';
                return;
            }

            const weather = data.weather[0].main;
            const temperature = Math.round(data.main.temp);
            const humidity = data.main.humidity;

            resultContainer.innerHTML = `
                <div class="weather">${weather}</div>
                <div class="temperature">${temperature}°C</div>
                <div class="details">Humidity: ${humidity}%</div>
                <div class="details">City: ${data.name}</div>
            `;
        })
        .catch(() => {
            resultContainer.innerHTML = '<p class="error">Error fetching weather data!</p>';
        });
}
