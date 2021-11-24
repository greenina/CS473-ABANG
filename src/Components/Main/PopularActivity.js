import React from "react";

import "./ShortList.css";

import profileIcon from "../../Icons/Profile.png";
import shareIcon from "../../Icons/Share.png";
import shoppingCartIcon from "../../Icons/ShoppingCart.png";
import hitIcon from "../../Icons/Hit_icon.png";
import zIndex from "@material-ui/core/styles/zIndex";

const ActivityItem = ({ text, hashtags, href }) => {
    const resize = {
        height : '30px',
        width : '30px',
        float: "right"
        
    }
    const locate = {
        zIndex:'1',
        'margin-left' : '630px', 
        'margin-top' : '-50px'
    }
    return (
        <div className="shortlist-item" 
            onClick={() => window.location.href=href}
            style={{ backgroundColor: "var(--lightgray)", verticalAlign: "top" }}>
            <img src={hitIcon} style={{height:'30px', width:'40px'}}/>
            <div style={{ display: "inline-block", width: "calc(100% - 50px)", verticalAlign: "top" }}>
                <div className="shortlist-text-big">{ text }</div>
                <div className="shortlist-text">{ hashtags }</div>   
                <img src={shoppingCartIcon} className="img" /> 
                <img src={shareIcon} className="img" /> 
            </div>
        </div>
    );
};

const PopularActivity = () => {
  return (
    <div className="shortlist-container">
        <div className="shortlist-name">Popular Activity</div>
        <ActivityItem text="오징어 게임 보기" hashtags="#456 #오징어" href="/bucket/j0P5GlThHZxr3RvqnOgL" />
        <ActivityItem text="Hey Mama 커버 댄스 찍기" hashtags="#스우파 #멋짐" href="/bucket/8qjn3iUMyakN9eTtJShm" />
        <ActivityItem text="스포츠몬스터 뿌시기" hashtags="#인싸" href="/bucket/XhbwVznGZ3IEtLWtodg6" />
        <ActivityItem text="파티룸에서 연말파티" hashtags="#연말 #양주 #신남"/>
        {/* <ActivityItem text="투다리 종강파티" hashtags="#달려 #볼링핀 #깡소주"/>
        <ActivityItem text="교복입고 롯데월드" hashtags="#회전목마 #교복"/> */}
    </div>
  );
};

export default PopularActivity;