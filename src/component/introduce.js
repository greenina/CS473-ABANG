import React, {Component, useEffect, useState} from 'react';
import { db, firebase, firebaseApp } from '../firebase';
import { Route,Link } from 'react-router-dom';

const Introduce = () => {
    const groupRef = db.collection('group');
    const [introduce, setIntroduce]=useState("");
    const onIntroduceChange=(e) => {
        setIntroduce(e.target.value)
    }
    
    const introduceBox ={
        marginTop:"-10px",
        width:"364px",
        height:"36px"
    }
    const submit = () => {
        groupRef.doc("groupZ").set({info:{groupIntroduce:introduce}});
    }
    return<div style={introduceBox}>
        <input type="text" style={introduceBox} value={introduce} onChange={e=>onIntroduceChange(e)} placeholder='Introduce your group!'/>
        <button onClick={submit}>save</button>
      </div>
}
export default Introduce;