import React from "react";
import { Button, Form } from "react-bootstrap";
import WeatherDisplayService from "../../services/WeatherDisplayService";
import LargeWeatherDisplayTable from "./LargeWeatherDisplayTable";
import MediumWeatherDisplayTable from "./MediumWeatherDisplayTable";
import SmallWeatherDisplayTable from "./SmallWeatherDisplayTable";

class WeatherDisplayComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherForecastDays: [],
      tableSize: "1",
      hotHour: { time: "", temp: 0 },
      coldHour: { time: "", temp: 100 },
      city: "Edinburgh",
      tempCity: "Edinburgh",
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.changeTableSize = this.changeTableSize.bind(this);
    this.getWeatherForecast = this.getWeatherForecast.bind(this);
    this.changeWeatherConditionDayText =
      this.changeWeatherConditionDayText.bind(this);
    this.changeWeatherConditionHourText =
      this.changeWeatherConditionHourText.bind(this);
    this.findColdestHour = this.findColdestHour.bind(this);
    this.findHottestHour = this.findHottestHour.bind(this);
    this.convertTo12Hr = this.convertTo12Hr.bind(this);
  }

  changeTableSize(newSize) {
    this.setState({ tableSize: newSize });
  }

  getWeatherForecast() {
    WeatherDisplayService.getForcast(this.state.tempCity)
      .then((e) => {
        this.changeWeatherConditionDayText(e.data.forecast.forecastday);
      })
      .catch(function (error) {
        console.error(error);
      });
    this.setState({ tempCity: "" });
  }

  changeWeatherConditionDayText(day) {
    day.map((d) => {
      this.changeWeatherConditionHourText(d.hour);
      this.findHottestHour(d.hour);
      this.findColdestHour(d.hour);
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
      return d;
    });
    this.setState({
      weatherForecastDays: day,
    });
  }

  changeWeatherConditionHourText(hours) {
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
    this.setState({
      weatherForecastDays: hours,
    });
  }

  findHottestHour(hours) {
    const tempHour = { ...this.state.hotHour };
    hours.map((h) => {
      if (h.temp_c > tempHour.temp) {
        h.time = this.convertTo12Hr(h.time);
        tempHour.temp = h.temp_c;
        tempHour.time = h.time;
      }
      return h;
    });
    this.setState({ hotHour: tempHour });
  }

  findColdestHour(hours) {
    const tempHour = { ...this.state.coldHour };
    hours.map((h) => {
      if (h.temp_c < tempHour.temp) {
        h.time = this.convertTo12Hr(h.time);
        tempHour.temp = h.temp_c;
        tempHour.time = h.time;
      }
      return h;
    });
    this.setState({ coldHour: tempHour });
  }

  convertTo12Hr(time) {
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

  componentDidMount() {
    this.getWeatherForecast();
  }

  handleOnChange(e) {
    this.setState({ tempCity: e.target.value });
  }

  render() {
    if (this.state.tableSize === "1") {
      return (
        <div>
          <SmallWeatherDisplayTable
            city={this.state.city}
            data={this.state.weatherForecastDays}
          />
          <Button
            onClick={() => {
              this.changeTableSize("2");
            }}
          >
            More
          </Button>
          <Button
            onClick={() => {
              this.changeTableSize("3");
            }}
          >
            Most
          </Button>
          <br />
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              this.setState({ city: this.state.tempCity });
              this.getWeatherForecast();
              this.setState({ tempCity: "" });
            }}
          >
            <input
              placeholder="Search for City"
              type="text"
              id="city"
              onChange={(e) => this.handleOnChange(e)}
              value={this.state.tempCity}
            />
            <Button type="submit">Search</Button>
          </Form>
        </div>
      );
    } else if (this.state.tableSize === "2") {
      return (
        <div>
          <MediumWeatherDisplayTable
            city={this.state.city}
            data={this.state.weatherForecastDays}
          />
          <Button
            onClick={() => {
              this.changeTableSize("1");
            }}
          >
            Less
          </Button>
          <Button
            onClick={() => {
              this.changeTableSize("3");
            }}
          >
            More
          </Button>
          <br />
          <input
            placeholder="Search for City"
            type="text"
            id="city"
            onChange={(e) => this.handleOnChange(e)}
          />
          <Button
            onClick={() => {
              this.getWeatherForecast();
            }}
          >
            Search
          </Button>
        </div>
      );
    } else {
      return (
        <div>
          <LargeWeatherDisplayTable
            city={this.state.city}
            data={this.state.weatherForecastDays}
            hotHour={this.state.hotHour}
            coldHour={this.state.coldHour}
          />
          <Button
            onClick={() => {
              this.changeTableSize("2");
            }}
          >
            Less
          </Button>
          <Button
            onClick={() => {
              this.changeTableSize("1");
            }}
          >
            Least
          </Button>
          <br />
          <input
            placeholder="Search for City"
            type="text"
            id="city"
            onChange={(e) => this.handleOnChange(e)}
          />
          <Button
            onClick={() => {
              this.getWeatherForecast();
            }}
          >
            Search
          </Button>
        </div>
      );
    }
  }
}

export default WeatherDisplayComponent;
