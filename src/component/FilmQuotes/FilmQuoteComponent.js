import React, { useState } from "react";
import quotes from "./quotes.json";
import DisplayQuoteList from "./DisplayQuoteList";
import { Button } from "react-bootstrap";
import QuoteDisplayer from "./QuoteDisplayer";

function FilmQuoteComponent() {
  const quoteList = quotes.quotes;
  const [randomQuote, setRandomQuote] = useState(quotes.quotes[0]);
  const [showList, setShowList] = useState(false);

  function getRandomQuote() {
    setRandomQuote(
      quotes.quotes[Math.floor(Math.random() * quotes.quotes.length)]
    );
  }
  return (
    <div className="component display-component">
      <h1>Quotes!</h1>
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
          <QuoteDisplayer quote={randomQuote} />
          <Button onClick={() => setShowList(true)}>Show quote list</Button>
          <Button
            onClick={() => {
              getRandomQuote();
            }}
          >
            Surprise me!
          </Button>
        </div>
      )}
    </div>
  );
}

export default FilmQuoteComponent;
