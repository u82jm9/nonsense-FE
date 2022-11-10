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
        this.setState({ randomJoke: e.data.body[0] });
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  getJokeByCategory(category) {
    console.log(category);
    DailyJokeService.getJokeByCategory(category)
      .then((e) => {
        this.getSingleJokeFromList(e.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  getSingleJokeFromList(listJokes) {
    const numberOfJokes = listJokes.length;
    let r = 0 + Math.floor(Math.random() * numberOfJokes);
    const joke = listJokes[r];
    this.setState({ categoryJoke: joke.body });
  }

  componentDidMount() {
    this.getRandomJoke();
  }

  render() {
    return (
      <div>
        <h1>Daily Joke</h1>{" "}
        <Form
          onSubmit={(e) => {
            console.log("Submitting category: ");
            console.log(this.state.category);
            console.log(e);
          }}
        >
          <Form.Select
            value={this.state.category}
            onChange={(e) => {
              console.log(e.target.value);
              e.preventDefault();
              this.setState({ category: e.target.value });
              this.getJokeByCategory(e.target.value);
            }}
          >
            <option>Select Joke Category</option>
            {this.state.categories.map((c) => (
              <option value={c}>{c}</option>
            ))}
            <input type="submit" value="Submit"></input>
          </Form.Select>
        </Form>
        {this.state.categoryJoke === "" ? (
          <>
            <h2>{this.state.randomJoke.setup}</h2>
            <h3>{this.state.randomJoke.punchline}</h3>
          </>
        ) : (
          <h3>{this.state.categoryJoke}</h3>
        )}
      </div>
    );
  }
}

export default DailyJokeComponent;
