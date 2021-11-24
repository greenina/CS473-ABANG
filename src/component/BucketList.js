import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import BucketItemAdd from './BucketItemAdd';
import BucketItem from './BucketItem';

import closeButton from "../Icons/CloseButton.png"
import arrowUpIcon from "../Icons/ArrowUpBlue.png";
import arrowDownIcon from "../Icons/ArrowDownBlue.png";
import {db} from '../firebase';

import "../Components/Memory/Memory.css"

const BucketList = ({ show }) => {
    const [bucketList, setBucketList] = useState(null);

    useEffect(() => {
        db.collection('group').doc('groupB').get().then(snapshot => {
            setBucketList(snapshot.data().bucket)
            console.log(snapshot.data().bucket)
        });
    }, []);

  const handleUpdate = (id, data) => {
    this.setState({
      bucketList: bucketList.map((bucketList) => {
        console.log(bucketList);
        if (bucketList.id === id) {
          console.log(bucketList.id + ' / ' + id);
          return {
            id,
            ...data,
          };
        }
        return bucketList;
      }),
    });
  };

    return (
        <div className="memory" style={ show ? { minHeight: "0" } : {}}>
            { show ? null : <Link to={`/ourpage`} className="close-button"><img src={closeButton} width="100%" /></Link> }
            <div className="header">Our Bucket list</div>
            <div className="scrolllist-container" style={ show ? { height: "100%" } : {}}>
                <img src={arrowUpIcon} className="arrow" />
                <div className="bucket-container" style={ show ? { height: "100%" } : {}}>
                    <BucketItem data={bucketList} onUpdate={handleUpdate}/>
                </div>
                { show ? null : <BucketItemAdd/> }
                <img src={arrowDownIcon} className="arrow" />
            </div>
        </div>
      );
  
}

export default BucketList;