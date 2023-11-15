import { Button } from "react-bootstrap";
import { useState } from "react";

const DisplayBikeImages = ({ listOfImages }) => {
  const [imageRef, setImageRef] = useState(0);
  return (
    <div className="bike-display">
      <div className="image-container slider">
        <h1>{listOfImages[imageRef].altText}</h1>
        <div className="images">
          <img
            src={require(`../../images/${listOfImages[imageRef].src}`)}
            alt={listOfImages[imageRef].altText}
          />
        </div>
      </div>
      <div className="controls">
        <Button
          onClick={() => {
            if (imageRef !== 0) {
              setImageRef(imageRef - 1);
            } else {
              setImageRef(listOfImages.length - 1);
            }
          }}
        >
          Back
        </Button>
        <Button
          onClick={() => {
            if (imageRef === listOfImages.length - 1) {
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
  );
};

export default DisplayBikeImages;
