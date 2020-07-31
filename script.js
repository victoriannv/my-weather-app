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
} else if (hours === 13) {
  hours = 1;
} else if (hours === 14) {
  hours = 2;
} else if (hours === 15) {
  hours = 3;
} else if (hours === 16) {
  hours = 4;
} else if (hours === 17) {
  hours = 5;
} else if (hours === 18) {
  hours = 6;
} else if (hours === 19) {
  hours = 7;
} else if (hours === 20) {
  hours = 8;
} else if (hours === 21) {
  hours = 9;
} else if (hours === 22) {
  hours = 10;
} else if (hours === 23) {
  hours = 11;
} else if (hours === 24) {
  hours = 12;
}

h6.innerHTML = `${day}, ${hours}:${minutes}`;

// API CONFIG
let apiKey = "4e4f8b4141fbe846dcc547332e27ba7f";

function showTemperature(response) {
  console.log(response);

  // Title
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  //Temperature

  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = `${temperature}°c`;

  //What to Wear

  let whatToWear = document.querySelector("#what-to-wear");
  if (temperature >= 10) {
    whatToWear.innerHTML = "Prepare for moderate weather today.";
  } else if (temperature < 10) {
    whatToWear.innerHTML = "Bundle up and wear a long sleeve.";
  } else if (temperature >= 20) {
    whatToWear.innerHTML = "Prepare for heat! Wear something to keep you cool.";
  } else if (response.data.main === "rain") {
    whatToWear.innerHTML = "Time for rain! Wear a rain jacket!";
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

// FORMATHOURS

function formatHours(timestamp) {
  return `${hours}:${minutes}`;
}

// FORECAST

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += ` 
            <div class="col-2">
                <h3 id="hours">
                    ${formatHours(forecast.dt * 1000)}
                </h3>
                <img src="http://openweathermap.org/img/wn/${
                  forecast.weather[0].icon
                }@2x.png" 
                alt="weather condition" id="forecast-icons"/>
                <div class="weather-forecast-temperature"> ${Math.round(
                  forecast.main.temp_max
                )}°
                </div>
            </div>
        `;
  }
}

function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4e4f8b4141fbe846dcc547332e27ba7f&units=metric`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=4e4f8b4141fbe846dcc547332e27ba7f&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  search(searchInput.value);
}

search("Albany");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//function handleSubmit(event) {
//// event.preventDefault();
//let searchInput = document.querySelector("#search-text-input");
//let h1 = document.querySelector("h1");
//h1.innerHTML = searchInput.value;
// let city = searchInput.value;

// let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4e4f8b4141fbe846dcc547332e27ba7f&units=metric`;
// axios.get(apiUrl).then(showTemperature);

// apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=4e4f8b4141fbe846dcc547332e27ba7f&units=metric`;
// axios.get(apiUrl).then(displayForecast);
//}

//function displayFahrenheitTemperature(event) {
// event.preventDefault();
// alert("Link clicked");
//}

//let fahrenheitLink = document.querySelector("fahrenheit-link");
//fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
