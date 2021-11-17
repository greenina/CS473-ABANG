import React, { useEffect } from 'react';
import {useState} from 'react'
import {db} from '../firebase'
import { arrayUnion, updateDoc } from "firebase/firestore";
import { getFormControlUnstyledUtilityClasses } from '@mui/core';
import PictureList from '../Components/Memory/PictureList';

const MemoryItem = ({ bid, memory }) =>{
  const [memoryItem, setMemoryItem] = useState(null)
  const [id, setID] = useState(null)

  useEffect(()=>{
    memory.get().then(snapshot => {
        setMemoryItem(snapshot.data())
        setID(snapshot.id)
    })
  },[memory])

  if(!memoryItem) return null

  return(
    <div className="memory-content" 
        style={{ marginBottom: "10px" }}
        onClick={() => window.location.href = `/bucket/${bid}/memory/${id}`}>
        <div className="memory-text">
            <div className="title">{ memoryItem.title }</div>
            <div className="date">{ memoryItem.date }</div>
            <div className="text textarea">{ memoryItem.text }</div>
        </div>
        <PictureList pictures={memoryItem.pictures} isEditing={false} />
    </div>
  )
}

export default MemoryItem;