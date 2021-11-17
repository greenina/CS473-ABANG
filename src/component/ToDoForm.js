import React, { Component, useState } from 'react';
import {db} from '../firebase';
import { arrayUnion, updateDoc } from "firebase/firestore";

const ToDoForm = () =>{


  const docRef = db.collection('group').doc('groupB');

  const [todo, setTodo] = useState()
  const [todo2, setTodo2] = useState()
  const handleChange = (e) =>{
    setTodo(e.target.value)
  }

  const handleChange2 = (e) =>{
    setTodo2(e.target.value)
    if(todo === todo2){
      console.log("AA")
    } else{
      updateDoc(docRef, {bucket : arrayUnion({cart:0, text:todo, isLock:true, isDone:false})});
    }
  }

  const submit =  () => {
    updateDoc(docRef, {bucket : arrayUnion({cart:0, text:todo, isLock:true, isDone:false})});
  } 

  return (
    <div>
      <form>
        <input value={todo} name="text" placeholder="..입력" onChange={handleChange}></input>
        {/* <input value={todo2} name="text" placeholder="..입력" onChange={handleChange2}></input> */}
        <button onClick={submit}>추가</button>
      </form>
    </div>
  )
}
  
  export default ToDoForm;