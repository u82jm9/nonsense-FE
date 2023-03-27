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
  useEffect(() => {
    isBackendOn();
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
      {/* <SwitchPages
        switchedOn={backendOn}
        text1={"Weather"}
        text2={"Jokes"}
        comp1={WeatherDisplayComponent()}
        comp2={JokeComponent()}
      />
      <SwitchPages
        switchedOn={backendOn}
        text1={"Notes"}
        text2={"Bikes"}
        comp1={StickyNoteComponent()}
        comp2={BikeBuilderComponent()}
      /> */}
      <FilmQuoteComponent />
      {backendOn ? <></> : <h1>Please Turn on Back End!</h1>}
    </div>
  );
}

export default HomePage;
