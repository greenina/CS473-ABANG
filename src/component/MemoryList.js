import React, { useEffect } from 'react';
import {useState} from 'react'
import {db} from '../firebase'
import MemoryItem from "./MemoryItem"

const MemoryList = ({ id, detail }) =>{
    const [memories, setMemories] = useState([])

    useEffect(() => {
        db.collection('bucket').doc(id).get().then(snapshot => {
            setMemories(snapshot.data().memories)
        });
    }, []);

    if(!memories) return null

    return (
        <div>
            {memories.map((memory) => (
                <MemoryItem bid={id} memory={memory} detail={detail} />
            ))}
            {!detail ? <button className="clickable" onClick={() => window.location.href = `/bucket/${id}/memory/add`}>Add</button> : null }
        </div>
    )
}

export default MemoryList;