import React, {useState, useEffect} from "react";
import '../styles/chatDesign.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth, db, SignOut} from '../firebase'
import SignIn from '../Components/SignIn'
import Main from './Main'
import {connect} from 'react-redux'
import {setEmail} from '../store/modules/counter'
import { arrayUnion, updateDoc } from "firebase/firestore";

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
      await updateDoc(db.collection('group').doc('groupB'), {friends: arrayUnion({email:user.email, name:user.displayName})})
      await (()=>window.location.href="/main")
    }
    if(user){
      // console.log("EMAIL",user.email)
      // setEmail(user.email)
      // window.location.href="/main"
      save()
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


export default connect(mapStateToProps, mapDispatchToProps)(Home);
