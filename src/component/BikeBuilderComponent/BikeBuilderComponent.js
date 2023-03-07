import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import "../../css/Bike.css";
import "../../css/App.css";
import BikeMenuBar from "./BikeMenuBar";
import BikeDisplayController from "./BikeDisplayController";

const BIKE_BUILDER_API_URL = "http://localhost:8088/demo/FullBike/";
function BikeBuilderComponent() {
  const [displayBike, setDisplayBike] = useState({});
  const [groupSets, setGroupSets] = useState(() => {
    getGroupSets();
  });
  const [frames, setFrames] = useState(() => {
    getFrames();
  });
  const [bars, setBars] = useState(() => {
    getBars();
  });
  const [brakes, setBrakes] = useState(() => {
    getBrakes();
  });
  const [readyBikes, setReadyBikes] = useState([]);

  useEffect(() => {
    getReadyBikes();
  }, [displayBike]);

  async function startBuildingBike() {
    console.log("Starting to design a new Bike");
    try {
      let b = await axios.get(BIKE_BUILDER_API_URL + "StartNewBike");
      console.log("New Bike Created!");
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

  async function getGroupSets() {
    console.log("Getting all Group Sets");
    try {
      let g = await axios.get(BIKE_BUILDER_API_URL + "GetGroupSets");
      setGroupSets(g.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function getFrames() {
    console.log("Getting all Frame Styles");
    try {
      let f = await axios.get(BIKE_BUILDER_API_URL + "GetFrames");
      setFrames(f.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function getBars() {
    console.log("Getting all Bar Styles");
    try {
      let b = await axios.get(BIKE_BUILDER_API_URL + "GetBars");
      setBars(b.data);
      console.log(b.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function getBrakes() {
    console.log("Getting all Brakes");
    try {
      let br = await axios.get(BIKE_BUILDER_API_URL + "GetBrakes");
      setBrakes(br.data);
      console.log(br.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function updateDesignBike(bike) {
    console.log("Updating In Flight Design Bike");
    try {
      let b = await axios.post(BIKE_BUILDER_API_URL + "UpdateBike", bike);
      console.log("Updated bike: ");
      setDisplayBike(b.data);
      console.log(b.data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="bike-component">
      <h1>Welcome to the bike Builder</h1>
      {Object.keys(displayBike).length > 0 ? (
        <BikeMenuBar
          groupSets={groupSets}
          brakes={brakes}
          bars={bars}
          frames={frames}
          updateBike={updateDesignBike}
          bike={displayBike}
        />
      ) : (
        <Button
          onClick={() => {
            startBuildingBike();
          }}
        >
          Start you own Bike!
        </Button>
      )}

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
              className="menu-item-select clickable"
              onClick={() => {
                setDisplayBike(b);
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
