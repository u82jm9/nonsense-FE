import { Form } from "react-bootstrap";
import { GiCartwheel } from "react-icons/gi";
const BikeMenuBar = ({ groupSets, brakes, bars, frames, bike, updateBike }) => {
  async function handleNameChange(e) {
    try {
      let tempBike = { ...bike };
      tempBike[e.target.id] = e.target.value;
      const updatedBike = await { ...bike, ...tempBike };
      updateBike(updatedBike);
      console.log(updatedBike);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleFrameClick(e) {
    try {
      let tempFrame = { ...bike.frame };
      tempFrame[e.target.id] = e.target.value.toUpperCase().replace(" ", "_");
      const updatedBike = await { ...bike, frame: tempFrame };
      updateBike(updatedBike);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleClick(e) {
    console.log(bike);
    let tempBike = { ...bike };
    tempBike[e.target.id] = e.target.value.toUpperCase().replace(" ", "_");
    try {
      const updatedBike = await {
        ...tempBike,
      };
      console.log("Updated");
      console.log(updatedBike);
      updateBike(updatedBike);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="bike-menu">
      <div className="menu-item-select">
        <GiCartwheel />
      </div>
      <div className="text-box">
        <Form className="bike-form">
          <Form.Group>
            <textarea
              rows="1"
              id="bikeName"
              onChange={(e) => handleNameChange(e)}
              placeholder="Change Bike Name"
            ></textarea>
          </Form.Group>
        </Form>
      </div>
      <div className="frame menu-item-select clickable">
        <ul>
          <select
            name="frame-style"
            id="frameStyle"
            onChange={(e) => handleFrameClick(e)}
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
      <div className="bars menu-item-select clickable">
        <ul>
          <select
            name="bar-type"
            id="handleBarType"
            onChange={(e) => handleClick(e)}
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
      {bike.frame.frameStyle === "NONE_SELECTED" ? (
        <></>
      ) : (
        <>
          <div className="groupset menu-item-select clickable">
            <ul>
              <select
                name="group-sets"
                id="groupsetBrand"
                onChange={(e) => handleClick(e)}
              >
                <option value="">Choose Your Groupset</option>
                {groupSets.map((g, i) => (
                  <option value={g} key={i}>
                    {g}
                  </option>
                ))}
              </select>
            </ul>
          </div>
          <div className="brakes menu-item-select clickable">
            <ul>
              <select
                name="brake-type"
                id="brakeType"
                onChange={(e) => handleClick(e)}
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
        </>
      )}
    </div>
  );
};

export default BikeMenuBar;
