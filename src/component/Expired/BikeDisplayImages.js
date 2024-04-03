import { Button } from "@chakra-ui/react";
import { useState } from "react";

const BikeDisplayImages = ({ pics }) => {
  const [imageRef, setImageRef] = useState(0);
  return (
    <div className="bike-display">
      <div className="image-container">
        <div className="slider">
          <h1>{pics[imageRef].altText}</h1>
          <div className="images">
            <img
              src={require(`../../images/${pics[imageRef].src}`)}
              alt={pics[imageRef].altText}
            />
          </div>
        </div>
      </div>
      <div className="controls">
        <Button variant='solid'
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
        <Button variant='solid'
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
  );
};

export default BikeDisplayImages;
