import { useState, useEffect } from "react";
import axios from "axios";
import BikeMenuBar from "./BikeMenuBar";
import { Button } from "react-bootstrap";

const BikeMenuController = ({
  changingDisplayBike,
  showingBike,
  url,
  bike,
  setUpdateBikeList,
}) => {
  const [newBikeStarted, setNewBikeStarted] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [designBike, setDesignBike] = useState({ bike });
  const [frameSize, setFrameSize] = useState([46, 48, 50, 52, 54, 56]);
  const [tireClearance, setTireClearance] = useState([23, 28, 33, 38, 48]);
  const [numFrontGears, setNumFrontGears] = useState([1, 2, 3]);
  const [numRearGears, setNumRearGears] = useState([8, 9, 10, 11, 12]);
  const [groupSets, setGroupSets] = useState(() => {
    getGroupSets();
  });
  const [shimanoGroupsets, setShimanoGroupsets] = useState(() => {
    getShimanoGroupset();
  });
  const [sramGroupsets, setSramGroupsets] = useState(() => {
    getSramGroupset();
  });
  const [campagGroupsets, setCampagGroupsets] = useState(() => {
    getCampagGroupset();
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

  useEffect(() => {
    setEditMode(false);
    setDesignBike({ bike });
  }, [bike]);

  async function startBuildingBike() {
    console.log("Starting to design a new Bike");
    try {
      let b = await axios.get(url + "StartNewBike");
      console.log("New Bike Created!");
      setDesignBike(b.data);
      setNewBikeStarted(true);
      changingDisplayBike(b.data);
      setUpdateBikeList(true);
    } catch (err) {
      console.error(err);
    }
  }

  async function getGroupSets() {
    console.log("Getting Groupset names");
    try {
      let g = await axios.get(url + "GetGroupSets");
      setGroupSets(g.data);
      return g.data;
    } catch (err) {
      console.error(err);
    }
  }

  async function getShimanoGroupset() {
    console.log("Getting Shimano Groupsets");
    try {
      let s = await axios.get(url + "GetShimano");
      setShimanoGroupsets(s.data);
      return s.data;
    } catch (err) {
      console.error(err);
    }
  }

  async function getSramGroupset() {
    console.log("Getting Sram Groupsets");
    try {
      let s = await axios.get(url + "GetSram");
      setSramGroupsets(s.data);
      return s.data;
    } catch (err) {
      console.error(err);
    }
  }

  async function getCampagGroupset() {
    console.log("Getting Campagnolo Groupsets");
    try {
      let c = await axios.get(url + "GetCampag");
      setCampagGroupsets(c.data);
      return c.data;
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
      filterOptions(barData, b.data);
      setDesignBike(b.data);
      changingDisplayBike(b.data);
      console.log(b.data);
      setUpdateBikeList(true);
    } catch (err) {
      console.error(err);
    }
  }

  function filterOptions(bars, methodBike) {
    console.log("Updating Selections");
    if (methodBike.frame.frameStyle === "ROAD") {
      const filteredBars = bars
        .filter((bItem) => bItem !== "Flat")
        .filter((bItem) => bItem !== "Bullhorns");
      setBars(filteredBars);
      setNumFrontGears([1, 2]);
      setNumRearGears([10, 11, 12]);
      const filteredTireClearance = tireClearance
        .filter((tItem) => tItem !== 23)
        .filter((tItem) => tItem !== 28);
      setTireClearance(filteredTireClearance);
    } else if (methodBike.frame.frameStyle === "GRAVEL") {
      const filteredBars = bars
        .filter((bItem) => bItem !== "Flat")
        .filter((bItem) => bItem !== "Bullhorns");
      setBars(filteredBars);
      setNumFrontGears([1, 2]);
      setNumRearGears([10, 11, 12]);
      const filteredTireClearance = tireClearance
        .filter((tItem) => tItem !== 23)
        .filter((tItem) => tItem !== 28);
      setTireClearance(filteredTireClearance);
    } else if (methodBike.frame.frameStyle === "TOURING") {
      const filteredBars = bars.filter((bItem) => bItem !== "Bullhorns");
      setBars(filteredBars);
    } else if (methodBike.frame.frameStyle === "SINGLE_SPEED") {
      setNumFrontGears([1]);
      setNumRearGears([1]);
      const filteredBars = bars.filter((bItem) => bItem !== "Flare");
      setBars(filteredBars);
    } else {
      setNumFrontGears([1, 2, 3]);
      setNumRearGears([8, 9, 10, 11, 12]);
    }
  }

  return (
    <div>
      {showingBike ? (
        <div>
          <Button
            onClick={() => {
              startBuildingBike();
              setEditMode(true);
            }}
          >
            Start New Bike
          </Button>
          <Button
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
          groupSets={groupSets}
          shimanoGroupsets={shimanoGroupsets}
          sramGroupsets={sramGroupsets}
          campagGroupsets={campagGroupsets}
          frames={frames}
          bars={bars}
          brakes={brakes}
        />
      )}
    </div>
  );
};

export default BikeMenuController;
