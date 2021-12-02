import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainDefault from "./MainDefault";
import MainSearch from "./MainSearch";
import {auth, db} from '../firebase'
import { arrayUnion, updateDoc } from "firebase/firestore";

const Main = () => {
  // const [email, setEmail] = useState()
  // const [name, setName] = useState()
  useEffect(()=>{
    // setEmail(auth.currentUser.email)
    // setName(auth.currentUser.name)
    console.log("enrolling")
    async function enroll(){
      
      await updateDoc(db.collection('group').doc('groupB'), {friends: arrayUnion({email:auth.currentUser.email, name:auth.currentUser.name})})
      await db.collection('group').doc('groupB').get().then((doc)=>{
        console.log(doc.data.friends)
      })
      await console.log("enrolled!")
    }
    enroll()
  },[])

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
