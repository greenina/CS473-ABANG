import React, { useEffect } from 'react';
import {useState} from 'react'
import {db} from '../firebase'
import MemoryItem from "./MemoryItem"

const MemoryList = ({ id }) =>{
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
                <MemoryItem bid={id} memory={memory} />
            ))}
            <button onClick={() => window.location.href = `/bucket/${id}/memory/add`}>Add</button>
        </div>
    )
}

export default MemoryList;