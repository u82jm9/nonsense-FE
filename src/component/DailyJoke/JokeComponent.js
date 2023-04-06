import axios from "axios";
import { useState } from "react";
import RandomJoke from "./RandomJoke";
import CategoryJoke from "./CategoryJoke";
import { Form, Button } from "react-bootstrap";

const RANDOM_JOKE_API_URL = "https://dad-jokes.p.rapidapi.com/random/joke";
const GET_JOKE_BY_CATEGORY_API_URL =
  "https://world-of-jokes1.p.rapidapi.com/v1/jokes/jokes-by-category";

function JokeComponent() {
  const [randomJoke, setRandomJoke] = useState(getRandomJoke());
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

  async function getRandomJoke() {
    let j;
    try {
      console.log("Getting Random Joke!");
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
      console.log("Got a joke, hope it's funny!");
      setRandomJoke(j.data.body[0]);
    } catch (err) {
      console.error(err);
    }
  }

  async function getJokeByCategory(category) {
    let j;
    try {
      console.log("Getting joke in Category: ", category);
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
      console.log("Got a list of category jokes!");
      setListOfCategoryJokes(j.data.results);
      pickCategoryJoke(j.data.results);
    } catch (err) {
      console.error(err);
    }
  }

  async function pickCategoryJoke(jokeList) {
    const numberOfJokes = jokeList.length;
    let r = 0 + Math.floor(Math.random() * numberOfJokes);
    try {
      let joke = await jokeList[r];
      setCategoryJoke(joke.body);
      console.log("Category Joke: ", joke.body);
    } catch (err) {
      console.error(err);
    }
  }

  function getAnotherRandomJoke() {
    getRandomJoke();
  }

  function getAnotherJokeFromCategory() {
    setCategoryJoke("");
    pickCategoryJoke(listOfCategoryJokes);
  }

  return (
    <div className="component display-component">
      <h1>Jokes!</h1>
      <Form.Select
        onClick={(e) => {
          console.log("Option Clicked: ", e.target.value);
          getJokeByCategory(e.target.value);
        }}
      >
        <option>Select Joke Category</option>
        {categories.map((c) => (
          <option value={c}>{c}</option>
        ))}
      </Form.Select>
      {categoryJoke === "" ? (
        <div>
          <RandomJoke joke={randomJoke} anotherJoke={getAnotherRandomJoke} />
          <Button
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
            onClick={() => {
              getAnotherJokeFromCategory();
            }}
          >
            Next in category!
          </Button>
          <Button
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
