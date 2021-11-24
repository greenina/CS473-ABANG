import React, { useState, useEffect} from 'react';
import {db} from '../../firebase';
import HashForm from './HashForm';
import { arrayRemove, updateDoc } from "firebase/firestore";


const HashInfo = ({ id, data, onRemove }) => {
    
    const handleRemove = (e) => {
        onRemove(e.target.id);
        updateDoc(db.collection('group').doc('groupB'), {hash: arrayRemove({text:data.text})});
      };

    if(!data) return null
      
    return (
      <div className="hashtag-item">
        <div>{ data.text }</div>
        <div onClick={handleRemove} id={id}><img src = {'/img/Xbutton_yellow.png'} height='20px' /></div>
      </div>
    );
}
export default HashInfo;