import React from "react";
import { Form } from "react-bootstrap";
import DailyJokeService from "../../services/DailyJokeService";

class DailyJokeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      randomJoke: {},
      categories: [
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
      ],
      category: "",
      categoryJoke: "",
    };
    this.getRandomJoke = this.getRandomJoke.bind(this);
    this.getJokeByCategory = this.getJokeByCategory.bind(this);
    this.getSingleJokeFromList = this.getSingleJokeFromList.bind(this);
  }

  getRandomJoke() {
    DailyJokeService.getRandomJoke()
      .then((e) => {
        console.log(e.data.body[0]);
        this.setState({ randomJoke: e.data.body[0] });
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  getJokeByCategory() {
    DailyJokeService.getJokeByCategory(this.state.category)
      .then((e) => {
        console.log(e.data);
        this.getSingleJokeFromList(e.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  getSingleJokeFromList(listJokes) {
    const numberOfJokes = listJokes.length;
    const r = 0 + Math.random * numberOfJokes;
    const joke = listJokes[r];
    console.log(joke);
    this.setState({ categoryJoke: joke });
  }

  componentDidMount() {
    this.getRandomJoke();
  }

  render() {
    return (
      <div>
        <h1>Daily Joke</h1>
        <p>{this.state.randomJoke.setup}</p>
        <p>{this.state.randomJoke.punchline}</p>
        <Form
          onClick={(e) => {
            e.preventDefault();
            this.setState({ category: e.target.value });
            this.getJokeByCategory();
            this.setState({ category: "" });
          }}
        >
          <Form.Select>
            <option>Select Joke Category</option>
            {this.state.categories.map((c) => (
              <option value={c}>{c}</option>
            ))}
          </Form.Select>
        </Form>
        <p>{this.state.categoryJoke}</p>
      </div>
    );
  }
}

export default DailyJokeComponent;
