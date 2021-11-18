import React, { Component, useEffect, useState } from 'react';
import {db} from '../firebase';
import { arrayUnion, updateDoc } from "firebase/firestore";
import { useHref } from 'react-router';

const BucketItemAdd = () =>{

  const group = 'groupB'
  const docRef = db.collection('group').doc(group);

  const [todo, setTodo] = useState("")
  const [todo2, setTodo2] = useState("")

  const handleChange = (e) =>{
    setTodo(e.target.value)
    console.log(todo)
  }

  const onSubmit = async (e) => {
    console.log(docRef)
    e.preventDefault()
    db.collection('bucket').add({cart:0, text:todo, isLock:true, isDone:false, memories: []}).then(snapshot => {
        updateDoc(db.collection('group').doc('groupB'), {bucket: arrayUnion(snapshot)})
        window.location.href = `/ourpage/bucket`
    })

    // updateDoc(docRef, {bucket : arrayUnion({cart:0, text:todo, isLock:true, isDone:false, memories: []})});
    // window.location.href = "/ourpage/bucket"
  } 

  return (
    <div className="bucket-input">
        <input value={todo} name="text" placeholder="Add a new bucket list!" onChange={handleChange}/>
        <button onClick={onSubmit}>Add</button>
    </div>
  )
}
  
  export default BucketItemAdd;