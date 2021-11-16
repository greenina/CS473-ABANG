
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/auth';



const firebaseConfig = {
  apiKey: "AIzaSyD0gBx7wsHSs0i2mNfFuOzimTNMvBrOzko",
  authDomain: "abang-803aa.firebaseapp.com",
  projectId: "abang-803aa",
  databaseURL: "gs://abang-803aa.appspot.com",
  storageBucket: "abang-803aa.appspot.com",
  messagingSenderId: "308566395170",
  appId: "1:308566395170:web:4b4dfb498510aeb98dfd7b"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.firestore().enablePersistence();
const auth = firebase.auth();
const db = firebaseApp.firestore();
const storage = firebase.storage();

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

export {db, firebaseApp, firebase, storage, auth, SignIn, SignOut};


