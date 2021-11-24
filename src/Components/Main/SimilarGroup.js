import React from "react";

import "./ShortList.css";

//import profileIcon from "../../Icons/Profile.png";
import groupImg from "../../Icons/Default_Image.png"
import groupNameBox from "../../Icons/groupNameBox.png"
import hashBox from "../../Icons/hashBox.png"

const GroupItem = ({name, hashtags, href}) => {
    return (
        <div className="shortlist-item-profile clickable" onClick={() => window.location.href = href}>
            <img src={groupImg} width='100%'/>
            <div className="shortlist-text-groupname">{name}</div>
            <div className="shortlist-text-grouphash">{hashtags}</div>
        </div>
    );
};

const SimilarGroup = () => {
  return (
    <div className="shortlist-container" >
        <div className="shortlist-name" style={{ color: "var(--browntext)", padding: "0 10px" }}>Similar Group</div>
        <div className="shortlist-container-small">
            <GroupItem name="시끄러운 친구들" hashtags="#활동적 #액티비티" href="/theirpage/theirGroupA"/>
            <GroupItem name="우주최강 귀요미" hashtags="#아기자기 #쁘띠" href="/theirpage/theirGroupB"/>
        </div>
        <div className="shortlist-container-small">
            <GroupItem name="야행성 부엉이들" hashtags="#심야시간 #밤샘" href="/theirpage/theirGroupC"/>
            <GroupItem name="코딩하는 대학생" hashtags="#코딩쫌재밌어" href="/theirpage/theirGroupD"/>
        </div>
    </div>
  );
};

export default SimilarGroup;