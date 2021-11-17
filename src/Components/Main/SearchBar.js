import React from "react";
import { Link } from "react-router-dom";

import "./SearchBar.css";

import searchIcon from "../../Icons/Search.png";
import closeIcon from "../../Icons/Close.png";

const SearchBar = ({item}) => {
    if(item) {
        return (
            <div className="searchbar-container">
                <div className="searchbar-placeholder">
                    { item }
                </div>
                <div className="searchbar-icon">
                    <Link to="/main">
                        <img src={closeIcon} />
                    </Link>
                </div>
            </div>
        );
    }
    return (
        <Link to="/main" className="searchbar-container">
            <div className="searchbar-placeholder">
                Search for activity or group
            </div>
            <div className="searchbar-icon">
                <img src={searchIcon} />  
            </div>
        </Link>
    );
};

export default SearchBar;