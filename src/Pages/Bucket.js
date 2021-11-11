import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MemoryItem = ({ item }) => {
    const [id, setID] = useState(null);
    const [memory, setMemory] = useState(null);
    item.get().then(snapshot => {
        setID(snapshot.id)
        setMemory(snapshot.data())
    })

    if(!memory) return null;
    return (
        <Link to={`/memory/${id}`}>
            <div>{ memory.title }</div>
            <div>{ memory.date }</div>
            <div>{ memory.text }</div>
        </Link>
    );
};

const MemoryList = ({ memories }) => {
    if(!memories) return null;
    return memories.map((item) => <MemoryItem item={item} />);
};

const BucketItem = ({ item }) => {
    if(!item) return null;

    return (
        <div>
            <div>text: { item.wishText }</div>
            <MemoryList memories={item.memories} />
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

    return (
        <div>
            <div>This is Bucket</div>
            <BucketList bucketList={bucket} />
        </div>
    );
};

export default Bucket;