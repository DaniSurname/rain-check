// Live date and time

function formatTime(time) {
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

let clockElement = document.querySelector("#clock");
let currentTime = new Date();

clockElement.innerHTML = formatTime(currentTime);
