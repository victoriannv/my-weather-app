// Time
let now = new Date();
let minutes = now.getMinutes();
let hours = now.getHours();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let h6 = document.querySelector("h6");

if (minutes < 10) {
  minutes = `0${minutes}`;
}

if (hours === 0) {
  hours = 12;
}

h6.innerHTML = `${day}, ${hours}:${minutes}`;

// API CONFIG
let apiKey = "4e4f8b4141fbe846dcc547332e27ba7f";

function showTemperature(response) {
  console.log(response);

  //Temperature

  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = `${temperature}°c`;

  //What to Wear

  let whatToWear = document.querySelector("#what-to-wear");
  if (temperature >= 10) {
    whatToWear.innerHTML = "Wear something cool!";
  } else {
    whatToWear.innerHTML = "Bundle up and wear a long sleeve.";
  }

  // Humidity

  let humidityNumber = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#humidity-value");
  humidityElement.innerHTML = humidityNumber;
  console.log(response.data.main.humidity);

  //Wind
  console.log(response.data.wind.speed);
  let windSpeed = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind-value");
  windElement.innerHTML = windSpeed;
  console.log(response.data.wind.speed);

  //Icon
  let illustrationElement = document.querySelector("#illustration");
  illustrationElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  console.log(searchInput.value);
  let h1 = document.querySelector("h1");
  h1.innerHTML = searchInput.value;
  let city = searchInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4e4f8b4141fbe846dcc547332e27ba7f&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
