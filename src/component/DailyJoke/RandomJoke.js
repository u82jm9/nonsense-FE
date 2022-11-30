import React from "react";
import { Button } from "react-bootstrap";

const RandomJoke = ({ joke, anotherJoke }) => {
  return (
    <div>
      <h2>{joke.setup}</h2>
      <h3>{joke.punchline}</h3>
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

export default RandomJoke;
