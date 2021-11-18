import React, { Component, useEffect, useState } from 'react';
import {db} from '../firebase';
import { arrayUnion, updateDoc } from "firebase/firestore";
import { useHref } from 'react-router';

const ToDoForm = () =>{

  const group = 'groupB'
  const docRef = db.collection('group').doc(group);

  const [todo, setTodo] = useState("")
  const [todo2, setTodo2] = useState("")

  console.log(db.collection('bucket'))

  const handleChange = (e) =>{
    setTodo(e.target.value)
    // console.log(todo)
    console.log(db.collection('bucket'))

  }

  const onSubmit = async (e) => {
    // console.log(docRef)
    // e.preventDefault()
    // updateDoc(docRef, {bucket : arrayUnion({cart:0, text:todo, isLock:true, isDone:false, memories: []})});
    // window.location.href = "/ourpage/bucket"
  } 

  return (
    <div>
      <form>
        <input value={todo} name="text" placeholder="..입력" onChange={handleChange}/>
        <div onClick={onSubmit}>Add</div>
      </form>
    </div>
  )
}
  
  export default ToDoForm;