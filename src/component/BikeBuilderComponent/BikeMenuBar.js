import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { GiCartwheel } from "react-icons/gi";
const BikeMenuBar = ({ frames, bike, updateBike }) => {
  const [showFrames, setShowFrames] = useState(false);
  const [newBike, setNewBike] = useState({});

  function handle(e) {
    const tempBike = { ...bike };
    tempBike[e.target.id] = e.target.value;
    setNewBike(tempBike);
  }

  function submit(e) {
    e.preventDefault();
    console.log(newBike);
    updateBike(newBike);
    document.getElementById("bikeName").value = "";
  }
  return (
    <div className="bike-menu">
      <div className="menu-item">
        <GiCartwheel />
      </div>

      <div className="menu-item clickable">
        {showFrames ? (
          <ul>
            <div onClick={() => setShowFrames(!showFrames)}>Frames</div>
            {frames.map((f, i) => (
              <div className="not-clickable" key={i}>
                {f}
              </div>
            ))}
          </ul>
        ) : (
          <ul>
            <div onClick={() => setShowFrames(!showFrames)}>Frames</div>
          </ul>
        )}
      </div>
      <div className="menu-item">
        <Form className="bike-form" onSubmit={(e) => submit(e)}>
          <Form.Group>
            <textarea
              rows="1"
              id="bikeName"
              onChange={(e) => handle(e)}
              placeholder="Change Bike Name"
            ></textarea>
          </Form.Group>
          <Button type="submit">Update Bike</Button>
        </Form>
      </div>
    </div>
  );
};

export default BikeMenuBar;
