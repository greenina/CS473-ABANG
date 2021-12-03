import React, {useState, useEffect} from "react";
import '../styles/chatDesign.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import BucketAnimation from "./BucketAnimation";

import { useAuthState } from 'react-firebase-hooks/auth';
import {auth,  SignIn, SignOut} from '../firebase'
import "./Home.css";
import "../Components/Memory/Memory.css";
import zIndex from "@material-ui/core/styles/zIndex";
//import SignInButton from ".././Icons/SignInButton.png";



const Home = () => {

  const [user] = useAuthState(auth);

  useEffect(()=>{
    if(user){
      window.location.href="/main"
      console.log('hi');
    }
  },user)


  return (
      <div className='home_background'>
        <header className="backcircle">  
          <div className='animation_position'>
            <BucketAnimation/>
          </div>  
        </header>
        <section style={{position:'absolute',zIndex:'3', top:'10%', left:'70%'}}> 
            {user ? <div></div>:<SignIn />}
        </section>
      </div>

    );
};


export default Home;
