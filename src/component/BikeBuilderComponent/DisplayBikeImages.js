import { Button } from "react-bootstrap";
import { useState } from "react";

const BIKE_IMAGES_API_URL = "http://localhost:8088/demo/Image/";
const DisplayBikeImages = ({ bike }) => {
  const [imageRef, setImageRef] = useState(0);
  const [listOfImages, setListOfImages] = useState([]);

  useEffect(() => {
    chooseImages();
  }, [bike]);

  async function chooseImages() {
    console.log("Getting Images for Bike: ", bike);
    try {
      let tempList = await axios.post(BIKE_IMAGES_API_URL + "GetImages", bike);
      console.log("Images: ", tempList.data);
      setListOfImages(tempList.data);
    } catch (err) {
      console.error(err);
    }
  }

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
