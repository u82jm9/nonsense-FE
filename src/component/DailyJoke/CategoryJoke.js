import React from "react";
import { Button } from "react-bootstrap";

const CategoryJoke = ({ joke, anotherJoke }) => {
  return (
    <div>
      <h2>{joke}</h2>
      <Button
        onClick={() => {
          anotherJoke();
        }}
      >
        Another!
      </Button>
    </div>
  );
};

export default CategoryJoke;
