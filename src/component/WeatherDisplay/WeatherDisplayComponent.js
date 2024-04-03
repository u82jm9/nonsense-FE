import axios from "axios";
import { Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import WeatherCitySearch from "./WeatherCitySearch";
import SmallWeatherDisplay from "./SmallWeatherDisplayTable";
import MediumWeatherDisplay from "./MediumWeatherDisplayTable";
import LargeWeatherDisplay from "./LargeWeatherDisplayTable";
import Logger from "../Logger";

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
  }, []);

  async function getWeatherForecast(city) {
    let w;
    try {
      Logger.infoLog("Getting Weather Forecast!");
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
      Logger.warnLog("Forecast returned: " + w.data);
      changeConditionDayText(w.data.forecast.forecastday);
      setActualCity(w.data.location.name);
    } catch (err) {
      Logger.errorLog(err);
    }
  }

  function changeTableSize(entry) {
    if (tableSize === "1") {
      if (entry === "up") {
        setTableSize("2");
      } else {
        setTableSize("3");
      }
    } else if (tableSize === "2") {
      if (entry === "up") {
        setTableSize("3");
      } else {
        setTableSize("1");
      }
    } else if (tableSize === "3") {
      if (entry === "up") {
        setTableSize("1");
      } else {
        setTableSize("2");
      }
    }
  }

  function changeCity(newCity) {
    getWeatherForecast(newCity);
  }

  function changeConditionDayText(days) {
    let tempHots = [];
    let tempColds = [];
    days.map((d) => {
      tempHots.push(calculateHotHour(d.hour));
      tempColds.push(calculateColdHour(d.hour));
      changeConditionHourText(d.hour);
      if (d.day.avgtemp_c < 5 && d.day.avgtemp_c > -3) {
        d.day.condition.text = "Cold";
      } else if (d.day.avgtemp_c <= -3) {
        d.day.condition.text = "Freezing";
      } else if (d.day.daily_chance_of_snow > 75) {
        d.day.condition.text = "Snow";
      } else if (d.day.avgtemp_c > 20) {
        d.day.condition.text = "Hot";
      } else if (d.day.condition.text.includes("rain")) {
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
      } else {
        d.day.condition.text = "Cloudy";
      }
      Logger.warnLog("Setting weather data: " + days);
      setWeatherData(days);
      setHottestHours(tempHots);
      setColdestHours(tempColds);
      return d;
    });
  }

  function changeConditionHourText(hours) {
    hours.map((h) => {
      if (h.temp_c < 5 && h.temp_c > -3) {
        h.condition.text = "Cold";
      } else if (h.temp_c <= -3) {
        h.condition.text = "Freezing";
      } else if (h.temp_c > 20) {
        h.condition.text = "Hot";
      }
      if (h.temp_c > 29) {
        h.condition.text = "Hot";
      } else if (h.condition.text.includes("rain")) {
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
    <div className="component">
      <div className="display-component">
        <WeatherCitySearch city={actualCity} changeCity={changeCity} />
        <div className="weather-table">
          {tableSize === "1" ? (
            <SmallWeatherDisplay data={weatherData} />
          ) : tableSize === "2" ? (
            <MediumWeatherDisplay data={weatherData} />
          ) : (
            <LargeWeatherDisplay
              data={weatherData}
              hotHours={hottestHours}
              coldHours={coldestHours}
            />
          )}
        </div>
        <div className="weather-buttons">
          <Button
            variant="solid"
            onClick={() => {
              changeTableSize("up");
            }}
          >
            More
          </Button>
          <Button
            variant="solid"
            onClick={() => {
              changeTableSize("down");
            }}
          >
            Less
          </Button>
        </div>
      </div>
    </div>
  );
}

export default WeatherDisplayComponent;
