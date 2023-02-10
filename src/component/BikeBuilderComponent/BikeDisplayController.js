import { useState, useEffect } from "react";
import BikeDisplayImages from "./BikeDisplayImages";
import BikeDisplayTable from "./BikeDisplayTable";

const BikeDisplayController = ({ bike }) => {
  const [listOfImages, setListOfImages] = useState([]);

  useEffect(() => {
    chooseImages(bike);
  }, [bike]);

  function chooseImages(methodBike) {
    let tempList = [];
    console.log("Choosing Images for Bike: ");
    console.log(methodBike);
    tempList.push(chooseFrame(methodBike.frame.frameStyle));
    tempList.push(chooseBars(methodBike.handleBarType));
    tempList.push(chooseBrakes(methodBike));
    console.log(tempList);
    setListOfImages(tempList);
  }

  function chooseBrakes(b) {
    console.log("Choose Brakes");
    console.log(b);
    let obj;
    switch (b.groupsetBrand) {
      case "SHIMANO":
        obj = {
          place: 2,
          component: "Brakes",
          src: "shimano_xxx",
          altText: "Shimano xxx Brakes",
        };
        break;
      case "SRAM":
        obj = {
          place: 2,
          component: "Brakes",
          src: "sram_xxx",
          altText: "Sram xxx Brakes",
        };
        break;
      case "CAMPAGNOLO":
        obj = {
          place: 2,
          component: "Brakes",
          src: "campag_xxx",
          altText: "Campagnolo xxx Brakes",
        };
        break;
      case "OTHER":
        obj = {
          place: 2,
          component: "Brakes",
          src: "other_xxx",
          altText: "None Branded xxx Brakes",
        };
        break;
      default:
        obj = {
          place: 2,
          component: "Brakes",
          src: "tumbleweed",
          altText: "Nope",
        };
        break;
    }
    if ((b.brakeType = "RIM")) {
      obj = {
        ...obj,
        src: obj.src.replace("xxx", "Rim"),
        altText: obj.altText.replace("xxx", "Rim"),
      };
    } else {
      obj = {
        ...obj,
        src: obj.src.replace("xxx", "Disc"),
        altText: obj.altText.replace("xxx", "Disc"),
      };
    }
    console.log("Returning: ");
    console.log(obj);
    return obj;
  }

  function chooseBars(barType) {
    switch (barType) {
      case "FLARE":
        return {
          place: 1,
          component: "Bars",
          src: "flared_bars",
          altText: "Flared Bars",
        };
      case "DROPS":
        return {
          place: 1,
          component: "Bars",
          src: "drop_bars",
          altText: "Drop Bars",
        };
      case "BULLHORNS":
        return {
          place: 1,
          component: "Bars",
          src: "bullhorn_bars",
          altText: "Bull Horn Bars",
        };
      case "FLAT":
        return {
          place: 1,
          component: "Bars",
          src: "flat_bars",
          altText: "Flat Bars",
        };
      case "NONE_SELECTED":
        return {
          place: 1,
          component: "Bars",
          src: "tumbleweed",
          altText: "No Bars Selected",
        };
      default:
        return {
          place: 1,
          component: "Bars",
          src: "tumbleweed",
          altText: "Nope",
        };
    }
  }

  function chooseFrame(frameStyle) {
    switch (frameStyle) {
      case "TOUR":
        return {
          place: 0,
          component: "Frame",
          src: "tour_frame",
          altText: "Tour Frame",
        };
      case "SINGLE_SPEED":
        return {
          place: 0,
          component: "Frame",
          src: "fixie_frame",
          altText: "Single Speed Frame",
        };
      case "ROAD":
        return {
          place: 0,
          component: "Frame",
          src: "road_disc",
          altText: "Road Frame",
        };
      case "GRAVEL":
        return {
          place: 0,
          component: "Frame",
          src: "gravel_disc",
          altText: "Gravel Frame",
        };
      case "NONE_SELECTED":
        return {
          place: 0,
          component: "Frame",
          src: "tumbleweed",
          altText: "No Frame Selected",
        };
      default:
        return {
          place: 0,
          component: "Frame",
          src: "tumbleweed",
          altText: "Nope",
        };
    }
  }
  return (
    <div>
      {listOfImages.length === 0 ? (
        <>
          <h2>Displaying: {bike.bikeName}</h2>
          <BikeDisplayTable bike={bike} />
        </>
      ) : (
        <>
          <BikeDisplayImages pics={listOfImages} />
          <h2>Displaying: {bike.bikeName}</h2>
          <BikeDisplayTable bike={bike} />
        </>
      )}
    </div>
  );
};

export default BikeDisplayController;
