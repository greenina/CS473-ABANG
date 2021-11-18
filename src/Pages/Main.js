import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainDefault from "./MainDefault";
import MainSearch from "./MainSearch";

const Main = () => {
  return (

    // <BrowserRouter>
    <div>
      hi
      <Router>
      <Routes>
        <Route exact path="/main" element={<MainDefault/>} />
        <Route path="/main/search" element={<MainSearch/>} />
      </Routes>
      </Router>
      </div>
    // </BrowserRouter>

  );
};

export default Main;
