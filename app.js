import { changeTime } from "./components/changeTime.js";
import { changeTempC } from "./components/changeTempC.js";
import { changeTempF } from "./components/changeTempF.js";
import { changeWindSpeed } from "./components/changeWindSpeed.js";
import { dateBuilder } from "./components/dateBuilder.js";
import { showWeather } from "./helpers/showing.js";
import { handlePollution } from "./handlers/pollution-handler.js";
import { handleWeather } from "./handlers/weather-handler.js";
import { handleCovid } from "./handlers/covid-handler.js";

const data = {
  weatherData: null,
  pollutionData: null,
  coronaData: null,
};

export function displayWeather() {
  const { main, weather, sys, dt, wind, name } = data.weatherData;
  const { temp, feels_like, temp_min, temp_max, humidity } = main;
  const [state] = weather;
  const { sunrise, sunset } = sys;

  data.tempCelsius = changeTempC(temp);
  data.feelsLikeCelsius = changeTempC(feels_like);
  data.tempMinCelsius = changeTempC(temp_min);
  data.tempMaxCelsius = changeTempC(temp_max);
  const sunRise = changeTime(sunrise);
  const sunSet = changeTime(sunset);
  const currentTime = changeTime(dt);
  const windSpeed = changeWindSpeed(wind.speed);
  const now = new Date();
  const weatherContainer = document.getElementById("weather");
  weatherContainer.classList.add("center");
  weatherContainer.innerHTML = ` <button id="fahrenheit-btn">Fahrenheit</button>
                              <p>${name} ${sys.country}</p>
    <p>${dateBuilder(now)}</p>
      <p id="temp">${data.tempCelsius} °C</p>
      
      <p> ${state.main}</p>
      <p>Time: ${currentTime}</p>
      <img src = http://openweathermap.org/img/wn/${state.icon}@2x.png>
      <p class="info">Humidity: ${humidity} %</p>
      <p><span id="high">H: ${data.tempMaxCelsius} °C</span><span id="low">L: ${
    data.tempMinCelsius
  } °C </span></p>
      <p id="feels-like">Feels like: ${data.feelsLikeCelsius} °C</p>
      <p><span>sunrise: ${sunRise}</span><span>sunset: ${sunSet}</span></p>
      <p class="info">Wind: ${windSpeed} km/h</p>`;

  const fahrenheitBtn = document.getElementById("fahrenheit-btn");
  fahrenheitBtn.classList.add("fahrenheit-btn");
  fahrenheitBtn.addEventListener("click", () => {
    if (fahrenheitBtn.textContent === "Fahrenheit") {
      fahrenheitBtn.textContent = "Celsius";
      getTempFahrenheit();
    } else {
      fahrenheitBtn.textContent = "Fahrenheit";
      document.getElementById("temp").innerHTML = `${data.tempCelsius} °C`;
      document.getElementById(
        "high"
      ).innerHTML = `H: ${data.tempMaxCelsius} °C`;
      document.getElementById("low").innerHTML = `L: ${data.tempMinCelsius} °C`;
      document.getElementById(
        "feels-like"
      ).innerHTML = `Feels like: ${data.feelsLikeCelsius} °C`;
    }
  });
  document.getElementById("container-btn").classList.remove("hide");
}

function getTempFahrenheit() {
  const { main } = data.weatherData;
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

export function displayPollution() {
  const pollutionContainer = document.getElementById("pollution");
  const { list } = data.pollutionData;
  const [result] = list;
  const aqi = result.main.aqi;
  pollutionContainer.classList.add("center");

  switch (aqi) {
    case 1:
      pollutionContainer.textContent = `Aqi: ${aqi} Good`;
      pollutionContainer.style.color = "green";
      break;
    case 2:
      pollutionContainer.textContent = `Aqi: ${aqi} Fair`;
      pollutionContainer.style.color = "yellow";
      break;
    case 3:
      pollutionContainer.textContent = `Aqi: ${aqi} Moderate`;
      pollutionContainer.style.color = "orange";
      break;
    case 4:
      pollutionContainer.textContent = `Aqi: ${aqi} Poor`;
      pollutionContainer.style.color = "red";
      break;
    default:
      pollutionContainer.textContent = `Aqi: ${aqi} Very Poor`;
      pollutionContainer.style.color = "purple";
  }
  for (const [key, value] of Object.entries(result.components)) {
    const p = document.createElement("p");
    p.style.padding = "10px";
    p.textContent = `${key}: ${value}`;
    pollutionContainer.appendChild(p);
  }
}

export function displayCovid() {
  const coronaContainer = document.getElementById("corona");
  const { All } = data.coronaData;
  const {
    country,
    confirmed,
    deaths,
    location,
    population,
    recovered,
    capital_city,
  } = All;
  coronaContainer.classList.add("center");
  coronaContainer.innerHTML = `<p class="corona"><span>Showing information for: </span> <br>${country}</p>
                                <p class="corona">Capital-city: ${capital_city}</p>
                                 <p class="corona">Population: ${population}</p>
                                 <p class="corona">Location: ${location}</p>
                                 <p class="corona">Confirmed: ${confirmed}</p>
                                 <p class="corona">Deaths: ${deaths}</p>
                                 <p class="corona">Recovered: ${recovered}`;
}

function main() {
  const input = document.querySelector("input");
  input.addEventListener("search", () => {
    if (input.value.length != 0) {
      handleWeather(input.value, data);
      showWeather();
    }
  });

  document.getElementById("weather-btn").addEventListener("click", () => {
    displayWeather();
    showWeather();
  });

  document
    .getElementById("pollution-btn")
    .addEventListener("click", () => handlePollution(data));
  const coronaBtn = document.getElementById("corona-btn");
  if (!("DisplayNames" in Intl)) {
    coronaBtn.classList.add("hide");
  }
  coronaBtn.addEventListener("click", () => handleCovid(data));
}

window.addEventListener("load", main);
