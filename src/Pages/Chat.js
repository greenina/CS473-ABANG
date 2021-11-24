import React, {useEffect, useState} from "react";
import '../styles/chatDesign.css';
import SpeedDial from '../styles/speedDial';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {auth, db, SignIn} from '../firebase'


function Chat() {

  const [user] = useAuthState(auth);
  useEffect(()=>{
    console.log("AUTH",user)
  },[])

  return (
    <div className="Chat">
      <header>    
      </header>
      <section>
        <ChatRoom />
        {/* {user ? 
          <ChatRoom /> : <SignIn />} */}
      </section>
    </div>
  );
}


function ChatRoom() {
  //const groupBelongTo = firestore.collection('group').whereField('friends', isEqual)  
  const messagesRef = db.collection('message2');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  const [formValue, setFormValue] = useState('');

  const sendMessage = async(e) => {
    e.preventDefault();
    const { email, photoURL } = auth.currentUser;
    await messagesRef.add({
      isText:true,
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      email,
      photoURL 
    })

    setFormValue('');
  }

  useEffect(()=>{
    console.log("VALUE",formValue)
    console.log("user",auth.currentUser)
  },[formValue])

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
          <button className="clickable" type = "submit"  style={{width:"auto", backgroundColor:"#FFFEDB", color:"#829B89",borderWidth:0, boxShadow:"0px 2px 4px rgba(0, 0, 0, 0.25)", borderRadius:"10px"}}>Send</button>
        </form>
      </div>
      </div>
    </div>
    </>
  )
}

const chatVote = (props)=>{
  const goVote = () =>{
    window.location.href = "/vote/groupA/"+props.vote.index.toString()
  }
  return(
    <div>
      <div>{props.vote.name}</div>
      <button onClick={goVote}>GO to VOTE</button>
    </div>
  )
}

function ChatMessage(props) {
  const { isText, text, email, photoURL } = props.message;

  const messageClass = email === auth.currentUser.email ? 'sent' : 'received';

  
  if(messageClass ==='sent'){
    return (
    <div>
      <div className = {'message ${messageClass}'} style={{display:"flex", justifyContent:"flex-end", alignItems:"center"}}>
      <p class="msg-box" style={{backgroundColor:"#FFFFFF"}}>{isText?text:<div>
      <div>{text.name}</div>
      <button onClick={()=>window.location.href = "/vote/groupA/"+text.index.toString()}>GO to VOTE</button>
    </div>}</p>
      <img class="user-img" src = {photoURL} />
    </div>
    </div>
    );
  }
  else{
    return (
    
      <div className = {'message ${messageClass}'} style={{display:"flex", justifyContent:"flex-start", alignItems:"center"}}>
      <img class="user-img" src = {photoURL} />
      <p class="msg-box" style={{backgroundColor:"#FFFDD0"}}>{isText?text:<div>
      <div>{text.name}</div>
      <button onClick={()=>window.location.href = "/vote/groupA/"+text.index.toString()}>GO to VOTE</button>
    </div>}</p>
      
    </div>
    );
  }

}

export default Chat;
