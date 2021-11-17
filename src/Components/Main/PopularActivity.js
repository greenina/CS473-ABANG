import React from "react";

import "./ShortList.css";

import profileIcon from "../../Icons/Profile.png";

const ActivityItem = () => {
    return (
        <div className="shortlist-item">
            <img src={profileIcon} />
            <div className="shortlist-text">
                시끄러운 친구들<br/>
                #활동적 #액티비티
            </div>
        </div>
    );
};

const PopularActivity = () => {
  return (
    <div className="shortlist-container">
        <div className="shortlist-name">Popular Activity</div>
        <ActivityItem />
        <ActivityItem />
        <ActivityItem />
    </div>
  );
};

export default PopularActivity;