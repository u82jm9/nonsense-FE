import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const WeatherCitySearch = ({ city, changeCity }) => {
  const [tempCity, setTempCity] = useState("");
  return (
    <div>
      <h1>{city}</h1>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          changeCity(tempCity);
          setTempCity("");
        }}
      >
        <input
          placeholder="Search for City"
          type="text"
          value={tempCity}
          onChange={(e) => setTempCity(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </Form>
    </div>
  );
};
export default WeatherCitySearch;
