
import React, {useEffect, useState, useRef} from "react";
import '../styles/chatDesign.css';
import SpeedDial from '../styles/speedDial';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {auth, db, SignIn} from '../firebase'
import setVote from '../store/modules/counter'
import { connect } from "react-redux";
import GoToVote from '../Icons/GoToVote.png';
import VoteEnd from '../Icons/VoteEnd.png';

const mapStateToProps = (state) =>({
  vid : state.counter.vid
})
const mapDispatchToProps = (dispatch) => ({
  setVote :(vid) =>dispatch(setVote(vid))
});




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
        {user ? 
          <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}


function ChatRoom() {
  //const groupBelongTo = firestore.collection('group').whereField('friends', isEqual)  
  const messagesRef = db.collection('message2');
  const query = messagesRef.orderBy('createdAt');

  const [messages] = (useCollectionData(query, {idField: 'id'}));
  
  const [groupName, setGroupName] = useState(null)

  const [formValue, setFormValue] = useState('');

useEffect(() => {
  db.collection('group').doc('groupB').get().then(s => {
    if(s.exists && s.data().info) setGroupName(s.data().info.groupName)
  })
}, [])

  const refreshPage = () => {
    window.location.reload();
  }

  const sendMessage = async(e) => {
    e.preventDefault();
    const { email, photoURL } = auth.currentUser;
    await messagesRef.add({
      isText:1,
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
    <div className="background">
      <div style={{position:"fixed", top:"10vh", right:"40vw", padding:5}}>
      <div className='top-bar-container'>
        <div className='chat-group-name'>{groupName}</div>
        <div className="rearrange-speeddial"><SpeedDial /></div>
      </div>
      </div>
      <div style={{ display:"flex", flexDirection:"column-reverse", overflowY:"auto"}}>
      <div style={{ display:"flex", flexDirection:"column",justifyContent:"flex-end", padding:"10px",  height: "calc(100vh - 80px)"}}>
        <div style={{marginTop:"auto"}}></div>
        {messages && messages.map(msg => <ChatMessage message = {msg}/>)}
        
      </div>
      </div>
      <div className="bottom-bar-container">
        <form onSubmit = {sendMessage} style={{padding:"10px", height:"20px", display:"flex", alignItems:"center"}}>
          <input className="chat-box" style={{width:"100%", marginRight:"5%", borderColor:"white", borderRadius:"6px",borderWidth:0, boxShadow:" 0px 2px 4px rgba(0, 0, 0, 0.25) "}} value = {formValue} onChange = {(e) => setFormValue(e.target.value)}/>
          
          <button onclick={refreshPage} className="clickable" type = "submit" style={{width:"150px", marginTop:"35px", fontSize:'20px', height: '50px', backgroundColor:"#FFFEDB", color:"#4F6148",borderWidth:0, boxShadow:"0px 2px 4px rgba(0, 0, 0, 0.25)", borderRadius:"10px"}}><div className='font-eng'>Send</div></button>

        </form>
      </div>
      </div>
    </div>
    </>
  )
}




function ChatMessage(props) {
  const { isText, text, email, photoURL, ref } = props.message;
  console.log("chagmsg",props)
  const {vid} = props

  const messageClass = email === auth.currentUser.email ? 'sent' : 'received';
  
  if(messageClass ==='sent'){
    return (
    <div>
      <div className = {'message ${messageClass}'} style={{display:"flex", justifyContent:"flex-end", alignItems:"center"}}>
      <p class="msg-box" style={{backgroundColor:"#FFFFFF"}}>
        {isText==3?
        <div>
          <button className='share-name clickable' style={{border:'10px', borderRadius:'10px', backgroundColor:'#FFFFFF',boxShadow:" 0px 2px 4px rgba(0, 0, 0, 0.25) "}} onClick={()=>window.location.href = text.link}>{text.name}</button>
        </div>:
        (isText==1?<div className="plain-text">{text}</div>:
        (isText==2?
          <div>
            <center><button className="clickable" style={{border:'0px', outline:'0px', backgroundColor:'#FFF'}} onClick={()=>window.location.href = "/vote/"+ ref}><img src ={GoToVote} height='150px'/></button>
            <div className='vote-name'>{text.name}</div></center>
          </div>
        :(isText==4?
          <div>
            <center><button className="clickable" style={{border:'0px', outline:'0px', backgroundColor:'#FFF'}} onClick={()=>window.location.href = "/vote/"+ text.vid+"/result"}><img src ={VoteEnd} height='150px'/></button>
            <div className='vote-name'>{text.name}</div></center>
          </div>
        // <div>vid:<button onClick={()=>window.location.href = "/vote/"+ text.vid+"/result"}>{text.vid}</button></div>
        :<div>"isText?"{isText}</div>)
        ))}
      </p>
      <img class="user-img" src = {photoURL} />
    </div>
    </div>
    );
  }
  else{
    return (
    
      <div className = {'message ${messageClass}'} style={{display:"flex", justifyContent:"flex-start", alignItems:"center"}}>
      <img class="user-img" src = {photoURL} />
      <p class="msg-box" style={{backgroundColor:"#F8E6A7"}}>{isText==3?<div>
      <button className='share-name clickable' style={{border:'10px', borderRadius:'10px', backgroundColor:'#FFFFFF',boxShadow:" 0px 2px 4px rgba(0, 0, 0, 0.25) "}} onClick={()=>window.location.href = text.link}>{text.name}</button>
    </div>:(isText==1?<div className="plain-text">{text}</div>:(isText==2?<div>
      <center><button className="clickable" style={{border:'0px', outline:'0px', backgroundColor:'#F8E6A7'}} onClick={()=>window.location.href = "/vote/"+ ref}><img src ={GoToVote} height='150px'/></button>
      <div className='vote-name'>{text.name}</div></center>
    </div>:
    (isText==4?
        <div>
          <center><button className="clickable" style={{border:'0px', outline:'0px', backgroundColor:'#F8E6A7'}} onClick={()=>window.location.href = "/vote/"+ text.vid+"/result"}><img src ={VoteEnd} height='150px'/></button>
          <div className='vote-name'>{text.name}</div></center>
        </div>    
        :<div>"isText?"{isText}</div>)))}</p>
      
    </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
connect(mapStateToProps, mapDispatchToProps)(ChatMessage)
