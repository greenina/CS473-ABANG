import React from "react";

import "./ShortList.css";

import profileIcon from "../../Icons/Profile.png";

const GroupItem = ({name, hashtags, href}) => {
    return (
        <div className="shortlist-item" onClick={() => window.location.href = href}>
            <img src={profileIcon} />
            <div className="shortlist-text">
                {name}<br/>{hashtags}
            </div>
        </div>
    );
};

const SimilarGroup = () => {
  return (
    <div className="shortlist-container">
        <div className="shortlist-name">Similar Group</div>
        <GroupItem name="시끄러운 친구들" hashtags="#활동적 #액티비티" href="/theirpage/theirGroupA"/>
        <GroupItem name="야행성 부엉이들" hashtags="#심야시간 #밤샘" href="/theirpage/theirGroupB"/>
        <GroupItem name="코딩하는 대학생" hashtags="#코딩쫌재밌어" href="/theirpage/theirGroupC"/>
    </div>
  );
};

export default SimilarGroup;