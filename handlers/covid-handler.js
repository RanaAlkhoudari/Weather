import { fetchData } from "../helpers/fetch-data.js";
import { displayCovid } from "../app.js";
import { showCorona } from "../helpers/showing.js";

export async function handleCovid(data) {
  const regionNamesInEnglish = new Intl.DisplayNames(["en"], {
    type: "region",
  });
  const countryName = regionNamesInEnglish.of(data.weatherData.sys.country);
  data.coronaData = await fetchData(
    `https://covid-api.mmediagroup.fr/v1/cases?country=${countryName}`
  );
  displayCovid();
  showCorona();
}
