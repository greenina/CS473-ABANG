import React from "react";

import "./ShortList.css";

//import profileIcon from "../../Icons/Profile.png";
import groupImg from "../../Icons/Default_Image.png"
import groupNameBox from "../../Icons/groupNameBox.png"

const GroupItem = ({name, hashtags}) => {
    return (
        <div className="shortlist-item-profile">
            <img src={groupImg} height="134px"/>
            <center><img src={groupNameBox} className="shortList-groupname" height="40px" width='300px'/></center>
            <center>
                <div className="shortlist-text-groupname">{name}</div>
                <br/>
                <div className="shortlist-text-grouphash">{hashtags}</div>
            </center>
        </div>
    );
};

const SimilarGroup = () => {
  return (
    <div>
    <div className="shortlist-container-small">
        <div className="shortlist-name">Similar Group</div>
        <GroupItem name="시끄러운 친구들" hashtags="#활동적 #액티비티"/>
        <GroupItem name="야행성 부엉이들" hashtags="#심야시간 #밤샘"/>
        <GroupItem name="코딩하는 대학생" hashtags="#코딩쫌재밌어"/>
    </div>
    <div className="shortlist-container-small">
    <div className="shortlist-name">Similar Group</div>
    <GroupItem name="시끄러운 친구들" hashtags="#활동적 #액티비티"/>
    <GroupItem name="야행성 부엉이들" hashtags="#심야시간 #밤샘"/>
    <GroupItem name="코딩하는 대학생" hashtags="#코딩쫌재밌어"/>
</div>
</div>
  );
};

export default SimilarGroup;