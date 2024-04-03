import axios from "axios";
import { useState, useEffect } from "react";
import RandomJoke from "./RandomJoke";
import CategoryJoke from "./CategoryJoke";
import { Form } from "react-bootstrap";
import log4js from "log4js";
import path from "path";
import { Button } from "@chakra-ui/react";

const RANDOM_JOKE_API_URL = "https://dad-jokes.p.rapidapi.com/random/joke";
const GET_JOKE_BY_CATEGORY_API_URL =
  "https://world-of-jokes1.p.rapidapi.com/v1/jokes/jokes-by-category";

function JokeComponent() {
  const currentDirectory = path.dirname(require.resolve("./JokeComponent.js"));
  const logFilePath = path.join(
    currentDirectory,
    "..",
    "logs",
    "Jokes_logs.log"
  );
  const [randomJoke, setRandomJoke] = useState("");
  const [categoryJoke, setCategoryJoke] = useState("");
  const [listOfCategoryJokes, setListOfCategoryJokes] = useState([]);
  const categories = [
    "Puns",
    "Women",
    "Sports",
    "Old Age",
    "Miscellaneous",
    "Money",
    "Office Jokes",
    "lightbulb",
    "Men",
    "Medical",
    "Marriage",
  ];
  useEffect(() => {
    getRandomJoke();
  }, []);

  log4js.configure({
    appenders: {
      console: { type: "console" },
      file: { type: "file", filename: logFilePath },
    },
    categories: {
      default: { appenders: ["console", "file"], level: "debug" },
    },
  });

  const logger = log4js.getLogger();

  async function getRandomJoke() {
    let j;
    try {
      logger.info("Getting Random Joke!");
      const options = {
        method: "GET",
        url: RANDOM_JOKE_API_URL,
        headers: {
          "X-RapidAPI-Key":
            "2e1ecbe8d9msh8883e96a112d435p1360e2jsn1d90503594e6",
          "X-RapidAPI-Host": "dad-jokes.p.rapidapi.com",
        },
      };
      j = await axios.request(options);
      logger.info("Got a joke, hope it's funny!");
      logger.warn("Random joke returned: ", j.data.body[0]);
      setRandomJoke(j.data.body[0]);
    } catch (err) {
      logger.error(err);
    }
  }

  async function getJokeByCategory(category) {
    let j;
    try {
      logger.info("Getting joke in Category: ", category);
      const options = {
        method: "GET",
        url: GET_JOKE_BY_CATEGORY_API_URL,
        params: {
          limit: "100",
          page: "1",
          category: category,
          sortBy: "score:desc",
        },
        headers: {
          "X-RapidAPI-Key":
            "2e1ecbe8d9msh8883e96a112d435p1360e2jsn1d90503594e6",
          "X-RapidAPI-Host": "world-of-jokes1.p.rapidapi.com",
        },
      };
      j = await axios.request(options);
      logger.info("Got a list of category jokes!");
      setListOfCategoryJokes(j.data.results);
      logger.warn("Jokes in category returned: ", j.data.results);
      pickCategoryJoke();
    } catch (err) {
      logger.error(err);
    }
  }

  async function pickCategoryJoke(jokeList) {
    const numberOfJokes = listOfCategoryJokes.length;
    let r = 0 + Math.floor(Math.random() * numberOfJokes);
    try {
      let joke = await jokeList[r];
      setCategoryJoke(joke.body);
      logger.warn("Category Joke: ", joke.body);
    } catch (err) {
      logger.error(err);
    }
  }

  function getAnotherRandomJoke() {
    setRandomJoke("");
    setCategoryJoke("");
    getRandomJoke();
  }

  function getAnotherJokeFromCategory() {
    setCategoryJoke("");
    pickCategoryJoke();
  }

  return (
    <div className="component display-component">
      <h1>Jokes!</h1>
      <Form.Select
        onClick={(e) => {
          logger.info("Option Clicked: ", e.target.value);
          getJokeByCategory(e.target.value);
        }}
      >
        <option>Select Joke Category</option>
        {categories.map((c, i) => (
          <option key={i} value={c}>
            {c}
          </option>
        ))}
      </Form.Select>
      {categoryJoke === "" ? (
        <div>
          <RandomJoke joke={randomJoke} anotherJoke={getAnotherRandomJoke} />
          <Button
            variant="solid"
            onClick={() => {
              getAnotherRandomJoke();
            }}
          >
            Surprise me!
          </Button>
        </div>
      ) : (
        <div>
          <CategoryJoke joke={categoryJoke} />
          <Button
            variant="solid"
            onClick={() => {
              getAnotherJokeFromCategory();
            }}
          >
            Next in category!
          </Button>
          <Button
            variant="solid"
            onClick={() => {
              getAnotherRandomJoke();
            }}
          >
            Surprise me!
          </Button>
        </div>
      )}
    </div>
  );
}

export default JokeComponent;
