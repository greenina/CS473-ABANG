import React, {useState} from "react";
import '../styles/chatDesign.css';
import SpeedDial from '../styles/speedDial';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

// import { SpeedDial } from '@mui/material';


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

function Chat() {

  const [user] = useAuthState(auth);

  return (
    <div className="Chat">
      <header>    
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
    <button onClick = {signInWithGoogle}>Sign in with google.</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick = {() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  const [formValue, setFormValue] = useState('');

  const sendMessage = async(e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL 
    })

    setFormValue('');
  }

  return (
    <>
    <div>
    <div style={{ display:"flex", flexDirection:"column",justifyContent:"flex-end",background:"#EAF6F4", maxWidth: "20vw", width:"20vw", height:"80vh"}}>
      <div style={{position:"fixed", top:"10vh", right:"40vw", padding:5}}>
      <SpeedDial />
      </div>
      <div style={{padding:"10px", overflow:"auto"}}>
        {messages && messages.map(msg => <ChatMessage key = {msg.id} message = {msg}/>)}
      </div>
      <div style={{backgroundColor:"#EBEDD0"}}>
      
        <form onSubmit = {sendMessage} style={{padding:"10px", height:"20px", display:"flex", alignItems:"center"}}>
          <input style={{width:"80%", marginRight:"5%", borderColor:"white", borderRadius:"6px",borderWidth:0, boxShadow:" 0px 2px 4px rgba(0, 0, 0, 0.25)  "}} value = {formValue} onChange = {(e) => setFormValue(e.target.value)}/>
          <button type = "submit"  style={{width:"auto", backgroundColor:"#FFFEDB", color:"#829B89",borderWidth:0, boxShadow:"0px 2px 4px rgba(0, 0, 0, 0.25)", borderRadius:"10px"}}>Send</button>
        </form>
      </div>
      </div>
    </div>
    </>
  )
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  
  if(messageClass ==='sent'){
    return (
    <div>
      <div className = {'message ${messageClass}'} style={{display:"flex", justifyContent:"flex-end", alignItems:"center"}}>
      <p class="msg-box" style={{backgroundColor:"#FFFFFF"}}>{text}</p>
      <img class="user-img" src = {photoURL} />
    </div>
    </div>
    );
  }
  else{
    return (
    
      <div className = {'message ${messageClass}'} style={{display:"flex", justifyContent:"flex-start", alignItems:"center"}}>
      <img class="user-img" src = {photoURL} />
      <p class="msg-box" style={{backgroundColor:"#FFFDD0"}}>{text}</p>
      
    </div>
    );
  }

}

export default Chat;
