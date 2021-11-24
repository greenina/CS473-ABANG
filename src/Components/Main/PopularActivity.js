import React from "react";

import "./ShortList.css";

import profileIcon from "../../Icons/Profile.png";

const ActivityItem = ({ text, hashtags, href }) => {
    return (
        <div className="shortlist-item" 
            onClick={() => window.location.href=href}
            style={{ backgroundColor: "var(--lightgray)" }}>
            <img src={profileIcon} />
            <div className="shortlist-text">
                { text }<br/>{ hashtags }
            </div>
        </div>
    );
};

const PopularActivity = () => {
  return (
    <div className="shortlist-container">
        <div className="shortlist-name">Popular Activity</div>
        <ActivityItem text="오징어 게임 보기" hashtags="#456 #오징어" href={"/bucket/j0P5GlThHZxr3RvqnOgL"} />
        <ActivityItem text="Hey Mama 커버 댄스 찍기" hashtags="#스우파 #멋짐" href={"/bucket/8qjn3iUMyakN9eTtJShm"} />
        <ActivityItem text="스포츠몬스터 뿌시기" hashtags="#인싸" href={"/bucket/j0P5GlThHZxr3RvqnOgL"} />
    </div>
  );
};

export default PopularActivity;