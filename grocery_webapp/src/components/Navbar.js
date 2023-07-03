import React, { useState } from 'react';
import vincentFace from "../assets/vincentFace.PNG";
import { Link } from "react-router-dom";
import ReorderIcon from '@mui/icons-material/Reorder';
import "../styles/Navbar.css";
import SearchBar from "./SearchBar.js";
import BookData from "../Data.json"

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  }

  return (
    <div className="navbar">

      <div className="leftSide" id={openLinks ? "open" : "close"}>
        <img src={vincentFace} />
        <div className="hiddenLinks">
          <Link to="/"> Home </Link>
          <Link to="/shoppingList"> Shopping List </Link>
          <Link to="/help"> Help </Link>
          <Link to="/contact"> Contact Us </Link>
        </div>
      </div>

      <div className="searchbar">
         <SearchBar placeholder="Search Products" data={BookData}/>
      </div>

      <div className="rightSide"> 
        <Link to="/"> Home </Link>
        <Link to="/shoppingList"> Shopping List </Link>
        <Link to="/help"> Help </Link>
        <Link to="/contact"> Contact Us </Link>
        <button onClick={toggleNavbar}>
          <ReorderIcon/>   
        </button>
      </div>

    </div>
  )
}

export default Navbar