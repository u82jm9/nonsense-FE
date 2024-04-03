import { Box, Input, FormControl, FormLabel, Button } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";

const WeatherCitySearch = ({ city, changeCity }) => {
  const [tempCity, setTempCity] = useState("");

  return (
    <div className="weather-search">
      <h1>{city}</h1>
      <Box component="form">
        <FormControl>
          <FormLabel>Search City</FormLabel>
          <Input
            type="text"
            id="city-search"
            placeholder={city}
            value={city}
            onChange={(event) => {
              console.log("TYPING!!! ", event.target.value);
              setTempCity(event.target.value);
            }}
          />
        </FormControl>
      </Box>
      <Button variant="solid" onClick={() => changeCity(tempCity)}>
        Search
      </Button>
    </div>
  );
};
export default WeatherCitySearch;
