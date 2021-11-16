import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import MainDefault from "./Pages/MainDefault";
import MainSearch from "./Pages/MainSearch";
import Bucket from "./Pages/Bucket";
import MemoryView from "./Pages/MemoryView";
import MemoryEdit from "./Pages/MemoryEdit";
import Chat from "./Pages/Chat";
import OurPage from "./Pages/OurPage";
import Vote from "./Pages/Vote";
import Ourpage_Edit from './Pages/Ourpage_edit copy';
import Bucket_Edit from "./component/bucket";
import Bucketdata from "./component/bucketdata";


import { db, storage } from "./firebase";


const App = () => {
  const [bucketRef, setBucketRef] = useState('wishes');
  const [memoryRef, setMemoryRef] = useState('memories');
  // db.collection('wishes').doc('0zcwkyqNN2MFDtY7IRyi').onSnapshot(snapshot => console.log(snapshot))

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />

        <Route exact path="/main" element={<MainDefault/>} />
        <Route path="/main/search" element={<MainSearch/>} />

        <Route 
          path="/bucket" 
          element={<Bucket
            bucketRef={db.collection(bucketRef)}
          />} 
        />

        <Route 
          path="/bucket/:bid/memory/:id" 
          element={<MemoryView 
            memoryRef={db.collection(memoryRef)} 
          />} 
        />
        <Route 
          path="/bucket/:bid/memory/:id/edit" 
          element={<MemoryEdit
            bucketRef={db.collection(bucketRef)}
            memoryRef={db.collection(memoryRef)}
            storageRef={storage.ref('/photos')}
          />} 
        />

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
