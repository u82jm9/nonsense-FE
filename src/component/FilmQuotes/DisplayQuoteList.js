import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import QuoteDisplayer from "./QuoteDisplayer";

const DisplayQuoteList = ({ quoteList }) => {
  const [tempList, setTempList] = useState(
    quoteList.sort(() => Math.random() - 0.5)
  );
  const [smallerLists, setSmallerLists] = useState([]);
  const [listRef, setListRef] = useState(0);
  const [filterSubject, setFilterSubject] = useState("quote");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [timer, setTimer] = useState(null);
  useEffect(() => {
    createSmallerLists();
  }, [tempList]);
  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, [timer]);

  function createSmallerLists() {
    setSmallerLists([]);
    console.log("State tempList: ", tempList);
    let sl = [];
    let numberOfLists = Math.ceil(tempList.length / 5);
    for (let i = 0; i < numberOfLists; i++) {
      let start = i * 5;
      let end = start + 5;
      sl.push(tempList.slice(start, end));
    }
    setSmallerLists(sl);
    console.log(sl);
  }

  function handleSortClick(e) {
    const sortBy = e.target.value;
    console.log("tempList: " + tempList);
    let ntl = [...tempList];
    if (sortBy === "film") {
      console.log("Film Sort");
      ntl = ntl.sort(function (a, b) {
        return a.film.localeCompare(b.film);
      });
    } else if (sortBy === "actor") {
      console.log("Actor Sort");
      ntl = ntl.sort(function (a, b) {
        return a.actor.localeCompare(b.actor);
      });
    }
    console.log("New Temp List", ntl);
    setTempList(ntl);
  }
  function handleSearch(e) {
    const searchTerm = e.target.value;
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
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
    }, 300);
    setTimer(newTimer);
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
            <input
              type="text"
              id="filter"
              placeholder="Search ..."
              onChange={(e) => handleSearch(e)}
              onBlur={() => {
                setTimeout(() => {
                  setShowSearchBar(false);
                }, 2500);
              }}
            ></input>
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
      <div>
        <div>
          {smallerLists[listRef] &&
            smallerLists[listRef].map((quote, i) => {
              return (
                <div key={i}>
                  <QuoteDisplayer quote={quote} />
                </div>
              );
            })}
        </div>
        <div className="controls">
          <Button
            onClick={() => {
              if (listRef !== 0) {
                setListRef(listRef - 1);
              } else {
                setListRef(smallerLists.length - 1);
              }
            }}
          >
            Back
          </Button>
          <Button
            onClick={() => {
              if (listRef === smallerLists.length - 1) {
                setListRef(0);
              } else {
                setListRef(listRef + 1);
              }
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DisplayQuoteList;
