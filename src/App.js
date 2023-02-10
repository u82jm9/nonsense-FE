import "./css/App.css";
import HomePage from "./pages/HomePage";
import React, { useState, useEffect } from "react";
import dragonBallGif from "./gifs/dragon_ball_form.gif";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2250);
  }, []);

  if (isLoading) {
    return (
      <div className="App">
        <div className="page">
          <div className="component">
            <img src={dragonBallGif} alt="Sweet leveling up gif!" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="App">
      <HomePage />
    </div>
  );
};

export default App;
