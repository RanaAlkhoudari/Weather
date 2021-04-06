import { displayPollution } from "../app.js";
import { showPollution } from "../helpers/showing.js";
import { fetchData } from "../helpers/fetch-data.js";

export async function handlePollution(data) {
  const { coord } = data.weatherData;
  const pollutionUrl = `https://api.openweathermap.org/data/2.5/air_pollution`;
  data.pollutionData = await fetchData(
    `${pollutionUrl}?lat=${coord.lat}&lon=${coord.lon}&appid=73506690695f236e1305cf5f9aa6fc38`
  );
  displayPollution();
  showPollution();
}
