import { fetchData } from "../helpers/fetch-data.js";
import { displayWeather } from "../app.js";

export async function handleWeather(city, data) {
  const weatherContainer = document.getElementById("weather");
  const weatherUrl = `http://api.openweathermap.org/data/2.5/weather`;

  try {
    data.weatherData = await fetchData(
      `${weatherUrl}?q=${city}&APPID=73506690695f236e1305cf5f9aa6fc38`
    );

    if (
      data.weatherData === null ||
      city.toLowerCase() !== data.weatherData.name.toLowerCase()
    ) {
      weatherContainer.textContent = `Please enter the right city name`;
      weatherContainer.classList.add("center");
      document.getElementById("container-btn").classList.add("hide");
    } else {
      displayWeather();
    }
  } catch (error) {
    weatherContainer.textContent = `Please check your network`;
    weatherContainer.classList.add("center");
    document.getElementById("container-btn").classList.add("hide");
    console.log(error);
  }
}
