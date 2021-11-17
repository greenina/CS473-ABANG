import React, {useState} from 'react';
import {db} from '../firebase';

const GroupName = () => {
    const groupRef = db.collection('group');
    const [groupname, setGroupName]=useState("");
    const onGroupNameChange=(e) => {
        setGroupName(e.target.value)
    }
    const groupnameBox ={
        marginTop:"-10px",
        width:"364px",
        height:"36px"
    }
    const submit = () => {
        groupRef.doc("groupZ").set({info:{groupName:groupname}});
    }

    db.collection('group')
    return<div style={groupnameBox}>
        <input type="text" style={groupnameBox} value={groupname} onChange={e=>onGroupNameChange(e)} placeholder='Write down group name!'/>
        <button onClick={submit}>save</button>
      </div>
      
}


export default GroupName;
