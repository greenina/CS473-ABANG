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
        <Route path="/" element={<Home/>} />
        <Route path="/main"element={<Main/>} />
        <Route path="/chat" element={<Chat/>}/>
        <Route path="/ourpage" element={<OurPage/>} />
        <Route path="/vote" element={<Vote/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
