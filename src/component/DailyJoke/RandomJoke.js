import React from "react";

const RandomJoke = ({ joke }) => {
  return (
    <div>
      <h2>{joke.setup}</h2>
      <h3>{joke.punchline}</h3>
    </div>
  );
};

export default RandomJoke;
