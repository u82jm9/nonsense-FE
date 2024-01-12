import React, { useEffect, useState } from "react";
import Snake from "./Snake.js";
import Food from "./Food.js";
import Button from "./Button.js";
import Menu from "./Menu.js";
import "../../css/App.css";
import "../../css/Snake.css";

const getRandomFood = () => {
  console.log("Getting Food");
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

function SnakeGame() {
  const [initialState, setInitialState] = useState({
    food: getRandomFood(),
    direction: "RIGHT",
    speed: 100,
    route: "menu",
    snakeDots: [
      [0, 0],
      [0, 2],
    ],
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      moveSnake();
      checkFoodConsumption();
    }, initialState.speed);
    document.onkeydown = onKeyDown;
    return () => {
      clearInterval(intervalId);
    };
  }, [initialState]);

  const checkSnakeOutOfBounds = () => {
    const head = initialState.snakeDots[initialState.snakeDots.length - 1];
    if (
      initialState.route === "game" &&
      (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0)
    ) {
      onSnakeOutOfBounds();
    }
  };

  const checkSnakeCollapsed = () => {
    const snake = [...initialState.snakeDots];
    const head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        onSnakeCollapsed();
      }
    });
  };

  const checkFoodConsumption = () => {
    const head = initialState.snakeDots[initialState.snakeDots.length - 1];
    const food = initialState.food;

    if (head[0] === food[0] && head[1] === food[1]) {
      increaseSnake();
      increaseSpeed();
      const newFood = getRandomFood();
      setInitialState((prevState) => ({
        ...prevState,
        food: newFood,
      }));
    }
  };

  const onKeyDown = (e) => {
    e.preventDefault();
    e = e || window.event;
    switch (e.keyCode) {
      case 37:
        setInitialState((prevState) => ({ ...prevState, direction: "LEFT" }));
        break;
      case 38:
        setInitialState((prevState) => ({ ...prevState, direction: "UP" }));
        break;
      case 39:
        setInitialState((prevState) => ({ ...prevState, direction: "RIGHT" }));
        break;
      case 40:
        setInitialState((prevState) => ({ ...prevState, direction: "DOWN" }));
        break;
    }
  };

  const moveSnake = () => {
    let dots = [...initialState.snakeDots];
    let head = dots[dots.length - 1];
    if (initialState.route === "game") {
      switch (initialState.direction) {
        case "RIGHT":
          head = [head[0] + 2, head[1]];
          break;
        case "LEFT":
          head = [head[0] - 2, head[1]];
          break;
        case "DOWN":
          head = [head[0], head[1] + 2];
          break;
        case "UP":
          head = [head[0], head[1] - 2];
          break;
      }
      dots.push(head);
      dots.shift();
      setInitialState((prevState) => ({
        ...prevState,
        snakeDots: dots,
      }));
      checkSnakeCollapsed();
      checkSnakeOutOfBounds();
    }
  };

  const onSnakeOutOfBounds = () => {
    let head = initialState.snakeDots[initialState.snakeDots.length - 1];
    if (initialState.route === "game") {
      if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
        gameOver();
      }
    }
  };

  const onSnakeCollapsed = () => {
    let snake = [...initialState.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        gameOver();
      }
    });
  };

  const increaseSnake = () => {
    let newSnake = [...initialState.snakeDots];
    newSnake.unshift([]);
    setInitialState({
      ...initialState,
      snakeDots: newSnake,
    });
  };

  const increaseSpeed = () => {
    setInitialState((prevState) => {
      if (prevState.speed > 10) {
        return {
          ...prevState,
          speed: prevState.speed - 5,
        };
      } else {
        return prevState;
      }
    });
  };

  const onRouteChange = () => {
    setInitialState({
      ...initialState,
      route: "game",
    });
  };

  const gameOver = () => {
    alert(`GAME OVER, your score is ${initialState.snakeDots.length - 2}`);
    setInitialState({
      food: getRandomFood(),
      direction: "RIGHT",
      speed: 100,
      route: "menu",
      snakeDots: [
        [0, 0],
        [0, 2],
      ],
    });
  };

  const onDown = () => {
    let dots = [...initialState.snakeDots];
    let head = dots[dots.length - 1];

    head = [head[0], head[1] + 2];
    dots.push(head);
    dots.shift();
    setInitialState({
      ...initialState,
      direction: "DOWN",
      snakeDots: dots,
    });
  };

  const onUp = () => {
    let dots = [...initialState.snakeDots];
    let head = dots[dots.length - 1];

    head = [head[0], head[1] - 2];
    dots.push(head);
    dots.shift();
    setInitialState({
      ...initialState,
      direction: "UP",
      snakeDots: dots,
    });
  };

  const onRight = () => {
    let dots = [...initialState.snakeDots];
    let head = dots[dots.length - 1];

    head = [head[0] + 2, head[1]];
    dots.push(head);
    dots.shift();
    setInitialState({
      ...initialState,
      direction: "RIGHT",
      snakeDots: dots,
    });
  };

  const onLeft = () => {
    let dots = [...initialState.snakeDots];
    let head = dots[dots.length - 1];

    head = [head[0] - 2, head[1]];
    dots.push(head);
    dots.shift();
    setInitialState({
      ...initialState,
      direction: "LEFT",
      snakeDots: dots,
    });
  };

  const { route } = initialState;

  return (
    <div className="component">
      <div className="display-component">
        <h1>Old School Snake Game!</h1>
        {route === "menu" ? (
          <div>
            <Menu onRouteChange={onRouteChange} />
          </div>
        ) : (
          <div>
            <div className="game-area">
              <Snake snakeDots={initialState.snakeDots} />
              <Food dot={initialState.food} />
            </div>
            <Button
              onDown={onDown}
              onLeft={onLeft}
              onRight={onRight}
              onUp={onUp}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default SnakeGame;
