import React from "react";

import "./ShortList.css";

import profileIcon from "../../Icons/Profile.png";
import shareIcon from "../../Icons/Share.png";
import shoppingCartIcon from "../../Icons/ShoppingCart.png";
import hitIcon from "../../Icons/Hit_icon.png";
import zIndex from "@material-ui/core/styles/zIndex";

const ActivityItem = ({ text, hashtags }) => {
    const resize = {
        height : '40px',
        width : '50px',
        
    }
    const locate = {
        zIndex:'1',
        'margin-left' : '630px', 
        'margin-top' : '-50px'
    }
    return (
        <div className="shortlist-item" style={{ backgroundColor: "var(--lightgray)"}}>
            <img src={hitIcon} style={{height:'50px', width:'70px'}}/>
            <div className="shortlist-text-big">{ text }</div>
            <div className="shortlist-text">{ hashtags }</div>   
            <div style ={locate}>
            <img src={shareIcon} style={resize}/> 
            <img src={shoppingCartIcon} style={resize} /> 
            <div line-height="130%"><br/></div>
            </div> 
        </div>
    );
};

const PopularActivity = () => {
  return (
    <div className="shortlist-container">
        <div className="shortlist-name">Popular Activity</div>
        <ActivityItem text="오징어 게임 보기" hashtags="#456 #오징어"/>
        <ActivityItem text="Hey Mama 커버 댄스 찍기" hashtags="#스우파 #멋짐"/>
        <ActivityItem text="스포츠몬스터 뿌시기" hashtags="#인싸"/>
        <ActivityItem text="파티룸에서 연말파티" hashtags="#연말 #양주 #신남"/>
        <ActivityItem text="투다리 종강파티" hashtags="#달려 #볼링핀 #깡소주"/>
        <ActivityItem text="교복입고 롯데월드" hashtags="#회전목마 #교복"/>
    </div>
  );
};

export default PopularActivity;