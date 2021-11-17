import { NoMeetingRoomSharp } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import PhotoUploader from "./PhotoUploader";
import PictureList from "./PictureList";
import CommentList from "./CommentList";

//TBD
const user = "Shinung"

export default function MemoryForm({
  id,
  memory,
  onSubmit,
  pictures,
  urls,
  progress,
  removePicture,
  onSubmitPictures,
  handleChange,
  handleUpload,
}) {
// console.log(memory);
const { bid } = useParams();
const [title, setTitle] = useState(memory.title);
const [date, setDate] = useState(memory.date);
const [text, setText] = useState(memory.text);
const [comments, setComments] = useState(memory.comments ? memory.comments : []);

const [comment, setComment] = useState(memory.comments && memory.comments.find(x => x.name === user) ? memory.comments.find(x => x.name === user).comment : "");

useEffect(() => {
  var exists = false
  if(!comments) return
  setComments(comments.map(item => {
    if(item.name === user) {
      exists = true
      return { name: user, comment: comment }
    } else {
      return item
    }
  }))
  if(!exists) setComments([...comments, { name: user, comment: "" }])
  console.log(comment)
}, [comment])

const handleTitleChange = (event) => {
    setTitle(event.target.value);
};

const handleDateChange = (event) => {
    setDate(event.target.value);
};

const handleTextChange = (event) => {
    setText(event.target.value);
};

const handleCommentChange = (event) => {
  setComment(event.target.value);
};

const handleSubmit = () => {
  onSubmit({
      title,
      date,
      text,
      comments,
  });
};

const inputRef = React.useRef();


return (
    <div>
      <div className="memory-content">
        <input
            type="text"
            onChange={handleTitleChange}
            id="title"
            label="Title"
            variant="outlined"
            value={title}
            defaultValue={memory.title}
            inputRef={inputRef} 
        />

        <input
            type="date"
            onChange={handleDateChange}
            id="date"
            label="Date"
            variant="outlined"
            value={date}
            defaultValue={memory.date}
            inputRef={inputRef}
            style={{ marginLeft: "10px" }} 
        />

        <textarea
          type="text"
          onChange={handleTextChange}
          id="text"
          label="Text"
          variant="outlined"
          multiline
          defaultValue={memory.text}
          rows={5}
        />

        <div className="input">
          Pictures
          <PhotoUploader
            onSubmit={onSubmitPictures}
          />

          <PictureList
            pictures={pictures}
            removePicture={removePicture}
            isEditing
          />
        </div>
      </div>
      <div className="memory-comments">
        <div className="comments-header">Comments</div>
        <CommentList comments={memory.comments} old_comment={comment} handleCommentChange={handleCommentChange} />
      </div>
      <button onClick={handleSubmit} className="save-button">
        Save
      </button>
    </div>
  );
}