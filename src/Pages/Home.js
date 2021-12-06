import React, {useState, useEffect} from "react";
import '../styles/chatDesign.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import BucketAnimation from "./BucketAnimation";

import { useAuthState } from 'react-firebase-hooks/auth';
import {auth, db, SignIn, SignOut} from '../firebase'
// import SignIn from '../Components/SignIn'
import Main from './Main'
import {connect} from 'react-redux'
import {setEmail} from '../store/modules/counter'
import { arrayUnion, updateDoc } from "firebase/firestore";

import "./Home.css"

const mapStateToProps = (state) => ({
  email: state.counter.email
});
const mapDispatchToProps = (dispatch) => ({
  setEmail: (email) => dispatch(setEmail( email)),
});
const Home = (props) => {

  const [user] = useAuthState(auth);
  const {email, setEmail} = props
  useEffect(()=>{
    async function save(){
      console.log("saving~~")
      debugger;
      db.collection('group').doc('groupB').get().then((doc)=>{
        const friends = doc.data().friends
        console.log("Friends", friends)
        if(friends.some(person => person.email === user.email)){
          console.log("in friends list")
        } else{
          updateDoc(db.collection('group').doc('groupB'), {friends: arrayUnion({email:user.email, name:user.displayName})})
        }
      })
      // await (()=>window.location.href="/main")
      window.location.href="/main"
    }
    if(user){

      save()
    }
  },user)


  return (
      <div className='home_background'>
        <div className="backcircle"></div> 
        <div className='animation_position'>
          <BucketAnimation/>
        </div>  
        <section style={{position:'absolute',zIndex:'3', top:'10%', right:'10%'}}> 
            {user ? <div></div>:<SignIn />}
            {/* <SignIn /> */}
        </section>
      </div>

    );
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);
