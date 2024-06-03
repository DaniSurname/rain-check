function formatTime(time) {
  // Formats current date and time
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[time.getDay()];

  let hour = time.getHours().toString().padStart(2, "0");
  let minute = time.getMinutes().toString().padStart(2, "0");

  return `${day} ${hour}:${minute}`;
}

function updateInfo(response) {
  // Updates city name element
  let nameElement = document.querySelector("#city-name");
  nameElement.innerHTML = response.data.city;
  // Updates comment element
  let commentElement = document.querySelector("#city-comment");
  let comment = response.data.condition.description;
  commentElement.innerHTML = comment.toUpperCase();
  //  Updates weather emoji
  let emojiElement = document.querySelector("#weather-emoji");
  emojiElement.innerHTML = `<img src="${response.data.condition.icon_url}" alt="${response.data.condition.icon}" id="weather-emoji-icon" />`;
  // Updates temperature element
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);
  // Updates humidity element
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;
  // Updates wind element
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.wind.speed;
  //  Updates clock element
  let clockElement = document.querySelector("#clock");
  let time = new Date(); // or new Date(response.data.time * 1000);
  clockElement.innerHTML = formatTime(time);

  getForecast(response.data.city);
}

function searchCity(city) {
  // Makes API call using city input
  let apiKey = "384f9t60d2a80f6f159b0a59do1ee44d";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  // Sends API response to updateInfo function
  axios.get(apiUrl).then(updateInfo);
}
function getCity(event) {
  event.preventDefault();
  // Recieves city input from the user
  let searchInput = document.querySelector("#search-input");
  // Sends city input to the searchCity function
  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thus", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
        <div class="forecast-section-col">
          <div class="forecast-date">${formatDay(day.time)}</div>
           <img src="${day.condition.icon_url}" class="forecast-emoji" />
          <div class="forecast-temps">From
            <span class="forecast-temp-min">${Math.round(
              day.temperature.minimum
            )}°C</span> <br />to
            <span class="forecast-temp-max">
              <strong>${Math.round(day.temperature.maximum)}°C</strong>
            </span>
          </div>
        </div>
      `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

function getForecast(city) {
  let apiKey = "384f9t60d2a80f6f159b0a59do1ee44d";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

let searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("submit", getCity);

searchCity("London");
displayForecast();
