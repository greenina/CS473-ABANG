import React, { useEffect } from 'react';
import {useState} from 'react'
import ToDoInfo from './ToDoInfo';
import {db} from '../firebase'
import { arrayUnion, updateDoc } from "firebase/firestore";

const ToDoList = (props) =>{
  
  useEffect(()=>{
    db.collection('group').doc('groupB').get().then(
      doc =>{
        const buckets = doc.data().bucket
        console.log("buckets",buckets)
      }
    )
  })
  return(
    <div>
        <ul>
          {props.data.map((data) => (
              <ToDoInfo data={data} onUpdate={props.onUpdate} onRemove={props.onRemove} />
          ))}
        </ul>
      </div>
  )
}

export default ToDoList;