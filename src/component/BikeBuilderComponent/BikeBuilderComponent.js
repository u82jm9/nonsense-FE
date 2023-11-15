import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/Bike.css";
import "../../css/App.css";
import BikeDisplayComponent from "./BikeDisplayComponent";

const BIKE_BUILDER_API_URL = "http://localhost:8088/demo/FullBike/";
function BikeBuilderComponent() {
  const [databaseBikes, setDatabaseBikes] = useState([]);
  const [updateBikeList, setUpdateBikeList] = useState(true);
  const [displayingBike, setDisplayingBike] = useState(false);
  const [bikeOnDisplay, setBikeOnDisplay] = useState({});

  useEffect(() => {
    if (updateBikeList) {
      getDatabaseBikes();
      setUpdateBikeList(false);
    }
  }, [updateBikeList]);

  async function getDatabaseBikes() {
    console.log("Getting all Bikes on DB");
    try {
      let b = await axios.get(BIKE_BUILDER_API_URL + "GetAll");
      console.log("Got ", b.data.length, " built Bikes");
      console.log("BLAH! ", b.data);
      setDatabaseBikes(b.data);
      setUpdateBikeList(false);
    } catch (err) {
      console.error(err);
    }
  }

  function changeBike(bike) {
    setDisplayingBike(true);
    setBikeOnDisplay(bike);
  }

  return (
    <div className="bike-component display-component">
      <h1>Welcome to the bike Builder</h1>
      {displayingBike && <BikeDisplayComponent bike={bikeOnDisplay} />}
      <h3>Check out some of our stock bikes</h3>
      <h3>Built Bikes:</h3>
      <div className="bike-menu">
        <ul>
          {databaseBikes.map((b, i) => (
            <div
              className="menu-item clickable"
              key={i}
              onClick={() => changeBike(b)}
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
