import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { GiCartwheel } from "react-icons/gi";
const BikeMenuBar = ({
  showingBike,
  frameSize,
  tireClearance,
  numFrontGears,
  numRearGears,
  brakes,
  bars,
  frames,
  bike,
  updateBike,
}) => {
  const [showChangeName, setShowChangeName] = useState(true);
  const [showFrameStyle, setShowFrameStyle] = useState(true);
  const [showBar, setShowBar] = useState(false);
  const [showBrake, setShowBrake] = useState(false);
  const [showTireClearance, setShowTireClearance] = useState(false);
  const [showNumFrontGears, setShowNumFrontGears] = useState(false);
  const [showNumRearGears, setShowNumRearGears] = useState(false);
  const [showFrameSize, setShowFrameSize] = useState(false);
  const [editBike, setEditBike] = useState({ ...bike });
  let timer = null;

  useEffect(() => {
    if (showingBike) {
      console.log("Updating from Menu Bar");
      updateBike(editBike);
      checkShowFlags(editBike);
    }
  }, [editBike]);

  // function exitEditMode() {
  //   console.log("EXIT edit mode");
  //   setShowChangeName(false);
  //   setShowFrameStyle(false);
  //   setShowBar(false);
  //   setShowBrake(false);
  //   setShowTireClearance(false);
  //   setShowNumFrontGears(false);
  //   setShowNumRearGears(false);
  //   setShowFrameSize(false);
  // }

  async function handleNameChange(e) {
    console.log("Edit Bike: ", editBike);
    try {
      const { id, value } = e.target;
      const tempBike = await { ...editBike, [id]: value };
      console.log("Handle Name change method! tempBike: ", tempBike);
      setEditBike(tempBike);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setShowChangeName(false);
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleFrameClick(e) {
    try {
      console.log(editBike);
      const fieldId = e.target.id;
      const fieldValue = e.target.value;
      const tempFrame = await {
        ...editBike.frame,
        [fieldId]: fieldValue.toUpperCase().replace(" ", "_"),
      };
      const tempBike = await { ...editBike, frame: tempFrame };
      console.log(tempBike);
      setEditBike(tempBike);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleGearsClick(e) {
    try {
      console.log("Gears Click");
      console.log(e.target);
      const fieldId = e.target.id;
      const fieldValue = e.target.value;
      const tempFront = {
        ...editBike.frontGears,
        [fieldId]: fieldValue.toUpperCase().replace(" ", "_"),
      };
      const tempRear = {
        ...editBike.rearGears,
        [fieldId]: fieldValue.toUpperCase().replace(" ", "_"),
      };
      let tempBike = await {
        ...editBike.bike,
        frontGears: tempFront,
        rearGears: tempRear,
      };
      setEditBike(tempBike);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleClick(e) {
    try {
      const { id, value } = e.target;
      const tempBike = await {
        ...editBike,
        [id]: value.toUpperCase().replace(" ", "_"),
      };
      setEditBike(tempBike);
    } catch (err) {
      console.log(err);
    }
  }

  function checkShowFlags(bike) {
    if (bike.frame.frameStyle === "SINGLE_SPEED") {
      setShowNumFrontGears(false);
      setShowNumRearGears(false);
    }
  }

  return (
    <div className="bike-menu">
      <div
        onClick={() => {
          setShowChangeName(true);
          setShowFrameStyle(true);
        }}
        className="icon menu-item"
      >
        <GiCartwheel />
      </div>
      {showChangeName && (
        <div className="menu-item text-box">
          <Form className="bike-form">
            <Form.Group>
              <textarea
                rows="1"
                id="bikeName"
                onChange={(e) => handleNameChange(e)}
                onBlur={() => setShowChangeName(false)}
                placeholder="Change Bike Name"
              ></textarea>
            </Form.Group>
          </Form>
        </div>
      )}
      {showFrameStyle && (
        <div className="frame menu-item clickable">
          <ul>
            <select
              name="frame-style"
              id="frameStyle"
              onChange={(e) => {
                handleFrameClick(e);
                setShowFrameStyle(false);
                setShowFrameSize(true);
                setShowBar(true);
                setShowBrake(true);
              }}
            >
              <option value="">Choose Your Frame</option>
              {frames.map((f, i) => (
                <option value={f} key={i}>
                  {f}
                </option>
              ))}
            </select>
          </ul>
        </div>
      )}
      {showFrameSize && (
        <div className="frame-size menu-item clickable">
          <ul>
            <select
              name="framesize"
              id="size"
              onChange={(e) => {
                handleFrameClick(e);
                setShowTireClearance(true);
                setShowFrameSize(false);
              }}
            >
              <option value="">Choose Your Size</option>
              {frameSize.map((g, i) => (
                <option value={g} key={i}>
                  {g}
                </option>
              ))}
            </select>
          </ul>
        </div>
      )}
      {showBar && (
        <div className="bars menu-item clickable">
          <ul>
            <select
              name="bar-type"
              id="handleBarType"
              onChange={(e) => {
                handleClick(e);
                setShowBar(false);
              }}
            >
              <option value="">Choose Your Bars</option>
              {bars.map((b, i) => (
                <option value={b} key={i}>
                  {b}
                </option>
              ))}
            </select>
          </ul>
        </div>
      )}
      {showBrake && (
        <div className="brakes menu-item clickable">
          <ul>
            <select
              name="brake-type"
              id="brakeType"
              onChange={(e) => {
                handleClick(e);
                setShowBrake(false);
              }}
            >
              <option value="">Choose Your Brakes</option>
              {brakes.map((br, i) => (
                <option value={br} key={i}>
                  {br}
                </option>
              ))}
            </select>
          </ul>
        </div>
      )}
      {showTireClearance && (
        <div className="clearance menu-item clickable">
          <ul>
            <select
              name="clearance"
              id="tireClearance"
              onChange={(e) => {
                handleFrameClick(e);
                setShowTireClearance(false);
              }}
            >
              <option value="">Choose Tire Clearance</option>
              {tireClearance.map((g, i) => (
                <option value={g} key={i}>
                  {g}
                </option>
              ))}
            </select>
          </ul>
        </div>
      )}
      {showNumFrontGears && (
        <div className="front-gears menu-item clickable">
          <ul>
            <select
              name="front-gears"
              id="frontGears.numberOfGears"
              onChange={(e) => {
                handleClick(e);
                setShowNumFrontGears(false);
              }}
            >
              <option value="">Gears at front</option>
              {numFrontGears.map((g, i) => (
                <option value={g} key={i}>
                  {g}
                </option>
              ))}
            </select>
          </ul>
        </div>
      )}
      {showNumRearGears && (
        <div className="rear-gears menu-item clickable">
          <ul>
            <select
              name="rear-gears"
              id="rearGears.numberOfGears"
              onChange={(e) => {
                handleClick(e);
                setShowNumRearGears(false);
              }}
            >
              <option value="">Gears at rear</option>
              {numRearGears.map((g, i) => (
                <option value={g} key={i}>
                  {g}
                </option>
              ))}
            </select>
          </ul>
        </div>
      )}
    </div>
  );
};

export default BikeMenuBar;
