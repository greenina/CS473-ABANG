import React, {useState, useEffect} from "react";
import '../styles/chatDesign.css';
import SpeedDial from '../styles/speedDial';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyD0gBx7wsHSs0i2mNfFuOzimTNMvBrOzko",
  authDomain: "abang-803aa.firebaseapp.com",
  projectId: "abang-803aa",
  storageBucket: "abang-803aa.appspot.com",
  messagingSenderId: "308566395170",
  appId: "1:308566395170:web:4b4dfb498510aeb98dfd7b"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

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


function SignIn() {
  console.log('login page..');
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  console.log('provider');
  return (
    <button onClick = {signInWithGoogle}>Sign in with google.</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick = {() => auth.signOut()}>Sign Out</button>
  )
}

export default Home;
