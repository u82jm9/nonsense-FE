import React from "react";
import Switch from "react-switch";
import JokeComponent from "../DailyJoke/JokeComponent";
import WeatherDisplayComponent from "../WeatherDisplay/WeatherDisplayComponent";

class SwitchPages extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({ checked: !this.state.checked });
  }

  render() {
    return (
      <div className="component">
        <div className="switch">
          <h1>Weather</h1>
          <Switch
            offColor="#888"
            onColor="#888"
            uncheckedIcon={false}
            checkedIcon={false}
            className="switch-toggle"
            checked={this.state.checked}
            onChange={this.handleChange}
          />
          <h1>Jokes</h1>
        </div>
        {this.state.checked === false ? (
          <WeatherDisplayComponent />
        ) : (
          <JokeComponent />
        )}
      </div>
    );
  }
}

export default SwitchPages;
