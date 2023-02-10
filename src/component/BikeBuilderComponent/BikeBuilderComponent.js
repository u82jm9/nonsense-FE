import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import "../../css/Bike.css";
import BikeMenuBar from "./BikeMenuBar";
import BikeDisplayController from "./BikeDisplayController";

const BIKE_BUILDER_API_URL = "http://localhost:8088/demo/FullBike/";
function BikeBuilderComponent() {
  const [designedBike, setDesignedBike] = useState({});
  const [displayBike, setDisplayBike] = useState({});
  const [frames, setFrames] = useState([]);
  const [readyBikes, setReadyBikes] = useState([]);

  useEffect(() => {
    getBikeFrames();
    getReadyBikes();
  }, []);

  async function startBuildingBike() {
    console.log("Starting to design a new Bike");
    try {
      let b = await axios.get(BIKE_BUILDER_API_URL + "StartNewBike");
      console.log("New Bike Created!");
      setDesignedBike(b.data);
      setDisplayBike(b.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function getReadyBikes() {
    console.log("Getting all Bikes on DB");
    try {
      let b = await axios.get(BIKE_BUILDER_API_URL + "GetAll");
      console.log("Built Bikes: ");
      console.log(b.data);
      setReadyBikes(b.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function getBikeFrames() {
    console.log("Getting all Frame Styles");
    try {
      let f = await axios.get(BIKE_BUILDER_API_URL + "GetFrames");
      setFrames(f.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function updateDesignBike(bike) {
    console.log("Updating In Flight Design Bike");
    try {
      let b = await axios.post(BIKE_BUILDER_API_URL + "UpdateBike", bike);
      console.log("Updated bike: ");
      setDesignedBike(b.data);
      setDisplayBike(b.data);
      console.log(b.data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="bike-component">
      <BikeMenuBar
        frames={frames}
        updateBike={updateDesignBike}
        bike={designedBike}
      />
      <h1>Welcome to the bike Builder</h1>
      <Button
        onClick={() => {
          startBuildingBike();
        }}
      >
        Start you own Bike!
      </Button>
      {Object.keys(displayBike).length !== 0 ? (
        <div>
          <BikeDisplayController bike={displayBike} />
        </div>
      ) : (
        <>
          <h2>Check out some of our stock bike below!</h2>
        </>
      )}

      <h3>Built Bikes:</h3>
      <div className="bike-menu">
        <ul>
          {readyBikes.map((b, i) => (
            <div
              className="menu-item clickable"
              onClick={() => {
                setDisplayBike(b);
              }}
              key={i}
            >
              {b.bikeName}
            </div>
          ))}
          <div
            className="menu-item clickable"
            onClick={() => {
              setDisplayBike(designedBike);
            }}
          >
            {designedBike.bikeName}
          </div>
        </ul>
      </div>
    </div>
  );
}

export default BikeBuilderComponent;
