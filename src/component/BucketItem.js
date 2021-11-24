import React, { useEffect } from 'react';
import {useState} from 'react'
import BucketItemInfo from './BucketItemInfo';
import {db} from '../firebase'
import { arrayUnion, updateDoc } from "firebase/firestore";

const BucketItem = ({ data, onRemove, onUpdate }) =>{
  const [bucketlist, setBucketlist] = useState(null)
  const getInfo = () =>{
    db.collection('group').doc('groupB').get().then(
        snapshot => {
            if(!snapshot) return
            setBucketlist(snapshot.data().bucket)
        }
      )
  }
  useEffect(()=>{
    getInfo()
  },[])

  if(!data) return null

  console.log(data)

  return(
    <div>
        {bucketlist.map((data) => (
            <BucketItemInfo data={data} onUpdate={onUpdate} onRemove={onRemove} refresh = {getInfo} isMy={true} />
        ))}
    </div>
  )
}

export default BucketItem;