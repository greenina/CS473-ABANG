import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { db } from '../firebase';
import BucketList from '../component/TheirBucketList'
import NavBar from "../Components/Main/NavBar";
import Hashtags from "../Components/Ourpage/TheirHashtags";
import noisyfriends1 from '../Icons/noisyfriends1.png'
import night from '../Icons/night.png'
import cute from '../Icons/cute.png'
import code from '../Icons/code.png'
import bucketlistIcon from "../Icons/Bucketlist.png"

import closeButton from "../Icons/CloseButtonYellow.png"
import defaultPic from "../Components/Ourpage/profile/default.png"

import "../Components/Ourpage/Ourpage.css"

const TheirPage = () =>{
    const { group } = useParams()
    const [name, setName] = useState("")
    const [intro, setIntro] = useState("")

    useEffect(()=>{
        db.collection("group")
        .doc(group)
        .get()
        .then(doc => {
            if(doc.exists && doc.data().info){
                setName(doc.data().info.groupName)
                setIntro(doc.data().info.groupIntroduce)
            }
        });
    },[])

    const pic = () => {
        if(group === "theirGroupA") {
            return <img src={noisyfriends1} width="100%" />
        } else if(group === "theirGroupB") {
            return <img src={night} width="100%" />
        } else if(group === "theirGroupC") {
            return <img src={cute} width="100%" />
        } else if(group === "theirGroupD") {
            return <img src={code} width="100%" />
        }
    }

    console.log(group)

    return(
        <div className="ourpage">
            <div className="ourpage-container">
                <Link to="/main" className="close-button" style={{ padding: "10px" }}><img src={closeButton} width="100%" /></Link>
                { group === "theirGroupA" ? <img src={noisyfriends1} width="100%" /> : 
                    group === "theirGroupB" ? <img src={cute} width="100%" /> : 
                    group === "theirGroupC" ? <img src={night} width="100%" /> : 
                    group === "theirGroupD" ? <img src={code} width="100%" /> : 
                    <img src={defaultPic} width="100%" /> }
                <div className="group-name" style={{ top: "32vw" }}>{ name }</div>
                <div className="info-container">
                    <div className="group-introduction">
                        {/* <div onClick={() => window.location.href = "/ourpage/bucket"} className="bucket-button">See Bucket List &nbsp;<img src={bucketlistIcon} width={20} /></div> */}
                        <div className="header">Introduce Us</div>
                        {intro}
                        <Hashtags/>
                    </div>
                    <div className="bucket-container">
                        <BucketList show={true} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TheirPage