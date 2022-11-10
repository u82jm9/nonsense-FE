import axios from "axios";

const WEATHER_API_URL = "https://weatherapi-com.p.rapidapi.com/forecast.json";

class WeatherDisplayService {
  getForcast(city) {
    console.log("Getting Weather Forecast for: " + city);
    const options = {
      method: "GET",
      url: WEATHER_API_URL,
      params: { q: city, days: "3" },
      headers: {
        "X-RapidAPI-Key": "2e1ecbe8d9msh8883e96a112d435p1360e2jsn1d90503594e6",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };
    return axios.request(options);
  }
}

export default new WeatherDisplayService();
