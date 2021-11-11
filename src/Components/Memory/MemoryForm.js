import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// import PhotoUploader from "./PhotoUploader";
// import PictureList from "./PictureList";

export default function MemoryForm({
  memory,
  onSubmit,
  pictures,
  removePicture,
  onSubmitPictures,
}) {
console.log(memory);
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
    onSubmit({
        title,
        date,
        text,
        // comments,
    });
};

const inputRef = React.useRef();


return (
    <div>
      Memory

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

          {/* <div>
            <Typography
              style={{ marginBottom: "10px", display: "inline-block" }}
            >
              Pictures
            </Typography>
            <PhotoUploader
              onSubmit={onSubmitPictures}
              addHashtag={addHashtagBySuggestion}
            />

            <PictureList
              pictures={pictures}
              removePicture={removePicture}
              isEditing
            />
          </div> */}

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
            to="/bucket"
          >
            Save
          </Link>
        </div>
      </div>
    </div>
  );
}