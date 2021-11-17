import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PictureList from "../Components/Memory/PictureList";
import CommentList from "../Components/Memory/CommentList";

import closeButton from "../Icons/CloseButton.png"
import editButton from "../Icons/EditButton.png"

import "../Components/Memory/Memory.css"

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
        <div className="memory">
            <Link to="/bucket" className="close-button"><img src={closeButton} width="100%" /></Link>
            <div className="header">Our Bucket list</div>
            <div className="memory-bucket">
                { bid }
                <Link to={`/bucket/${bid}/memory/${id}/edit`} className="edit-button"><img src={editButton} width="100%" /></Link>
            </div>
            <div className="memory-container">
                <div className="memory-content">
                    <div className="memory-text">
                        <div className="title">{ memory.title }</div>
                        <div className="date">{ memory.date }</div>
                        <div className="text textarea">{ memory.text }</div>
                    </div>
                    <PictureList pictures={memory.pictures} isEditing={false} />
                </div>
                <div className="memory-comments">
                    <div className="comments-header">Comments</div>
                    <CommentList comments={memory.comments} />
                </div>
            </div>
        </div>
    );
};

export default MemoryView;