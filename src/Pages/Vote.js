
import { useEffect, useState } from "react";
import React from "react";
import VoteBox from "../component/VoteBox";
import {db} from '../firebase'
import { useParams } from "react-router";
//VoteBox component안에 들어가야하는 props : group, email, group안의 어떤 vote? vote의 name or index?


const Vote = (props) =>{
  const { vid } = useParams();
  const {voteRef} = props

  return(
    <div>
      <VoteBox vid={vid} voteRef = {voteRef} />
    </div>
  )
}

export default Vote;
