import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/Bike.css";
import "../../css/App.css";
import dragonBallGif from "../../gifs/dragon_ball_form.gif";
import BikeDisplayComponent from "./BikeDisplayComponent";
import BikeMenuComponent from "./BikeMenuComponent";
import BikePartsTable from "./BikePartsTable";
import { Button } from "react-bootstrap";

const BIKE_OPTIONS_API_URL = "http://localhost:8088/demo/Options/";
const BIKE_BUILDER_API_URL = "http://localhost:8088/demo/FullBike/";
function BikeBuilderComponent(backendOn) {
  const [isLoading, setIsLoading] = useState(false);
  const [databaseBikes, setDatabaseBikes] = useState([]);
  const [updateBikeList, setUpdateBikeList] = useState(true);
  const [displayingBike, setDisplayingBike] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [bikeOnDisplay, setBikeOnDisplay] = useState({});
  const [options, setOptions] = useState({});
  const [parts, setParts] = useState({});
  const [showParts, setShowParts] = useState(false);

  useEffect(() => {
    getDatabaseBikes();
    setUpdateBikeList(false);
  }, [backendOn]);

  useEffect(() => {
    if (updateBikeList) {
      getDatabaseBikes();
      setUpdateBikeList(false);
    }
  }, [updateBikeList]);

  function updateBikeAndOptions(b, o) {
    updateBike(b);
    updateOptions(b, o);
  }

  async function updateBike(methodBike) {
    console.log("Updating Design Bike! Bike: ", methodBike);
    try {
      let b = await axios.post(BIKE_BUILDER_API_URL + "UpdateBike", methodBike);
      console.log("Updated bike: ", b.data);
      changeBike(b.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function updateOptions(methodBike, methodOptions) {
    console.log("Updating Options! Options: ", methodOptions);
    console.log("Bike: ", methodBike);
    try {
      let combinedData = {
        bike: methodBike,
        options: methodOptions,
      };
      let b = await axios.post(
        BIKE_OPTIONS_API_URL + "GetOptions",
        combinedData
      );
      console.log("Updated Options: ", b.data);
      setOptions(b.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function getDatabaseBikes() {
    console.log("Getting all Bikes on DB");
    try {
      let b = await axios.get(BIKE_BUILDER_API_URL + "GetAll");
      console.log("Got ", b.data.length, " built Bikes");
      setDatabaseBikes(b.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function changeBike(b) {
    setShowParts(false);
    setBikeOnDisplay(b);
    setDisplayingBike(true);
  }

  async function handleCreateBikeClick() {
    setEditMode(true);
    startNewBike();
    getOptionsForNewBike();
  }

  async function getOptionsForNewBike() {
    console.log("Getting Options for a new Bike");
    try {
      let b = await axios.get(BIKE_OPTIONS_API_URL + "StartNewBike");
      setOptions(b.data);
      console.log("Options: ", b.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function startNewBike() {
    console.log("Starting to design a new Bike");
    try {
      let b = await axios.get(BIKE_BUILDER_API_URL + "StartNewBike");
      changeBike(b.data);
      console.log("Bike: ", b.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleGetPartsClick() {
    setIsLoading(true);
    await getParts();
    setShowParts(true);
  }

  async function getParts() {
    console.log("Getting Parts for Bike: ", bikeOnDisplay);
    try {
      console.log("Request Payload: ", bikeOnDisplay);
      let b = await axios.post(
        BIKE_BUILDER_API_URL + "GetAllParts",
        bikeOnDisplay
      );
      console.log("Parts: ", b.data);
      setParts(b.data);
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2500);
    }
  }

  return (
    <>
      {isLoading && (
        <div className="component">
          <div className="loading-img-container">
            <img src={dragonBallGif} alt="Sweet leveling up gif!" />
          </div>
        </div>
      )}
      <div className="bike-component display-component">
        <div className={isLoading ? "dark" : "light"}>
          <h1>Welcome to the bike Builder</h1>
          {editMode && (
            <BikeMenuComponent
              resetOptions={getOptionsForNewBike}
              updateBikeAndOptions={updateBikeAndOptions}
              options={options}
              url={BIKE_OPTIONS_API_URL}
              bike={bikeOnDisplay}
            />
          )}
          <Button onClick={() => handleCreateBikeClick()}>
            Create New Bike
          </Button>

          {displayingBike && (
            <Button onClick={() => handleGetPartsClick()}>Get Parts!</Button>
          )}
          {displayingBike && <BikeDisplayComponent bike={bikeOnDisplay} />}
          {showParts && <BikePartsTable parts={parts} />}
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
      </div>
    </>
  );
}

export default BikeBuilderComponent;
