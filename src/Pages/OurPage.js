import React, {useState, useEffect} from 'react';
import {Route,Link} from 'react-router-dom';
import { db } from '../firebase';
import Bucket_Edit from '../component/bucket.js';
import Hash from '../component/hash';
import DisplayImage from '../component/DisplayImage';

const Ourpage = () =>{
    const [name, setName] = useState("")
    const [intro, setIntro] = useState("")

    useEffect(()=>{
        db.collection("group")
        .doc("groupB")
        .get()
        .then(doc => {
            if(doc.exists){
                setName(doc.data().info.groupName)
                setIntro(doc.data().info.groupIntroduce)
            }
            
        });
    },[])

    return(
        <div>
            <DisplayImage/>
            <div><h2>Ourpage</h2></div>
            <h6>Group Name</h6>
            <h4>{name}</h4>
            <h6>Introduce our group</h6>
            <h4>{intro}</h4>
            <button><Link to = "/ourpage/edit">edit</Link></button>
            <Hash/>
            <button><Link to = "/ourpage/bucket"> bucket edit </Link></button>
            </div>
    )
}

export default Ourpage