import { Box, Input, InputLabel, Button, FormControl } from "@mui/material";
import React from "react";
import { useState } from "react";
// import { Button, Form } from "react-bootstrap";

const WeatherCitySearch = ({ city, changeCity }) => {
  const [tempCity, setTempCity] = useState("");

  return (
    <div className="weather-search">
      <h1>{city}</h1>
      <Box component="form">
        <FormControl>
          <InputLabel>City</InputLabel>
          <Input
            type="text"
            id="city-search"
            placeholder={city}
            value={tempCity}
            onChange={(e) => {
              console.log("TYPING!!! ", e.target.value);
              setTempCity(e.target.value);
            }}
          />
        </FormControl>
        <Button variant="contained" onClick={() => changeCity(tempCity)}>
          Search
        </Button>
      </Box>
      {/* <Form>
        <Form.Group
          className="weather-city"
          controlId="city-search"
          onChange={(e) => {
            console.log("TYYPIING!!! ", e.target);
            setTempCity(e.target.value);
          }}
        >
          <Form.Label>Search City</Form.Label>
          <Form.Control type="text" placeholder={city} />
        </Form.Group>
        <Button variant="primary" onClick={() => changeCity(tempCity)}>
          Search
        </Button>
      </Form> */}
    </div>
  );
};
export default WeatherCitySearch;
