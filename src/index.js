function displayWeather(response) {
  let weatherDiv = document.querySelector("#weather");
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let wind = response.data.wind.speed;
  let humidity = response.data.main.humidity;
  debugger;

  let cityInputElem = document.querySelector("#city-input");
  cityInputElem.value = response.data.name;
  let cityElem = document.querySelector("#city");
  cityElem.innerHTML = response.data.name;
  let tempElem = document.querySelector("#temperature");
  tempElem.innerHTML = temperature;
  let humidityElem = document.querySelector("#humidity");
  humidityElem.innerHTML = humidity;
  let windElem = document.querySelector("#wind");
  windElem.innerHTML = wind;
}

function callApiWether() {
  let cityInputElem = document.querySelector("#city-input");
  let city = cityInputElem.value;
  if (!city) {
    city = "Tehran";
  }
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);
}

function handlePosition(position) {
  debugger;
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayWeather);
}
function displayTemp(response) {
  console.log(response);
}
function GetCurrentWeather(Event) {
  Event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function searchByCityName(Event) {
  Event.preventDefault();
  callApiWether();
}

let apiKey = "cd8488d54edad14895549ae906264c9b";
let currentBtn = document.querySelector("#current-location-button");
currentBtn.addEventListener("click", GetCurrentWeather);

let searchBtn = document.querySelector("#search-button");
searchBtn.addEventListener("click", searchByCityName);

callApiWether();
