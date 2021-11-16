import React, { useState , useEffect} from 'react';
import '../App.css';
import {db} from '../firebase';
import {doc, getDoc} from "firebase/firestore";
import { arrayRemove, updateDoc } from "firebase/firestore";
const ToDoInfo = (props) =>{


  const [lock, setLock] = useState(props.data.isLock)
  const [todo, setTodo] = useState(props.data.text)
  const [toggle, setToggle] = useState(false)
  const [done, setDone] = useState(props.data.isDone)
  const boxstyle = done? {
            border: '1px solid black',
            padding: '25px',
            margin: '15px',
            backgroundColor: 'lightgreen'
          } : {
        border: '1px solid black',
        padding: '25px',
        margin: '15px',
        backgroundColor: 'white'
      }
  const docRef = db.collection('group').doc('groupB');
  const style = { margin : '10px'}

  const handleToggleChange = () => {
    if(!toggle){ //edit
      setToggle(true)
    } else{
      setToggle(false)
      docRef.get()
        .then(function(querySnapshot){
          if(querySnapshot.exists){
            var length = querySnapshot.data().bucket.length;
            for(var i=0; i<length; i++){
              if(querySnapshot.data().bucket[i].text==props.data.text){
                var index = i;
                const docSnap =  getDoc(docRef).then(function(dbData){
                  const curData = dbData.data();
                  curData.bucket[index].text = todo;
                  docRef.set(curData, {merge:true});
                  //updateDoc(db.collection('group').doc('groupB'), {bucket: arrayUnion({cart:0, isDone:false, isLock:true, text:this.state.text})});
                  }
                );
                }
              }
          
            }
          }
          )
    }
  }
  const editTodo = (e) =>{
    setTodo(e.target.value)
  }
  const changeIsDone = () => {
    setDone(!done)
    docRef.get()
        .then(doc =>{
          var data = doc.data().bucket
          data.map(e => {
            if(e.text === todo){
              e.isDone = !e.isDone
            }
          })
          docRef.set({bucket:data})
        }
        )
  }
  const handleRemove = () =>{
    docRef.get().then(doc => {
      if(doc.exists){
        const newBucket = doc.data().bucket.filter(e => e.text != todo)
        console.log("BUCKET",newBucket)
        updateDoc(docRef, {bucket: newBucket});
        props.refresh()
      }
    })
    
  }
  const changeIsLock = () => {
    setLock(!lock)
    docRef.get()
        .then(doc =>{
          var data = doc.data().bucket
          data.map(e => {
            if(e.text === todo){
              e.isLock = !e.isLock
            }
          })
          docRef.set({bucket:data})
        }
        )
  }
  return(
    <div>
        <li style={boxstyle}>
        <input type="checkbox" id="unchecked" onClick={changeIsDone} checked={done}/> 
        {toggle ? (
          <input
            style={style}
            onChange={editTodo}
            value={todo} 
            name="text"
          ></input> 
        ) : ( 
          <span style={style}>{todo}</span> 
        )}
        <button onClick={handleToggleChange}>{toggle ? '적용' : '수정'}</button>
        <button onClick={handleRemove}>삭제</button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={changeIsLock}>{lock ? <img src={"/img/locked.png"} height='30px'/> : <img src={"/img/unlocked.png"} height='30px'/>}</button>
        </li>
      </div>
  )
}

export default ToDoInfo;