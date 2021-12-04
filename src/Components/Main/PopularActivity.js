import React, { useState, useEffect } from "react";

import "./ShortList.css";

import shareIcon from "../../Icons/Share.png";
import shoppingCartIcon from "../../Icons/ShoppingCart.png";
import hitIcon from "../../Icons/Hit_icon.png";
import firebase from 'firebase/compat/app';
import {db, auth} from '../../firebase'
import { Tooltip } from '@mui/material';

import { arrayUnion, updateDoc } from "firebase/firestore"

const ActivityItem = ({ text, hashtags, href }) => {
    const [bucketList, setBucketList] = useState([]);

    useEffect(() => {
        db.collection("group").doc("groupB").get().then(async s => {
            await s.data().bucket.forEach(i => {
                i.get().then(x => {
                    if(bucketList) bucketList.push(x.data().text)
                })
            })
        })
    }, [])

    const share = async () => {
        await db.collection('message2').add({
            isText:3,
            text: {name:text, link:href},
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            email:auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })
        window.location.href = "/chat"
    }

    const addBucket = () => {
        if(!bucketList.includes(text)) {
            db.collection('bucket').add({
                text: text,
                cart: 0,
                isDone: false,
                isLock: true,
                memories: [],
            }).then(async snapshot => {
                console.log(snapshot)
                await updateDoc(db.collection('group').doc('groupB'), {bucket: arrayUnion(snapshot)})
                await window.location.replace(`/ourpage/bucket`)
            }) 
        }
    }

    if(!bucketList) return null

    return (
        <div className="shortlist-item" 
            style={{ backgroundColor: "var(--lightgray)", verticalAlign: "top" }}>
            <img src={hitIcon} style={{height:'30px', width:'40px'}}/>
            <div style={{ display: "inline-block", width: "calc(100% - 50px)", verticalAlign: "top" }}>
                <div className="shortlist-text-big" onClick={() => window.location.href=href}>{ text }</div>
                <div className="shortlist-text" onClick={() => window.location.href=href}>{ hashtags }</div>   
                

                {/* <Tooltip title="Not a Core Feature(To be Implemented)" arrow> */}
                <img src={shoppingCartIcon} className="img clickable" onClick={addBucket} /> 
                {/* </Tooltip> */}
                <img src={shareIcon} className="img clickable" onClick={share} /> 
            </div>
        </div>
    );
};

const PopularActivity = () => {
  return (
    <div className="shortlist-container">
        <div className="shortlist-name">Popular Activity</div>
        <ActivityItem text="오징어 게임 보기" id="j0P5GlThHZxr3RvqnOgL" hashtags="#456 #오징어" href="/bucket/j0P5GlThHZxr3RvqnOgL" />
        <ActivityItem text="Hey Mama 커버 댄스 찍기" id="8qjn3iUMyakN9eTtJShm" hashtags="#스우파 #멋짐" href="/bucket/8qjn3iUMyakN9eTtJShm" />
        <ActivityItem text="스포츠몬스터 뿌시기" id="XhbwVznGZ3IEtLWtodg6" hashtags="#인싸" href="/bucket/XhbwVznGZ3IEtLWtodg6" />
        <ActivityItem text="파티룸에서 연말파티" id="hGTpf97UiIBFVaM9aO9Z" hashtags="#연말 #양주 #신남" href="/bucket/hGTpf97UiIBFVaM9aO9Z" />
        {/* <ActivityItem text="투다리 종강파티" hashtags="#달려 #볼링핀 #깡소주"/>
        <ActivityItem text="교복입고 롯데월드" hashtags="#회전목마 #교복"/> */}
    </div>
  );
};

export default PopularActivity;