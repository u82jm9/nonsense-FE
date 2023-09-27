import axios from "axios";
import React, { useEffect, useState } from "react";
import SwitchPages from "../component/SwitchPages/SwitchPages";
import WeatherDisplayComponent from "../component/WeatherDisplay/WeatherDisplayComponent";
import JokeComponent from "../component/DailyJoke/JokeComponent";
import StickyNoteComponent from "../component/StickyNote/StickyNoteComponent";
import BikeBuilderComponent from "../component/BikeBuilderComponent/BikeBuilderComponent";
import FilmQuoteComponent from "../component/FilmQuotes/FilmQuoteComponent";

const BACK_END_TEST_API = "http://localhost:8088/demo/Test/";
function HomePage() {
  const [backendOn, setBackendOn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    isBackendOn();
    const interval = setInterval(() => isBackendOn(), 10000);
    return () => clearInterval(interval);
  }, []);

  async function isBackendOn() {
    try {
      let r = await axios.get(BACK_END_TEST_API + "IsThisThingOn");
      setBackendOn(r.data);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="page">
      <div className={darkMode ? "dark" : "light"}>
        <WeatherDisplayComponent />
        <SwitchPages
          text1={"Quotes"}
          text2={"Jokes"}
          comp1={FilmQuoteComponent()}
          comp2={JokeComponent()}
        />
        <SwitchPages
          switchedOn={backendOn}
          text1={"Notes"}
          text2={"Bikes"}
          comp1={StickyNoteComponent()}
          comp2={BikeBuilderComponent()}
        />
      </div>
    </div>
  );
}

export default HomePage;
