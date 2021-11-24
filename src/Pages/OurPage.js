import React, {useState, useEffect} from 'react';
import { db } from '../firebase';
import BucketList from '../component/BucketList'
import NavBar from "../Components/Main/NavBar";
import GroupImage from "../Components/Ourpage/GroupImage";
import Hashtags from "../Components/Ourpage/Hashtags";
import { Link } from "react-router-dom";

import bucketlistIcon from "../Icons/Bucketlist.png";
import editButton from '../Icons/edit_button.png';
import DisplayImage from '../Components/Ourpage/DisplayImage';
import "../Components/Ourpage/Ourpage.css"

const Ourpage = () =>{
    const [name, setName] = useState("")
    const [intro, setIntro] = useState("")

    useEffect(()=>{
        db.collection("group")
        .doc("groupB")
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
                {/* <GroupImage /> */}
                <DisplayImage/>
                <br/>
                <div className="group-name">{ name }</div>
                <div className="info-container">
                    <div className="group-introduction">
                        <div onClick={() => window.location.href = "/ourpage/bucket"} className="bucket-button clickable">See Bucket List &nbsp;<img src={bucketlistIcon} width={20} /></div>
                        <div className="header">
                            Introduce Us
                            <label for = 'editbuttonimg'>
                            <Link to="/ourpage/edit"><button id='editbuttonimg' className="clickable" style={{display:'none'}}>edit</button></Link>
                            <img src = {editButton} height='40px' className="clickable" style = {{position: 'relative', marginLeft: "10px" }}/>
                        </label>
                        </div>
                        <div className="group-introduction-text">{intro}</div>
                        <Hashtags/>
                    </div>
                    <div className="bucket-container">
                        <BucketList show={true} />
                    </div>
                </div>
            </div>
            <NavBar />
        </div>
    )
}

export default Ourpage