import React, { useEffect } from 'react';
import {useState} from 'react'
import ToDoInfo from './ToDoInfo';
import {db} from '../firebase'
import { arrayUnion, updateDoc } from "firebase/firestore";

const ToDoList = (props) =>{
  const [bucket, setBucket] = useState([])
  useEffect(()=>{
    db.collection('group').doc('groupB').get().then(
      doc =>{
        console.log("doc",doc.data)
        if(doc.exists){
          const buckets = doc.data().bucket
        setBucket(buckets)
        }
      }
    )
  },[])
  return(
    <div>
        <ul>
          {bucket.map((data) => (
              <ToDoInfo data={data} onUpdate={props.onUpdate} onRemove={props.onRemove} />
          ))}
        </ul>
      </div>
  )
}

export default ToDoList;