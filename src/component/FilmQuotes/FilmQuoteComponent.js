import React, { useState } from "react";
import quotes from "./quotes.json";
import DisplayQuoteList from "./DisplayQuoteList";
import { Button } from "react-bootstrap";

function FilmQuoteComponent() {
  const [quoteList, setQuoteList] = useState(quotes.quotes);
  const [randomQuote, setRandomQuote] = useState(quotes.quotes[0]);
  const [showList, setShowList] = useState(false);

  function getRandomQuote() {
    setRandomQuote(
      quotes.quotes[Math.floor(Math.random() * quotes.quotes.length)]
    );
  }
  return (
    <div>
      <h1>Welcome to the Film Quotes</h1>
      {showList ? (
        <div>
          <DisplayQuoteList quoteList={quoteList} />
          <Button
            onClick={() => {
              getRandomQuote();
              setShowList(false);
            }}
          >
            Show Single Quote
          </Button>
        </div>
      ) : (
        <div>
          <h1>Quote: "{randomQuote.line}"</h1>
          <Button onClick={() => setShowList(true)}>Show quote list</Button>
        </div>
      )}
    </div>
  );
}

export default FilmQuoteComponent;
