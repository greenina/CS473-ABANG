import React from "react";

import "./ScrollList.css";

import arrowUpIcon from "../../Icons/ArrowUpPurple.png";
import arrowDownIcon from "../../Icons/ArrowDownPurple.png";
import shareIcon from "../../Icons/Share.png";
import shoppingCartIcon from "../../Icons/ShoppingCart.png";
import firebase from 'firebase/compat/app';
import {db, auth} from '../../firebase'

const ActivityItem = ({ text, href }) => {
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
    return (
        <div className="scrolllist-item clickable">
            <div className="scrolllist-text">
                <img src={shoppingCartIcon} /> 
                <img src={shareIcon } onClick={share}/> 
                <div onClick={() => window.location.href = href}>{ text }</div>
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
            <ActivityItem text="도자기 공방" href="/bucket/El7sNoR43uaVqN9Ih8P9"/>
            <ActivityItem text="남산 타워" href="/bucket/8KfLFCkk7efxo0KhdhQs"/>
            <ActivityItem text="유튜브 브이로그" href="/bucket/IGT7Za1piAYputJwo4fq"/>
            <ActivityItem text="시베리아 횡단 열차" href="/bucket/WZMwjBLbnD1sG9tBnMCM"/>
        </div>
        <img src={arrowDownIcon} className="scrolllist-arrow" />
    </div>
  );
};

export default RecommendedActivity;