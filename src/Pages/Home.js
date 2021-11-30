import React, {useState, useEffect} from "react";
import '../styles/chatDesign.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth,  SignIn, SignOut} from '../firebase'
// import {SignIn} from '../Components/SignIn'


const Home = () => {

  const [user] = useAuthState(auth);

  useEffect(()=>{
    if(user){
      window.location.href="/main"
      console.log('hi');
    }
  },user)


  return (
      <div className="Chat">
        <header>    
        </header>
        <section>
          {user ? <div></div>:<SignIn />}
        </section>
      </div>
    );
};


export default Home;
