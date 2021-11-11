import { initializeApp } from '@firebase/app';
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD0gBx7wsHSs0i2mNfFuOzimTNMvBrOzko",
  authDomain: "abang-803aa.firebaseapp.com",
  projectId: "abang-803aa",
  storageBucket: "abang-803aa.appspot.com",
  messagingSenderId: "308566395170",
  appId: "1:308566395170:web:4b4dfb498510aeb98dfd7b"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;
