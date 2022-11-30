import axios from "axios";
import { useState, useEffect } from "react";
import WeatherCitySearch from "./WeatherCitySearch";
import SmallWeatherDisplay from "./SmallWeatherDisplayTable";
import MediumWeatherDisplay from "./MediumWeatherDisplayTable";
import LargeWeatherDisplay from "./LargeWeatherDisplayTable";

const WEATHER_API_URL = "https://weatherapi-com.p.rapidapi.com/forecast.json";
function WeatherDisplayComponent() {
  const [actualCity, setActualCity] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [tableSize, setTableSize] = useState("1");
  const [hottestHours, setHottestHours] = useState([]);
  const [coldestHours, setColdestHours] = useState([]);
  useEffect(() => {
    if (weatherData.length === 0) {
      getWeatherForecast("Edinburgh");
    }
  });

  async function getWeatherForecast(city) {
    let w;
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
      w = await axios.request(options);
      console.log("Got the Forecast!");
      changeConditionDayText(w.data.forecast.forecastday);
      setActualCity(w.data.location.name);
    } catch (err) {
      console.error(err);
    }
  }

  function changeTableSize(newSize) {
    setTableSize(newSize);
  }

  function changeCity(newCity) {
    getWeatherForecast(newCity);
  }

  function changeConditionDayText(days) {
    days.map((d) => {
      hottestHours.push(calculateHotHour(d.hour));
      coldestHours.push(calculateColdHour(d.hour));
      changeConditionHourText(d.hour);
      if (d.day.condition.text.includes("rain")) {
        d.day.condition.text = "Rain";
      } else if (
        d.day.condition.text.includes("sun") ||
        d.day.condition.text.includes("Sun")
      ) {
        d.day.condition.text = "Sunny";
      } else if (
        d.day.condition.text.includes("wind") ||
        d.day.condition.text.includes("Wind")
      ) {
        d.day.condition.text = "Windy";
      } else if (d.day.maxtemp_c > 29) {
        d.day.condition.text = "Hot";
      } else {
        d.day.condition.text = "Cloudy";
      }
      setWeatherData(days);
      return d;
    });
  }

  function changeConditionHourText(hours) {
    hours.map((h) => {
      if (h.condition.text.includes("rain")) {
        h.condition.text = "Rain";
      } else if (
        h.condition.text.includes("sun") ||
        h.condition.text.includes("Sun")
      ) {
        h.condition.text = "Sunny";
      } else if (
        h.condition.text.includes("wind") ||
        h.condition.text.includes("Wind")
      ) {
        h.condition.text = "Windy";
      } else if (h.temp_c > 29) {
        h.condition.text = "Hot";
      } else {
        h.condition.text = "Cloudy";
      }
      return h;
    });
  }

  function calculateHotHour(hours) {
    let hotHour = { time: "", temp: 0 };
    hours.map((h) => {
      if (h.temp_c > hotHour.temp) {
        hotHour.time = changeTimeFormat(h.time);
        hotHour.temp = h.temp_c;
      }
      return h;
    });
    return hotHour;
  }

  function calculateColdHour(hours) {
    let coldHour = { time: "", temp: 100 };
    hours.map((h) => {
      if (h.temp_c < coldHour.temp) {
        coldHour.time = changeTimeFormat(h.time);
        coldHour.temp = h.temp_c;
      }
      return h;
    });
    return coldHour;
  }

  function changeTimeFormat(time) {
    time = time.slice(11);
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) {
      time = time.slice(1);
      time[5] = +time[0] < 12 ? " AM" : " PM";
      time[0] = +time[0] % 12 || 12;
    }
    time = time.join("");
    return time;
  }

  return (
    <div className="weather-table">
      <WeatherCitySearch city={actualCity} changeCity={changeCity} />
      {tableSize === "1" ? (
        <SmallWeatherDisplay
          data={weatherData}
          changeTableSize={changeTableSize}
        />
      ) : tableSize === "2" ? (
        <MediumWeatherDisplay
          data={weatherData}
          changeTableSize={changeTableSize}
        />
      ) : (
        <LargeWeatherDisplay
          data={weatherData}
          changeTableSize={changeTableSize}
          hotHours={hottestHours}
          coldHours={coldestHours}
        />
      )}
    </div>
  );
}

export default WeatherDisplayComponent;
