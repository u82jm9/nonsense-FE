import { Button } from "react-bootstrap";
import { useState } from "react";

const BikeDisplayImages = ({ pics, bike }) => {
  const [imageRef, setImageRef] = useState(0);
  return (
    <div className="bike-display">
      <h2>Your Bike components!</h2>
      <div className="display-bottom">
        <div className="slider">
          <div className="images">
            <img
              src={require(`../../images/${pics[imageRef].src}.png`)}
              alt={pics[imageRef].altText}
            />
          </div>
          <div className="controls">
            <Button
              onClick={() => {
                if (imageRef !== 0) {
                  setImageRef(imageRef - 1);
                } else {
                  setImageRef(pics.length - 1);
                }
              }}
            >
              Back
            </Button>
            <Button
              onClick={() => {
                if (imageRef === pics.length - 1) {
                  setImageRef(0);
                } else {
                  setImageRef(imageRef + 1);
                }
              }}
            >
              Next
            </Button>
          </div>
        </div>

        <h2>Displaying: {bike.bikeName}</h2>
      </div>
    </div>
  );
};

export default BikeDisplayImages;
