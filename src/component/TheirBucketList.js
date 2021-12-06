import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";

import BucketItemAdd from './BucketItemAdd';
import BucketItem from './TheirBucketItem';

import closeButton from "../Icons/CloseButtonGreen.png"
import arrowUpIcon from "../Icons/ArrowUpBlue.png";
import arrowDownIcon from "../Icons/ArrowDownBlue.png";
import {db} from '../firebase';

import "../Components/Memory/Memory.css"

const BucketList = ({ show }) => {
    const { group } = useParams()
    const [bucketList, setBucketList] = useState(null);

    useEffect(() => {
        db.collection('group').doc(group).get().then(snapshot => {
            setBucketList(snapshot.data().bucket)
            console.log(snapshot.data().bucket)
        });
    }, []);

    return (
        <div className="memory" style={ show ? { minHeight: "0" } : {}}>
            { show ? null : <Link to={`/ourpage`} className="close-button"><img src={closeButton} width="100%" /></Link> }
            <div className="header">Our Bucket list</div>
            <div className="scrolllist-container" style={ show ? { height: "100%" } : {}}>
                <img src={arrowUpIcon} className="arrow" />
                <div className="bucket-container" style={ show ? { height: "100%" } : {}}>
                    <BucketItem data={bucketList} group={group}/>
                </div>
                <img src={arrowDownIcon} className="arrow" />
            </div>
        </div>
      );
  
}

export default BucketList;