import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/auth';
import { arrayUnion, updateDoc } from "firebase/firestore";
import { connect } from "react-redux";
import {setEmail} from './store/modules/counter'



const firebaseConfig = {
  apiKey: "AIzaSyA9QuWiTKqSqS7dNRUWSoWp3pHjxgYqwSY",
  authDomain: "abang2-3e855.firebaseapp.com",
  projectId: "abang2-3e855",
  storageBucket: "abang2-3e855.appspot.com",
  messagingSenderId: "1074718648223",
  appId: "1:1074718648223:web:78ccaf8e9ff20103a73faa"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.firestore().enablePersistence();
const auth = firebase.auth();
const db = firebaseApp.firestore();
const storage = firebase.storage();

const mapStateToProps = (state) => ({
  email: state.counter.email,

});
const mapDispatchToProps = (dispatch) => ({
  setEmail: (category) => dispatch(setEmail(category)),
});

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  // // updateDoc(db.collection('group').doc('groupB'), {friends: arrayUnion({email:auth.currentUser.email, name:auth.currentUser.name})})
  }

  console.log('provider');
  return (
    <button onClick = {signInWithGoogle}>Sign in with google.</button>
  )
}

function SignOut() {
  const signOutWithGoogle = () => {
    auth.signOut()
    window.location.href='/home'
  }
  return auth.currentUser && (
    <button onClick = {signOutWithGoogle}>Sign Out</button>
  )
}

export {db, firebaseApp, firebase, storage, auth, SignIn, SignOut};


