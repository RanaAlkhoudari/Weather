const weatherContainer = document.getElementById("weather");
const pollutionContainer = document.getElementById("pollution");
const weatherBtn = document.getElementById("weather-btn");
const coronaContainer = document.getElementById("corona");
const pollutionBtn = document.getElementById("pollution-btn");
const coronaBtn = document.getElementById("corona-btn");
const primaryColor = "rgb(84, 127, 230)";
const secondaryColor = "rgb(173, 106, 218)";

export function showWeather() {
  weatherContainer.classList.remove("hide");
  pollutionContainer.classList.add("hide");
  coronaContainer.classList.add("hide");
  weatherBtn.style.backgroundColor = secondaryColor;
  coronaBtn.style.backgroundColor = primaryColor;
  pollutionBtn.style.backgroundColor = primaryColor;
}

export function showPollution() {
  pollutionContainer.classList.remove("hide");
  weatherContainer.classList.add("hide");
  coronaContainer.classList.add("hide");
  pollutionBtn.style.backgroundColor = secondaryColor;
  weatherBtn.style.backgroundColor = primaryColor;
  coronaBtn.style.backgroundColor = primaryColor;
}

export function showCorona() {
  weatherContainer.classList.add("hide");
  pollutionContainer.classList.add("hide");
  coronaContainer.classList.remove("hide");
  coronaBtn.style.backgroundColor = secondaryColor;
  weatherBtn.style.backgroundColor = primaryColor;
  pollutionBtn.style.backgroundColor = primaryColor;
}
