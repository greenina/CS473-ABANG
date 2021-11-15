import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import "./MemoryForm.css"

import PhotoUploader from "./PhotoUploader";
import PictureList from "./PictureList";

export default function MemoryForm({
  newId,
  wish,
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
const { bid, id } = useParams();
const [title, setTitle] = useState(memory.title);
const [date, setDate] = useState(memory.date);
const [text, setText] = useState(memory.text);
//   const [comment, setComment] = useState(memory.comments);

const handleTitleChange = (event) => {
    setTitle(event.target.value);
};

const handleDateChange = (event) => {
    setDate(event.target.value);
};

const handleTextChange = (event) => {
    setText(event.target.value);
};

//   const handleCommentChange = (event) => {
//     setComment(event.target.value);
//   };

const handleSubmit = () => {
  console.log(pictures)
    onSubmit({
        title,
        date,
        text,
        // pictures,
        // comments,
    });
};

const inputRef = React.useRef();


return (
    <div className="form-container">
      <div>{ wish }</div>

      <div>
        <div>
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
            />

          <div>
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

          {/* <TextField
            onChange={handleDateChange}
            id="date"
            label="Date"
            variant="outlined"
            multiline
            defaultValue={memory.date}
            rows={5}
          /> */}

        <input
            type="text"
            onChange={handleTextChange}
            id="text"
            label="Text"
            variant="outlined"
            multiline
            defaultValue={memory.text}
            rows={5}
        />

          <Link
            onClick={handleSubmit}
            to={`/bucket/${bid}/memory/${id ? id : newId}`}
          >
            Save
          </Link>
        </div>
      </div>
    </div>
  );
}