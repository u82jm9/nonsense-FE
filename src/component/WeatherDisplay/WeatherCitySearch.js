import { Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";

const WeatherCitySearch = ({ city, changeCity }) => {
  const [tempCity, setTempCity] = useState("");

  return (
    <div className="weather-search">
      <h1>{city}</h1>
      <Form>
        <Form.Label>Search City</Form.Label>
        <Form.Control
          type="text"
          id="city-search"
          placeholder={city}
          value={tempCity}
          onChange={(e) => {
            console.log("TYPING!!! ", e.target.value);
            setTempCity(e.target.value);
          }}
        />
        <Button variant="contained" onClick={() => changeCity(tempCity)}>
          Search
        </Button>
      </Form>
    </div>
  );
};
export default WeatherCitySearch;
