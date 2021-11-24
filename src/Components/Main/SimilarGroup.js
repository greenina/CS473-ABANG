import React from "react";

import "./ShortList.css";

//import profileIcon from "../../Icons/Profile.png";
import groupImg from "../../Icons/Default_Image.png"
import groupNameBox from "../../Icons/groupNameBox.png"
import hashBox from "../../Icons/hashBox.png"

const GroupItem = ({name, hashtags, href}) => {
    return (
        <div className="shortlist-item-profile" onClick={() => window.location.href = href}>
            <img src={groupImg} width='100%'/>
            <center><img src={groupNameBox} className="shortList-groupname" height="40px" width='100%'/></center>
            <center>
                <div className="shortlist-text-groupname">{name}</div>
            </center>
                <br/>
                <div className="shortlist-text-grouphash">{hashtags}</div>
        </div>
    );
};

const SimilarGroup = () => {
  return (
    <div style={{ display: "inline-block" ,width:'50%'}} >
    <div className="shortlist-container-small">
        <div className="shortlist-name">Similar Group</div>
        <GroupItem name="시끄러운 친구들" hashtags="#활동적 #액티비티" href="/theirpage/theirGroupA"/>
        <GroupItem name="야행성 부엉이들" hashtags="#심야시간 #밤샘" href="/theirpage/theirGroupB"/>
        <GroupItem name="코딩하는 대학생" hashtags="#코딩쫌재밌어" href="/theirpage/theirGroupC"/>
    </div>
    <div className="shortlist-container-small-second">
    <div className="shortlist-name"></div>
    <GroupItem name="시끄러운 친구들" hashtags="#활동적   #액티비티"/>
    <GroupItem name="야행성 부엉이들" hashtags="#심야시간   #밤샘"/>
    <GroupItem name="코딩하는 대학생" hashtags="#코딩쫌재밌어"/>
</div>
</div>
  );
};

export default SimilarGroup;