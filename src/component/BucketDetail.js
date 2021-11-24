import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";

import BucketItemAdd from './BucketItemAdd';
import BucketItem from './BucketItem';
import BucketItemInfo from './BucketItemInfo';

import closeButton from "../Icons/CloseButton.png"
import arrowUpIcon from "../Icons/ArrowUpBlue.png";
import arrowDownIcon from "../Icons/ArrowDownBlue.png";
import {db} from '../firebase';

import "../Components/Memory/Memory.css"

const BucketDetail = ({ bucketRef }) => {
    const { bid } = useParams();
    const [bucket, setBucket] = useState(null);

    useEffect(() => {
        setBucket(bucketRef.doc(bid))
    }, [bid])

    if(!bucket) return null;

    return (
        <div className="memory">
            <Link to={`/main`} className="close-button"><img src={closeButton} width="100%" /></Link>
            <div className="header">Recommended Bucket list</div>
            <div className="scrolllist-container">
                <div className="bucket-container">
                    <BucketItemInfo data={bucket} detail={true} />
                </div>
            </div>
        </div>
    );
}

export default BucketDetail;