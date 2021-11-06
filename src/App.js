import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Main from "./Pages/Main";
import Chat from "./Pages/Chat";
import OurPage from "./Pages/OurPage";
import Vote from "./Pages/Vote";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" elemenet={<Home/>} />
        <Route path="/main"elemenet={<Main/>} />
        <Route path="/chat" elemenet={<Chat/>}/>
        <Route path="/ourpage" elemenet={<OurPage/>} />
        <Route path="/vote" elemenet={<Vote/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
