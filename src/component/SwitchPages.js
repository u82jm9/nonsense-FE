import React from "react";
import DailyJokeComponent from "./DailyJoke/DailyJokeComponent";
import WeatherDisplayComponent from "./WeatherDisplay/WeatherDisplayComponent";

class SwitchPages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="component switch">
        <label class="rocker">
          <input type="checkbox" checked></input>
          <span class="switch-left">Weather</span>
          <span class="switch-right">Joke</span>
        </label>
      </div>
    );
  }
}

export default SwitchPages;
