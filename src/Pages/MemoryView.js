import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PictureList from "../Components/Memory/PictureList";

const MemoryView = ({ memoryRef }) => {
    const { bid, id } = useParams();
    const [wish, setWish] = useState(null);
    const [memory, setMemory] = useState(null);

    useEffect(() => {
        if(!memoryRef) return;
        memoryRef.doc(id).get().then((snapshot) => {
            setMemory(snapshot.data());
        });
    }, [memoryRef]);

    if(!memory) return null;

    return (
        <div>
            <div>This is MemoryView</div>
            <div>{ bid }</div>
            <Link to={`/bucket/${bid}/memory/${id}/edit`}>Edit</Link>
            <div>Title: { memory.title }</div>
            <div>Date: { memory.date }</div>
            <div>Text: { memory.text }</div>
            Photos:
            <PictureList pictures={memory.pictures} isEditing={false} />
        </div>
    );
};

export default MemoryView;