import axios from "axios";
import { useState, useEffect } from "react";
import RandomJoke from "./RandomJoke";
import CategoryJoke from "./CategoryJoke";
import { Form, Button } from "react-bootstrap";

const RANDOM_JOKE_API_URL = "https://dad-jokes.p.rapidapi.com/random/joke";
const GET_JOKE_BY_CATEGORY_API_URL =
  "https://world-of-jokes1.p.rapidapi.com/v1/jokes/jokes-by-category";
const GET_CATEGORIES_API_URL =
  "https://world-of-jokes1.p.rapidapi.com/v1/jokes/categories";
const api = axios.create({
  headers: {
    "X-RapidAPI-Key": "2e1ecbe8d9msh8883e96a112d435p1360e2jsn1d90503594e6",
    "X-RapidAPI-Host": "world-of-jokes1.p.rapidapi.com",
  },
});
function JokeComponent() {
  const [randomJoke, setRandomJoke] = useState("");
  const [categoryJoke, setCategoryJoke] = useState("");
  const [listOfCategoryJokes, setListOfCategoryJokes] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getRandomJoke();
    categories.length === 0 && getCategories();
  }, []);
  useEffect(() => {
    pickCategoryJoke();
  }, [listOfCategoryJokes]);

  async function getCategories() {
    try {
      console.log("Getting Categories!");
      const r = await api.get(GET_CATEGORIES_API_URL);
      setCategories(r.data);
    } catch (err) {
      console.error(err);
    }
  }

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
    try {
      console.log("Getting joke in Category: ", category);
      const r = await api.get(GET_JOKE_BY_CATEGORY_API_URL, {
        params: {
          limit: "100",
          page: "1",
          category: category,
          sortBy: "score:desc",
        },
      });
      console.log("Got " + r.data.results.length + " Jokes!");
      setListOfCategoryJokes(r.data.results);
    } catch (err) {
      console.error(err);
    }
  }

  async function pickCategoryJoke() {
    console.log("Picking single joke from selcted category.");
    const numberOfJokes = listOfCategoryJokes.length;
    let r = 0 + Math.floor(Math.random() * numberOfJokes);
    let joke = listOfCategoryJokes[r];
    setCategoryJoke(joke.body);
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
          console.log("Option Clicked: ", e.target.value);
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
