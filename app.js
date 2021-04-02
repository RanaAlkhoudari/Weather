import { changeTime } from "./components/changeTime.js";
import { changeTempC } from "./components/changeTempC.js";
import { changeTempF } from "./components/changeTempF.js";
import { changeWindSpeed } from "./components/changeWindSpeed.js";
import { dateBuilder } from "./components/dateBuilder.js";

const weatherContainer = document.getElementById("weather");
const pollutionContainer = document.getElementById("pollution");
const fahrenheitBtn = document.getElementById("fahrenheit");
const pollutionBtn = document.getElementById("pollution-btn");
const input = document.querySelector("input");

input.addEventListener("search", () => {
  if (input.value.length != 0) {
    getWeather(input.value);
  }
});

async function getWeather(city) {
  const url = `http://api.openweathermap.org/data/2.5/weather`;

  try {
    const res = await fetch(
      `${url}?q=${city}&APPID=73506690695f236e1305cf5f9aa6fc38`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const dataJson = await res.json();

    pollutionBtn.addEventListener("click", () => {
      if (pollutionBtn.textContent === "Pollution") {
        pollutionBtn.textContent = `Weather`;
        pollutionContainer.classList.remove("hide");
        weatherContainer.classList.add("hide");
        
        getPollution(dataJson);
      } else {
        pollutionBtn.textContent = "Pollution";
        weatherContainer.classList.remove("hide");
        pollutionContainer.classList.add("hide");
      }
    });
    displayWeather(dataJson);
  } catch (error) {
    console.log(error);
  }
}

function displayWeather(dataJson) {
  const { main, weather, sys, dt, wind } = dataJson;
  const { temp, feels_like, temp_min, temp_max, humidity } = main;
  const [state] = weather;
  const { sunrise, sunset } = sys;

  const tempCelsius = changeTempC(temp);
  const feelsLikeCelsius = changeTempC(feels_like);
  const tempMinCelsius = changeTempC(temp_min);
  const tempMaxCelsius = changeTempC(temp_max);
  const sunRise = changeTime(sunrise);
  const sunSet = changeTime(sunset);
  const currentTime = changeTime(dt);
  const windSpeed = changeWindSpeed(wind.speed);
  const now = new Date();

  weatherContainer.classList.add("center");
  weatherContainer.innerHTML = `<p>${dataJson.name} ${sys.country}</p>
                  <p>${dateBuilder(now)}</p>
                    <p id="temp">${tempCelsius} °C</p>
                    <p> ${state.main}</p>
                    <p>Time: ${currentTime}</p>
                    <img src = http://openweathermap.org/img/wn/${
                      state.icon
                    }@2x.png>
                    <p class="info">Humidity: ${humidity} %</p>
                    <p><span id="high">H: ${tempMaxCelsius} °C</span><span id="low">L: ${tempMinCelsius} °C </span></p>
                    <p id="feels-like">Feels like: ${feelsLikeCelsius} °C</p>
                    <p><span>sunrise: ${sunRise}</span><span>sunset: ${sunSet}</span></p>
                    <p class="info">Wind: ${windSpeed} km/h</p>`;

  pollutionBtn.classList.remove("hide");
  fahrenheitBtn.classList.remove("hide");
  fahrenheitBtn.addEventListener("click", () => {
    if (fahrenheitBtn.textContent === "Fahrenheit") {
      getTempFahrenheit(dataJson);
    } else {
      document.getElementById("temp").innerHTML = `${tempCelsius} °C`;
      document.getElementById("high").innerHTML = `H: ${tempMaxCelsius} °C`;
      document.getElementById("low").innerHTML = `L: ${tempMinCelsius} °C`;
      document.getElementById(
        "feels-like"
      ).innerHTML = `Feels like: ${feelsLikeCelsius} °C`;
      fahrenheitBtn.innerText = "Fahrenheit";
    }
  });
}

function getTempFahrenheit(dataJson) {
  fahrenheitBtn.innerText = "Celsius";
  const { main } = dataJson;
  const { temp, feels_like, temp_min, temp_max } = main;
  const tempFahrenheit = changeTempF(temp);
  const feelsLikeFahrenheit = changeTempF(feels_like);
  const tempMinFahrenheit = changeTempF(temp_min);
  const tempMaxFahrenheit = changeTempF(temp_max);
  document.getElementById("temp").innerHTML = `${tempFahrenheit} °F`;
  document.getElementById("high").innerHTML = `H: ${tempMaxFahrenheit} °F`;
  document.getElementById("low").innerHTML = `L: ${tempMinFahrenheit} °F`;
  document.getElementById(
    "feels-like"
  ).innerHTML = `Feels like: ${feelsLikeFahrenheit} °F`;
}

async function getPollution(dataJson) {
  try {
    const url = `http://api.openweathermap.org/data/2.5/air_pollution`;
    const { coord } = dataJson;
    const res = await fetch(
      `${url}?lat=${coord.lat}&lon=${coord.lon}&appid=73506690695f236e1305cf5f9aa6fc38`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    const { list } = data;
    const [result] = list;
    const aqi = result.main.aqi;
    pollutionContainer.classList.add("center");

    switch (aqi) {
      case 1:
        pollutionContainer.innerHTML = `Aqi: ${aqi} Good`;
        pollutionContainer.style.color = "green";
        break;
      case 2:
        pollutionContainer.innerHTML = `Aqi: ${aqi} Fair`;
        pollutionContainer.style.color = "yellow";
        break;
      case 3:
        pollutionContainer.innerHTML = `Aqi: ${aqi} Moderate`;
        pollutionContainer.style.color = "orange";
        break;
      case 4:
        pollutionContainer.innerHTML = `Aqi: ${aqi} Poor`;
        pollutionContainer.style.color = "red";
        break;
      //case 5:
      default:
        pollutionContainer.innerHTML = `Aqi: ${aqi} Very Poor`;
        pollutionContainer.style.color = "purple";

      //text = "No value found";
    }

    for (const [key, value] of Object.entries(result.components)) {
      const p = document.createElement("p");
      p.style.padding = "10px";
      p.innerHTML = `${key}: ${value}`;
      pollutionContainer.appendChild(p);
    }
    
  } catch (error) {
    console.log(error);
  }
}


