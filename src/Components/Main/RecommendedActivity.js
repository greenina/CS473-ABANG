import React, {useState, useEffect} from "react";

import "./ScrollList.css";

import arrowUpIcon from "../../Icons/ArrowUpGreen.png";
import arrowDownIcon from "../../Icons/ArrowDownGreen.png";
import shareIcon from "../../Icons/Share.png";
import shoppingCartIcon from "../../Icons/ShoppingCart.png";
import firebase from 'firebase/compat/app';
import {db, auth} from '../../firebase'
import { Tooltip } from '@mui/material';

import { arrayUnion, updateDoc } from "firebase/firestore"

const ActivityItem = ({ text, href }) => {
    const [bucketList, setBucketList] = useState([]);
    const [showTooltip, setShowTooltip] = useState(false);

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
        } else {
            setShowTooltip(true)
        }
    }

    if(!bucketList) return null

    return (
        <div className="scrolllist-item" >
            <div className="scrolllist-text">
                { showTooltip ? 
                    <Tooltip title="Already added to our bucket list!" arrow>
                        <img src={shoppingCartIcon} className="img clickable" onClick={addBucket} /> 
                    </Tooltip> 
                : 
                    <img src={shoppingCartIcon} className="img clickable" onClick={addBucket} />
                }
                <img className="clickable" src={shareIcon } onClick={share}/> 
                <div className="clickable" onClick={() => window.location.href = href}>{ text }</div>
            </div>
        </div>
    );
};

const RecommendedActivity = () => {
  return (
    <div className="scrolllist-container">
        <div className="scrolllist-name">Recommended</div>
        <img src={arrowUpIcon} className="scrolllist-arrow" />
        <div className="scrollist-text">
            <ActivityItem text="Pottery Workshop🎨" href="/bucket/El7sNoR43uaVqN9Ih8P9"/>
            <ActivityItem text="NAMSAN TOWER" href="/bucket/8KfLFCkk7efxo0KhdhQs"/>
            <ActivityItem text="Youtube VLOG~~👨‍👨‍👧‍👦" href="/bucket/IGT7Za1piAYputJwo4fq"/>
            <ActivityItem text="SIBERIA RAILROAD🚉" href="/bucket/WZMwjBLbnD1sG9tBnMCM"/>
            <ActivityItem text="Thriller😲 Room Escape" href="/bucket/SAuzhnSueD05Hsldy9US" />
        </div>
        <img src={arrowDownIcon} className="scrolllist-arrow" />
    </div>
  );
};

export default RecommendedActivity;