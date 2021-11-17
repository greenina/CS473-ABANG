import React, { useState, useEffect } from "react";
import {auth} from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
//TBD


function CommentItem({ name, comment }) {
    return (<div>{name}: <span style={{ fontWeight: "normal" }}>{comment}</span></div>)
}

function CommentEdit({ name, comment, handleCommentChange }) {
    return (
        <div>{name}: 
            <input 
                style={{ fontWeight: "normal" }} 
                type="text" 
                onChange={handleCommentChange}
                id="comment"
                label="Comment"
                variant="outlined"
                value={comment}
                defaultValue={comment}
            />
        </div>
    )
}

export default function CommentList({ comments, old_comment, handleCommentChange }) {
    var exists = false
    const user = useAuthState(auth)?auth.currentUser.displayName:"ABANG"
    console.log("AAAA",auth.currentUser)
    if(!comments && !handleCommentChange) return <div style={{ fontStyle: "italic", fontWeight: "normal" }}>No comments yet!</div>;

    return (
        <div>
            {comments && comments.map(item => {
                if(handleCommentChange && user === item.name) {
                    exists = true
                    return <CommentEdit name={item.name} comment={old_comment} handleCommentChange={handleCommentChange} />
                } else {
                    return <CommentItem name={item.name} comment={item.comment} />
                }
            })}
            {handleCommentChange && !exists ? <CommentEdit name={user} comment={old_comment} handleCommentChange={handleCommentChange} /> : null}
        </div>
    );
}