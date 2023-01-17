import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import "../../css/Bike.css";
import BikeMenuBar from "./BikeMenuBar";
import BikeDisplayImages from "./BikeDisplayImages";
import BikeDisplayTable from "./BikeDisplayTable";

const BIKE_BUILDER_API_URL = "http://localhost:8088/demo/FullBike/";
function BikeBuilderComponent() {
  const [listOfImages, setListOfImages] = useState([]);
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
      setDesignedBike(b.data);
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

  async function getBikeFrames() {
    console.log("Getting all Frame Styles");
    try {
      let f = await axios.get(BIKE_BUILDER_API_URL + "GetFrames");
      console.log("Frames: " + f.data);
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

  function chooseImages(methodBike) {
    let tempList = [];
    console.log("Method Bike:");
    console.log(methodBike);
    tempList.push(chooseBars(methodBike.handleBarType));
    tempList.push(chooseFrame(methodBike.frame.frameStyle));
    console.log("List of images");
    console.log(tempList);
    setListOfImages(tempList);
  }

  function chooseBars(barType) {
    switch (barType) {
      case "FLARE":
        console.log("Flare Bars");
        return {
          place: 1,
          component: "Bars",
          src: "flared_bars",
          altText: "Flared Bars",
        };
      case "DROPS":
        console.log("Drop Bars");
        return {
          place: 1,
          component: "Bars",
          src: "drop_bars",
          altText: "Drop Bars",
        };
      case "BULLHORNS":
        console.log("Bull Bars");
        return {
          place: 1,
          component: "Bars",
          src: "bullhorn_bars",
          altText: "Bull Horn Bars",
        };
      case "FLAT":
        console.log("Flat Bars");
        return {
          place: 1,
          component: "Bars",
          src: "flat_bars",
          altText: "Flat Bars",
        };
      case "NONE_SELECTED":
        console.log("No Bars");
        return {
          place: 1,
          component: "Bars",
          src: "tumbleweed",
          altText: "No Bars Selected",
        };
      default:
        console.log("Null Bars");
        return {
          place: 1,
          component: "Bars",
          src: "tumbleweed",
          altText: "Nope",
        };
    }
  }

  function chooseFrame(frameStyle) {
    switch (frameStyle) {
      case "TOUR":
        console.log("Tour Frame");
        return {
          place: 0,
          component: "Frame",
          src: "tour_frame",
          altText: "Tour Frame",
        };
      case "SINGLE_SPEED":
        console.log("FIXIE!!");
        return {
          place: 0,
          component: "Frame",
          src: "fixie_frame",
          altText: "Single Speed Frame",
        };
      case "ROAD":
        console.log("Road Disc Frame");
        return {
          place: 0,
          component: "Frame",
          src: "road_disc",
          altText: "Road Frame",
        };
      case "GRAVEL":
        console.log("Gravel Disc Frame");
        return {
          place: 0,
          component: "Frame",
          src: "gravel_disc",
          altText: "Gravel Frame",
        };
      case "NONE_SELECTED":
        console.log("No Frame");
        return {
          place: 0,
          component: "Frame",
          src: "tumbleweed",
          altText: "No Frame Selected",
        };
      default:
        console.log("Null Frame");
        return {
          place: 0,
          component: "Frame",
          src: "tumbleweed",
          altText: "Nope",
        };
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
      {listOfImages.length !== 0 ? (
        <div>
          <BikeDisplayImages bike={displayBike} pics={listOfImages} />
          <BikeDisplayTable bike={displayBike} />
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
                chooseImages(b);
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
              chooseImages(designedBike);
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
