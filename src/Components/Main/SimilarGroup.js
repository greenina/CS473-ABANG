import React from "react";

import "./ShortList.css";

//import profileIcon from "../../Icons/Profile.png";
import groupImg from "../../Icons/Default_Image.png"
import noisyfriends1 from '../../Icons/noisyfriends1.png'
import night from '../../Icons/night.png'
import cute from '../../Icons/cute.png'
import code from '../../Icons/code.png'
import groupNameBox from "../../Icons/groupNameBox.png"
import hashBox from "../../Icons/hashBox.png"

const GroupItem = ({name, hashtags, href, imgLink}) => {
    return (
        <div className="shortlist-item-profile clickable" onClick={() => window.location.href = href}>
            <img src={imgLink} width='100%'/>
            <div className="shortlist-text-groupname">{name}</div>
            <div className="shortlist-text-grouphash">{hashtags}</div>
        </div>
    );
};

const SimilarGroup = () => {
  return (
    <div className="shortlist-container" >
        <div className="shortlist-name" style={{ color: "#5C6348", padding: "0 10px" }}>Similar Group</div>
        <div className="shortlist-container-small">
            <GroupItem imgLink={noisyfriends1} name="Noisy Girls🐥" hashtags="#super #active" href="/theirpage/theirGroupA"/>
            <GroupItem imgLink={cute} name="CUTEST😆 guys" hashtags="#small #><" href="/theirpage/theirGroupB"/>
        </div>
        <div className="shortlist-container-small">
            <GroupItem imgLink ={night}name={"Bats🐱‍👤 & Wols"} hashtags="#Night #noSleep" href="/theirpage/theirGroupC"/>
            <GroupItem imgLink ={code}name="Hacker👩‍💻 Women" hashtags="#hackers #coding" href="/theirpage/theirGroupD"/>
        </div>
    </div>
  );
};

export default SimilarGroup;


