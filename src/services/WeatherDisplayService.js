import axios from "axios";
const WEATHER_API_URL = "https://weatherapi-com.p.rapidapi.com/forecast.json";
function WeatherDisplayService() {
  async function getForcast(city) {
    let weather;
    try {
      console.log("Getting Weather Forecast for: " + city);
      const options = {
        method: "GET",
        url: WEATHER_API_URL,
        params: { q: city, days: "3" },
        headers: {
          "X-RapidAPI-Key":
            "2e1ecbe8d9msh8883e96a112d435p1360e2jsn1d90503594e6",
          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        },
      };
      axios
        .request(options)
        .then((e) => {
          weather = e.data.forecast.forecastday;
          console.log("Weather");
          console.log(weather);
          return weather;
        })
        .catch(function (error) {
          console.error(error);
          console.log("Error");
        });
      return weather;
    } catch (error) {
      console.error(error);
    }
  }
}

export default WeatherDisplayService;
