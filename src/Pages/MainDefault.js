import React from "react";

import "../Components/Main/Main.css"

import SearchBar from "../Components/Main/SearchBar";
import SimilarGroup from "../Components/Main/SimilarGroup";
import PopularActivity from "../Components/Main/PopularActivity";
import RecommendedActivity from "../Components/Main/RecommendedActivity";
import NavBar from "../Components/Main/NavBar";

import { auth } from "../firebase"

const MainDefault = () => {

  return (
    <div className="main">
        <SearchBar />
        <div className="content-container">
            <div className="group-container">
                <SimilarGroup />
                <PopularActivity />
            </div>
            <RecommendedActivity />
        </div>
        <NavBar />
    </div>
  );
};

export default MainDefault;