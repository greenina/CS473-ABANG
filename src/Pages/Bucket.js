import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { db } from "../firebase"
import { arrayUnion, updateDoc } from "firebase/firestore";

const MemoryItem = ({ bid, item }) => {
    const [id, setID] = useState(null);
    const [memory, setMemory] = useState(null);
    item.get().then(snapshot => {
        setID(snapshot.id)
        setMemory(snapshot.data())
    })

    if(!memory) return null;
    return (
        <Link to={`/bucket/${bid}/memory/${id}`}>
            <div>{ memory.title }</div>
            <div>{ memory.date }</div>
            <div>{ memory.text }</div>
        </Link>
    );
};

const MemoryList = ({ bid, memories }) => {
    if(!memories) return null;
    return memories.map((item) => <MemoryItem bid={bid} item={item} />);
};

const BucketItem = ({ item }) => {
    const [id, setID] = useState(null);
    useEffect(() => {
        setID(item.docId);
    }, [id]);

    if(!item) return null;
    return (
        <div>
            <div>text: { item.wishText }</div>
            <MemoryList bid={id} memories={item.memories} />
        </div>
    );
};

const BucketList = ({ bucketList, memoryRef }) => {
    if(!bucketList) return null;
    return bucketList.map(item => <BucketItem item={item} memoryRef={memoryRef} />);
};

const Bucket = ({ bucketRef }) => {
    const [bucket, setBucket] = useState(null);

    useEffect(() => {
        if(!bucketRef) return;
        bucketRef.get().then((snapshot) => {
            const tmp = snapshot.docs.map(i => i.data());
            setBucket(tmp);
        });
    }, [bucketRef]);

    function addWish() {
        // const [arr, setArr] = useState(null)
        // bucketRef.doc('EbJhXFg8yQO57LevlIm9').get().then(snapshot => {
        //     setArr(snapshot.data().arr)
        // })
        // updateDoc(bucketRef.doc('EbJhXFg8yQO57LevlIm9'), {arr: arrayUnion({cart:0, isDone:false, isLock:false, test:"hi"})})
        updateDoc(db.collection('group').doc('groupB'), {bucket: arrayUnion({cart:0, isDone:false, isLock:true, text:"hi"})})
        // bucketRef.doc('EbJhXFg8yQO57LevlIm9').set({arr: arrayUnion("a")})
    }

    return (
        <div>
            <div>This is Bucket</div>
            <button onClick={addWish}>Add</button>
            <BucketList bucketList={bucket} />
        </div>
    );
};

export default Bucket;