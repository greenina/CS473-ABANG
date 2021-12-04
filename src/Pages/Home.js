import React, {useState, useEffect} from "react";
import '../styles/chatDesign.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth,  SignOut} from '../firebase'
import SignIn from '../Components/SignIn'
import Main from './Main'
import {connect} from 'react-redux'
import {setEmail} from '../store/modules/counter'

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
      console.log("EMAIL",user.email)
      await setEmail(user.email)
      await console.log("email!",props.email)
      await (()=>window.location.href="/main")
    }
    if(user){
      console.log("EMAIL",user.email)
      setEmail(user.email)
      window.location.href="/main"
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
