import axios from "axios";

const RANDOM_JOKE_API_URL = "https://dad-jokes.p.rapidapi.com/random/joke";
const GET_JOKE_BY_CATEGORY_API_URL =
  "https://world-of-jokes1.p.rapidapi.com/v1/jokes/jokes-by-category";

class DailyJokeService {
  getRandomJoke() {
    console.log("Getting Random Joke!");
    const options = {
      method: "GET",
      url: RANDOM_JOKE_API_URL,
      headers: {
        "X-RapidAPI-Key": "2e1ecbe8d9msh8883e96a112d435p1360e2jsn1d90503594e6",
        "X-RapidAPI-Host": "dad-jokes.p.rapidapi.com",
      },
    };
    return axios.request(options);
  }
  getJokeByCategory(category) {
    console.log("Getting joke in category: " + category);
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
        "X-RapidAPI-Key": "2e1ecbe8d9msh8883e96a112d435p1360e2jsn1d90503594e6",
        "X-RapidAPI-Host": "world-of-jokes1.p.rapidapi.com",
      },
    };

    return axios.request(options);
  }
}

export default new DailyJokeService();
