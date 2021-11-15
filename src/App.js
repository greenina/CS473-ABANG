import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Main from "./Pages/Main";
import Chat from "./Pages/Chat";
import OurPage from "./Pages/OurPage";
import Vote from "./Pages/Vote";
import Ourpage_Edit from './Pages/Ourpage_edit copy';
import Bucket_Edit from "./component/bucket";
import Bucketdata from "./component/bucketdata";



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/main"element={<Main/>} />
        <Route path="/chat" element={<Chat/>}/>
        <Route path="/ourpage" element={<OurPage/>} />
        <Route path="/ourpage/edit" element={<Ourpage_Edit/>} /> //Ourpage_edit copy
        <Route path="/ourpage/bucket" element={<Bucket_Edit/>} />
        <Route path="/ourpage/bucketdata" element={<Bucketdata/>} />
        <Route path="/vote" element={<Vote/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
