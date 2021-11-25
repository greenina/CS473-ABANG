import React, {useEffect, useState} from "react";
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

  const [messages] = useCollectionData(query, {idField: 'id'});
  const [groupName, setGroupName] = useState(null)

  const [formValue, setFormValue] = useState('');

useEffect(() => {
  db.collection('group').doc('groupB').get().then(s => {
    if(s.exists && s.data().info) setGroupName(s.data().info.groupName)
  })
}, [])

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
      <div style={{padding:"10px", overflow:"auto", height: "calc(100vh - 80px)"}}>
        {messages && messages.map(msg => <ChatMessage key = {msg.id} message = {msg}/>)}
      </div>
      <div className="bottom-bar-container">
        <form onSubmit = {sendMessage} style={{padding:"10px", height:"20px", display:"flex", alignItems:"center"}}>
          <input className="chat-box" style={{width:"80%", marginRight:"5%", borderColor:"white", borderRadius:"6px",borderWidth:0, boxShadow:" 0px 2px 4px rgba(0, 0, 0, 0.25) "}} value = {formValue} onChange = {(e) => setFormValue(e.target.value)}/>
          
          <button className="clickable" type = "submit" style={{width:"100px", marginTop:"35px", fontSize:'20px', height: '50px', backgroundColor:"#FFFEDB", color:"#829B89",borderWidth:0, boxShadow:"0px 2px 4px rgba(0, 0, 0, 0.25)", borderRadius:"10px"}}><div className='font-eng'>Send</div></button>

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
      <button onClick={goVote} style={{border:'0px', outline:'0px', backgroundColor:'#FFFDD0'}}>GO to VOTE</button>
      <center><div className='vote-name'>{props.vote.name}</div></center>
    </div>
  )
}


function ChatMessage(props) {
  const { isText, text, email, photoURL, id } = props.message;
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
          <button className='share-name' style={{border:'10px', borderRadius:'10px', backgroundColor:'#FFFFFF',boxShadow:" 0px 2px 4px rgba(0, 0, 0, 0.25) "}} onClick={()=>window.location.href = text.link}>{text.name}</button>
        </div>:
        (isText==1?text:
        (isText==2?
          <div>
          <button style={{border:'0px', outline:'0px', backgroundColor:'#FFF'}} onClick={()=>window.location.href = "/vote/"+ id}><img src ={GoToVote} height='150px'/></button>
          <center><div className='vote-name'>{text.name}</div></center>
        </div>
        :<div>"isText?"{isText}</div>
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
      <p class="msg-box" style={{backgroundColor:"#FFFDD0"}}>{isText==3?<div>
      <button className='share-name' style={{border:'10px', borderRadius:'10px', backgroundColor:'#FFFFFF',boxShadow:" 0px 2px 4px rgba(0, 0, 0, 0.25) "}} onClick={()=>window.location.href = text.link}>{text.name}</button>
    </div>:(isText==1?text:<div>
      <button style={{border:'0px', outline:'0px', backgroundColor:'#FFFDD0'}} onClick={()=>window.location.href = "/vote/"+ id}><img src ={GoToVote} height='150px'/></button>
      <center><div className='vote-name'>{text.name}</div></center>
    </div>)}</p>
      
    </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
connect(mapStateToProps, mapDispatchToProps)(ChatMessage)
