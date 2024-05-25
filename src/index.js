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
  let nameElement = document.querySelector("#name");
  nameElement.innerHTML = response.data.city;
  // Updates comment element
  let commentElement = document.querySelector("#comment");
  let comment = response.data.condition.description;
  commentElement.innerHTML = comment.toUpperCase();
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
  let time = new Date();
  clockElement.innerHTML = formatTime(time);
}
// console.log(comment);

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

let searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("submit", getCity);

searchCity("London");
