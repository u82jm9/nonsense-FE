import axios from "axios";
import React, { useEffect, useState } from "react";
import SwitchPages from "../component/SwitchPages/SwitchPages";
import WeatherDisplayComponent from "../component/WeatherDisplay/WeatherDisplayComponent";
import JokeComponent from "../component/DailyJoke/JokeComponent";
import StickyNoteComponent from "../component/StickyNote/StickyNoteComponent";
import BikeBuilderComponent from "../component/BikeBuilderComponent/BikeBuilderComponent";
import FilmQuoteComponent from "../component/FilmQuotes/FilmQuoteComponent";
import dragonBallGif from "../gifs/dragon_ball_form.gif";

const BACK_END_TEST_API = "http://localhost:8088/demo/Test/";
function HomePage() {
  const [backendOn, setBackendOn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2250);
  }, []);

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
      setBackendOn(false)
      console.error(err);
    }
  }

  return (
    <div className="page">
      {isLoading && (
        <div className="component">
          <div className="loading-img-container">
            <img src={dragonBallGif} alt="Sweet leveling up gif!" />
          </div>
        </div>
      )}
      <div className={isLoading ? "dark" : "light"}>
        <WeatherDisplayComponent />
        <SwitchPages
          switchedOn={true}
          text1={"Quotes"}
          text2={"Jokes"}
          comp1={FilmQuoteComponent()}
          comp2={JokeComponent()}
        />
        <SwitchPages
          switchedOn={backendOn}
          text1={"Notes"}
          text2={"Bikes"}
          comp1={StickyNoteComponent(backendOn)}
          comp2={BikeBuilderComponent(backendOn)}
        />
      </div>
    </div>
  );
}

export default HomePage;
