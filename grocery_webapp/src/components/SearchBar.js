import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/SearchBar.css";
import { findWordEntered } from "./Query";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import findStores from './findStores';
import GetLocation from './GetLocation';

const useCookies = require("react-cookie");
function timeout() {
  return new Promise(res => setTimeout(res, 1000));
}

function SearchBar({ placeholder, data }) {
  const [cookies, setCookie] = useCookies.useCookies(['name']);
  const navigate = useNavigate();
  const getLocation = GetLocation();

  /* when change is made and if the key hit is entered, then user is linked to page about searched item. 
  Additionally, entered value is assigned to a variable in another file through findWordEntered function. */
  const handleKeyDown = async (change) => {
    const location = {
      lat: getLocation.coords.lat,
      lng: getLocation.coords.lng,
    };

    console.log(location.lat);
    console.log(location.lng);
    let text = await findStores(location.lat, location.lng);

    setCookie('name', text, { path: '/' });
    if (change.key === 'Enter') {
      findWordEntered(change.target.value);
      try {
        console.log(change.target.value);
        fetch("/remove", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        });
        await timeout();
        fetch("/scrape", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ thing: change.target.value })
        });
      } catch (error) { throw error };
      navigate(`/results/${change.target.value}`);
    }
  }

  /* creates variable called filteredData with a function setFilteredData*/
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  /* filtering data results to show based on typed searchWord*/
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    })

    /* to not display the options below the search bar if there is nothing there*/
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  }

  /* function to get CloseIcon to clear the text in the search bar*/
  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input type="text" placeholder={placeholder} value={wordEntered} onChange={handleFilter} onKeyDown={handleKeyDown} />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}

        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a className="dataItem" href={value.link} target="_blank">
                {" "}
                {value.title} </a>
            );
          })}
        </div>
      )}
    </div>
  )
}

export default SearchBar 
