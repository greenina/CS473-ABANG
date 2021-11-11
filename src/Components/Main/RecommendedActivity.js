import React from "react";

import "./ScrollList.css";

import arrowUpIcon from "../../Icons/ArrowUp.png";
import arrowDownIcon from "../../Icons/ArrowDown.png";
import shareIcon from "../../Icons/Share.png";

const ActivityItem = () => {
    return (
        <div className="scrolllist-item">
            <div className="scrolllist-text">
                시끄러운 친구들
                <img src={shareIcon} /> 
            </div>
        </div>
    );
};

const RecommendedActivity = () => {
  return (
    <div className="scrolllist-container">
        <div className="scrolllist-name">Recommended</div>
        <img src={arrowUpIcon} className="scrolllist-arrow" />
        <div>
            <ActivityItem />
            <ActivityItem />
            <ActivityItem />
            <ActivityItem />
        </div>
        <img src={arrowDownIcon} className="scrolllist-arrow" />
    </div>
  );
};

export default RecommendedActivity;