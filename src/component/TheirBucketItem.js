import React, { useEffect } from 'react';
import {useState} from 'react'
import BucketItemInfo from './TheirBucketItemInfo';
import {db} from '../firebase'
import { arrayUnion, updateDoc } from "firebase/firestore";
import { useParams } from 'react-router';

const BucketItem = ({ data, onRemove, onUpdate }) =>{
  const [bucketlist, setBucketlist] = useState(null)
  const { group } = useParams()
  const getInfo = () =>{
    db.collection('group').doc(group).get().then(
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
  if(!bucketlist) return null

  return(
    <div>
        {bucketlist.map((data) => (
            <BucketItemInfo data={data} onUpdate={onUpdate} onRemove={onRemove} refresh = {getInfo} />
        ))}
    </div>
  )
}

export default BucketItem;