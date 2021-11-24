import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { db } from '../firebase';
import BucketList from '../component/TheirBucketList'
import NavBar from "../Components/Main/NavBar";
import Hashtags from "../Components/Ourpage/TheirHashtags";

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

    return(
        <div className="ourpage">
            <div className="ourpage-container">
                <Link to="/main" className="close-button" style={{ padding: "10px" }}><img src={closeButton} width="100%" /></Link>
                <img src={defaultPic} width="100%" />
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