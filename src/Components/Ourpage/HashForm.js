import React, { useState, useEffect } from 'react';
import {db} from '../../firebase';
import { arrayUnion, updateDoc } from "firebase/firestore";

const HashForm = () => {
    const [text, setText] = useState("")

    const handleChange = (e) => {
        setText(e.target.value)
    };

    const onSubmit =  () => {
      updateDoc(db.collection('group').doc('groupB'), {hash : arrayUnion({ text: text })});
      window.location.href = "/ourpage"
    }

    return (
        <div className="hashtag-input">
            <input value={text} name="text" placeholder="Add a new hashtag!" onChange={handleChange} />
            <div onClick={onSubmit} className="hashtag-add clickable">Add</div>
        </div>
    );
  }
  
  export default HashForm;