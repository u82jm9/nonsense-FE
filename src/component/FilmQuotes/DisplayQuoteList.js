import { useEffect, useState } from "react";
import QuoteDisplayer from "./QuoteDisplayer";

const DisplayQuoteList = ({ quoteList }) => {
  const [tempList, setTempList] = useState(quoteList);
  const [filterSubject, setFilterSubject] = useState("quote");
  const [showSearchBar, setShowSearchBar] = useState(false);
  let timer = null;
  useEffect(() => {
    setTempList(quoteList.sort(() => Math.random() - 0.5));
  }, [quoteList]);

  function handleSortClick(e) {
    const sortBy = e.target.value;
    if (sortBy === "film") {
      setTempList(
        quoteList.sort(function (a, b) {
          return a.film.localeCompare(b.film);
        })
      );
    } else if (sortBy === "actor") {
      setTempList(
        quoteList.sort(function (a, b) {
          return a.actor.localeCompare(b.actor);
        })
      );
    }
  }
  function handleSearch(e) {
    const searchTerm = e.target.value;
    clearTimeout(timer);
    if (filterSubject === "quote") {
      setTempList(
        quoteList.filter((quote) =>
          quote.line.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else if (filterSubject === "actor") {
      setTempList(
        quoteList.filter((quote) =>
          quote.actor.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else if (filterSubject === "film") {
      setTempList(
        quoteList.filter((quote) =>
          quote.film.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    timer = setTimeout(() => {
      setShowSearchBar(false);
    }, 2500);
  }
  return (
    <div>
      <div>
        <ul>
          <select
            name="filter"
            id="filter"
            onClick={(e) => {
              console.log("Filter click");
              setFilterSubject(e.target.value);
              setShowSearchBar(true);
            }}
          >
            <option value="">Filter by: </option>
            <option value="quote">Quote</option>
            <option value="film">Film</option>
            <option value="actor">Actor</option>
          </select>
        </ul>
        {showSearchBar && (
          <div>
            <textarea
              rows="1"
              id="filter"
              placeholder="Search ..."
              onChange={(e) => handleSearch(e)}
              onBlur={() => {
                setTimeout(() => {
                  setShowSearchBar(false);
                }, 2500);
              }}
            ></textarea>
          </div>
        )}
      </div>
      <div>
        <ul>
          <select
            name="sort"
            id="sorter"
            onClick={(e) => {
              console.log("Sort click");
              handleSortClick(e);
            }}
          >
            <option value="">Sort:</option>
            <option value="film">By Film</option>
            <option value="actor">By Actor</option>
          </select>
        </ul>
      </div>
      {tempList.map((quote, index) => {
        return (
          <div key={index}>
            <QuoteDisplayer quote={quote} />
          </div>
        );
      })}
    </div>
  );
};

export default DisplayQuoteList;
