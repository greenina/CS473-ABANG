import { useState } from "react";
import React from "react";
import VoteBox from "../Components/VoteBox";
import MakeVote from "../Components/MakeVote";


const Vote = () =>{
  return (
    <div>
      <VoteBox/>
      <VoteBox/>
      <VoteBox/>
      <MakeVote/>
    </div>
  )
}

export default Vote;
