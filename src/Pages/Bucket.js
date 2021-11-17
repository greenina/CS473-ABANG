import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { db } from "../firebase"
import { arrayUnion, updateDoc } from "firebase/firestore";

const MemoryItem = ({ bucket, item }) => {
    const [id, setID] = useState(null);
    const [memory, setMemory] = useState(null);
    item.get().then(snapshot => {
        setID(snapshot.id)
        setMemory(snapshot.data())
    })

    if(!memory) return null;
    return (
        <Link to={`/bucket/${bucket}/memory/${id}`}>
            <div>{ memory.title }</div>
            <div>{ memory.date }</div>
            <div>{ memory.text }</div>
        </Link>
    );
};

const MemoryList = ({ bucket, memories }) => {
    if(!memories) return null;
    return memories.map((item) => <MemoryItem bucket={bucket} item={item} />);
};

const BucketItem = ({ bid, item }) => {
    if(!item) return null;
    console.log(item.id)
    return (
        <div>
            <div>text: { item.data.text }</div>
            <Link to={`/bucket/${item.id}/memory/add`}>Add</Link>
            <MemoryList bucket={item.data.text} memories={item.data.memories} />
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
            const tmp = snapshot.docs.map(i => ({
                id: i.id,
                data: i.data()
            }));
            console.log(tmp)
            setBucket(tmp);
        });
    }, [bucketRef]);

    return (
        <div>
            <div>This is Bucket</div>
            <BucketList bucketList={bucket} />
        </div>
    );
};

export default Bucket;