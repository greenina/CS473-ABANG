
import { useEffect, useState } from "react";
import React from "react";
import VoteBox from "../component/VoteBox";
import {db} from '../firebase'
//VoteBox component안에 들어가야하는 props : group, email, group안의 어떤 vote? vote의 name or index?


const Vote = () =>{
  const group = "groupZ"
  const docRef = db.collection('group').doc(group)
  const [n, setN] = useState(0)


  useEffect(()=>{
    docRef.get().then((doc)=>{
      setN(doc.data().vote.length)
    })
  },[])
  return (
    <div>
      {Array.from(Array(n).keys()).map(vote =>{
        console.log(Array(n))
        console.log("vote",vote)
        return <VoteBox  index={vote}/>
      })}
      {/* <MakeVote/> */}

    </div>
  )
}

export default Vote;
