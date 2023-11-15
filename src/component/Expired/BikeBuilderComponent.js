import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/Bike.css";
import "../../css/App.css";
import BikeDisplayController from "./BikeDisplayController";
import BikeMenuController from "./BikeMenuController";

const BIKE_BUILDER_API_URL = "http://localhost:8088/demo/FullBike/";
function BikeBuilderComponent() {
  const [showingBike, setShowingBike] = useState(false);
  const [displayBike, setDisplayBike] = useState({});
  const [readyBikes, setReadyBikes] = useState([]);
  const [updateBikeList, setUpdateBikeList] = useState(true);

  useEffect(() => {
    if (updateBikeList) {
      getReadyBikes();
      setUpdateBikeList(false)
    }
  }, [displayBike]);

  async function getReadyBikes() {
    console.log("Getting all Bikes on DB");
    try {
      let b = await axios.get(BIKE_BUILDER_API_URL + "GetAll");
      console.log("Built Bikes: ");
      console.log(b.data);
      setReadyBikes(b.data);
      setUpdateBikeList(false);
    } catch (err) {
      console.error(err);
    }
  }

  function changeBike(bike) {
    console.log("Changing Bike");
    if (bike) {
      setShowingBike(true);
      setDisplayBike(bike);
    }
  }

  return (
    <div className="bike-component display-component">
      <h1>Welcome to the bike Builder</h1>
      <BikeMenuController
        url={BIKE_BUILDER_API_URL}
        bike={displayBike}
        showingBike={showingBike}
        changingDisplayBike={changeBike}
        setUpdateBikeList={setUpdateBikeList}
      />
      {showingBike && <BikeDisplayController bike={displayBike} />}
      <h2>Check out some of our stock bikes</h2>
      <h3>Built Bikes:</h3>
      <div className="bike-menu">
        <ul>
          {readyBikes.map((b, i) => (
            <div
              className="menu-item clickable"
              onClick={() => {
                changeBike(b);
              }}
              key={i}
            >
              {b.bikeName}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BikeBuilderComponent;
