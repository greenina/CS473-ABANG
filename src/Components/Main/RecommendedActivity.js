import React from "react";

import "./ScrollList.css";

import arrowUpIcon from "../../Icons/ArrowUpPurple.png";
import arrowDownIcon from "../../Icons/ArrowDownPurple.png";
import shareIcon from "../../Icons/Share.png";
import shoppingCartIcon from "../../Icons/ShoppingCart.png";

const ActivityItem = ({ text }) => {
    return (
        <div className="scrolllist-item">
            <div className="scrolllist-text">
                { text }
                <img src={shoppingCartIcon} /> 
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
            <ActivityItem text="도자기 공방"/>
            <ActivityItem text="남산 타워"/>
            <ActivityItem text="유튜브 브이로그"/>
            <ActivityItem text="시베리아 횡단 열차"/>
        </div>
        <img src={arrowDownIcon} className="scrolllist-arrow" />
    </div>
  );
};

export default RecommendedActivity;