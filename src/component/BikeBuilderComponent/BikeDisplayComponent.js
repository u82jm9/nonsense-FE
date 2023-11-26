import { useState, useEffect } from "react";
import DisplayBikeImages from "./DisplayBikeImages";

const BikeDisplayComponent = ({ bike }) => {
  const [listOfImages, setListOfImages] = useState([]);

  useEffect(() => {
    chooseImages();
  }, [bike]);

  function chooseImages() {
    let tempList = [];
    console.log("Choosing Images for Bike: ", bike);
    tempList.push(chooseFrame(bike));
    tempList.push(chooseBars(bike.handleBarType));
    tempList.push(chooseBrakes(bike));
    console.log("Images: ", tempList);
    setListOfImages(tempList);
  }

  function chooseBrakes(b) {
    let obj;
    switch (b.groupsetBrand) {
      case "SHIMANO":
        obj = {
          place: 2,
          component: "Brakes",
          src: "shimano_xxx.png",
          altText: "Shimano xxx Brakes",
        };
        break;
      case "SRAM":
        obj = {
          place: 2,
          component: "Brakes",
          src: "sram_xxx.png",
          altText: "Sram xxx Brakes",
        };
        break;
      case "CAMPAGNOLO":
        obj = {
          place: 2,
          component: "Brakes",
          src: "campag_xxx.png",
          altText: "Campagnolo xxx Brakes",
        };
        break;
      case "OTHER":
        obj = {
          place: 2,
          component: "Brakes",
          src: "other_xxx.png",
          altText: "None Branded xxx Brakes",
        };
        break;
      default:
        obj = {
          place: 2,
          component: "Brakes",
          src: "no_image.png",
          altText: "No Brakes Selected",
        };
        break;
    }

    if (b.brakeType === "NOT_REQUIRED") {
      obj = {
        place: 2,
        component: "Brakes",
        src: "no_image.png",
        altText: "No Brakes Required! Brave :) ",
      };
    } else if (b.brakeType === "RIM") {
      obj = {
        ...obj,
        src: obj.src.replace("xxx", "rim"),
        altText: obj.altText.replace("xxx", "Rim"),
      };
    } else {
      obj = {
        ...obj,
        src: obj.src.replace("xxx", "disc"),
        altText: obj.altText.replace("xxx", "Disc"),
      };
    }
    return obj;
  }

  function chooseBars(barType) {
    switch (barType) {
      case "FLARE":
        return {
          place: 1,
          component: "Bars",
          src: "flared_bars.png",
          altText: "Flared Bars",
        };
      case "DROPS":
        return {
          place: 1,
          component: "Bars",
          src: "drop_bars.png",
          altText: "Drop Bars",
        };
      case "BULLHORNS":
        return {
          place: 1,
          component: "Bars",
          src: "bullhorn_bars.png",
          altText: "Bull Horn Bars",
        };
      case "FLAT":
        return {
          place: 1,
          component: "Bars",
          src: "flat_bars.png",
          altText: "Flat Bars",
        };
      case "NONE_SELECTED":
        return {
          place: 1,
          component: "Bars",
          src: "no_image.png",
          altText: "No Bars Selected",
        };
      default:
        return {
          place: 1,
          component: "Bars",
          src: "no_image.png",
          altText: "No Bars Selected",
        };
    }
  }

  function chooseFrame(b) {
    let obj;
    switch (b.frame.frameStyle) {
      case "TOUR":
        obj = {
          place: 0,
          component: "Frame",
          src: "tour_xxx.png",
          altText: "Tour Frame xxx",
        };
        break;
      case "SINGLE_SPEED":
        obj = {
          place: 0,
          component: "Frame",
          src: "fixie_frame.png",
          altText: "Single Speed Frame",
        };
        break;
      case "ROAD":
        obj = {
          place: 0,
          component: "Frame",
          src: "road_xxx.png",
          altText: "Road Frame xxx",
        };
        break;
      case "GRAVEL":
        obj = {
          place: 0,
          component: "Frame",
          src: "gravel_disc.png",
          altText: "Gravel Frame",
        };
        break;
      case "NONE_SELECTED":
        obj = {
          place: 0,
          component: "Frame",
          src: "no_image.png",
          altText: "No Frame Selected",
        };
        break;
      default:
        obj = {
          place: 0,
          component: "Frame",
          src: "no_image.png",
          altText: "No Frame Selected",
        };
        break;
    }
    if (b.brakeType === "RIM") {
      obj = {
        ...obj,
        src: obj.src.replace("xxx", "rim"),
        altText: obj.altText.replace("xxx", "Rim"),
      };
    } else {
      obj = {
        ...obj,
        src: obj.src.replace("xxx", "disc"),
        altText: obj.altText.replace("xxx", "Disc"),
      };
    }
    return obj;
  }

  return (
    <div>
      <h2>Displaying: {bike.bikeName}</h2>
      {listOfImages.length === 0 ? (
        <></>
      ) : (
        <>
          <DisplayBikeImages listOfImages={listOfImages} />
        </>
      )}
    </div>
  );
};

export default BikeDisplayComponent;
