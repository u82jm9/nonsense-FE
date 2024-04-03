import { useState, useEffect } from "react";
import axios from "axios";
import BikeMenuBar from "./BikeMenuBar";
import { Button } from "@chakra-ui/react";

const BikeMenuController = ({
  changingDisplayBike,
  showingBike,
  url,
  bike,
  setUpdateBikeList,
}) => {
  const [newBikeStarted, setNewBikeStarted] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [designBike, setDesignBike] = useState({});
  const [frameSize, setFrameSize] = useState([46, 48, 50, 52, 54, 56]);
  const [tireClearance, setTireClearance] = useState([23, 28, 33, 38, 48]);
  const [numFrontGears, setNumFrontGears] = useState([1, 2, 3]);
  const [numRearGears, setNumRearGears] = useState([8, 9, 10, 11, 12]);
  const [frames, setFrames] = useState(() => {
    getFrames();
  });
  const [bars, setBars] = useState(() => {
    getBars();
  });
  const [brakes, setBrakes] = useState(() => {
    getBrakes();
  });

  useEffect(() => {
    setEditMode(false);
    setDesignBike({ ...bike });
  }, [bike]);

  async function startBuildingBike() {
    console.log("Starting to design a new Bike");
    try {
      let b = await axios.get(url + "StartNewBike");
      console.log("New Bike Created!");
      setNewBikeStarted(true);
      changingDisplayBike(b.data);
      console.log(b.data);
      setDesignBike(b.data);
      setUpdateBikeList(true);
    } catch (err) {
      console.error(err);
    }
  }

  async function getFrames() {
    console.log("Getting all Frame Styles");
    try {
      let f = await axios.get(url + "GetFrames");
      setFrames(f.data);
      return f.data;
    } catch (err) {
      console.error(err);
    }
  }

  async function getBars() {
    console.log("Getting all Bar Styles");
    try {
      let b = await axios.get(url + "GetBars");
      setBars(b.data);
      return b.data;
    } catch (err) {
      console.error(err);
    }
  }

  async function getBrakes() {
    console.log("Getting all Brakes");
    try {
      let br = await axios.get(url + "GetBrakes");
      setBrakes(br.data);
      return br.data;
    } catch (err) {
      console.error(err);
    }
  }

  async function updateDesignBike(methodBike) {
    console.log("Updating In Flight Design Bike");
    console.log(methodBike);
    try {
      let b = await axios.post(url + "UpdateBike", methodBike);
      console.log("Updated bike: ");
      const barData = await getBars();
      const brakeData = await getBrakes();
      filterOptions(brakeData, barData, b.data);
      setDesignBike(b.data);
      changingDisplayBike(b.data);
      console.log(b.data);
      setUpdateBikeList(true);
    } catch (err) {
      console.error(err);
    }
  }

  function filterOptions(brakes, bars, methodBike) {
    console.log("Updating Selections");
    const filteredBars = bars;
    const filteredBrakes = brakes;
    const filteredTireClearance = tireClearance;
    if (methodBike.frame.frameStyle === "ROAD") {
      filteredBars
        .filter((bItem) => bItem !== "Flat")
        .filter((bItem) => bItem !== "Bullhorns");
      filteredBrakes.filter((bItem) => bItem !== "Not Required");
      setNumFrontGears([1, 2]);
      setNumRearGears([10, 11, 12]);
      filteredTireClearance
        .filter((tItem) => tItem !== 33)
        .filter((tItem) => tItem !== 38)
        .filter((tItem) => tItem !== 48);
    } else if (methodBike.frame.frameStyle === "GRAVEL") {
      filteredBars
        .filter((bItem) => bItem !== "Flat")
        .filter((bItem) => bItem !== "Bullhorns");
      filteredBrakes
        .filter((bItem) => bItem !== "Rim")
        .filter((bItem) => bItem !== "Not Required");
      setNumFrontGears([1]);
      setNumRearGears([10, 11, 12]);
      filteredTireClearance.filter((tItem) => tItem !== 23);
    } else if (methodBike.frame.frameStyle === "TOURING") {
      filteredBrakes
        .filter((bItem) => bItem !== "Rim")
        .filter((bItem) => bItem !== "Not Required");
      setNumFrontGears([1, 2, 3]);
      setNumRearGears([8, 9, 10, 11, 12]);
      filteredBars.filter((bItem) => bItem !== "Bullhorns");
    } else if (methodBike.frame.frameStyle === "SINGLE_SPEED") {
      setNumFrontGears([1]);
      setNumRearGears([1]);
      filteredBars.filter((bItem) => bItem !== "Flare");
    } else {
      setNumFrontGears([1, 2, 3]);
      setNumRearGears([8, 9, 10, 11, 12]);
    }
    setTireClearance(filteredTireClearance);
    setBars(filteredBars);
    setBrakes(filteredBrakes);
  }

  return (
    <div>
      {showingBike ? (
        <div>
          <Button
            variant="solid"
            onClick={() => {
              startBuildingBike();
              setEditMode(true);
            }}
          >
            Start New Bike
          </Button>
          <Button
            variant="solid"
            onClick={() => {
              setEditMode(true);
            }}
          >
            Edit Bike
          </Button>
        </div>
      ) : (
        <div>
          <Button
            variant="solid"
            onClick={() => {
              startBuildingBike();
              setEditMode(true);
            }}
          >
            Start New Bike
          </Button>
        </div>
      )}
      {(editMode || newBikeStarted) && (
        <BikeMenuBar
          showingBike={showingBike}
          updateBike={updateDesignBike}
          bike={designBike}
          frameSize={frameSize}
          tireClearance={tireClearance}
          numFrontGears={numFrontGears}
          numRearGears={numRearGears}
          frames={frames}
          bars={bars}
          brakes={brakes}
        />
      )}
    </div>
  );
};

export default BikeMenuController;
