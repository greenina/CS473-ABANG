import React, {Component, useEffect, useState} from 'react';
import {Route,Link} from 'react-router-dom';
import {db} from '../firebase';
import {doc, getDoc} from "firebase/firestore";

class Ourpage_Edit extends Component {

    render(){
        return(
            <div>
                <h2>Ourpage</h2>
                <div><GroupInfo/></div>
                <br/>
                <Link to = "../ourpage"><button z-index='3'>edit finish!</button></Link>
                
            </div>
        )
    }

}
function GroupInfo(){
    const docRef = db.collection('group').doc("groupB");
    const [groupname, setGroupName]=useState("");
    const [introduce, setIntroduce]=useState("");
    useEffect(()=>{
        db.collection("group")
        .doc("groupB")
        .get()
        .then(doc => {
            if(doc.exists){
                setGroupName(doc.data().info.groupName)
                setIntroduce(doc.data().info.groupIntroduce)
            }
            
        });
    },[])
    const onGroupNameChange=(e) => {
        setGroupName(e.target.value)
    }
    const onIntroduceChange=(e) => {
        setIntroduce(e.target.value)
    }
    const Box ={
        marginTop:"-10px",
        width:"364px",
        height:"36px"
    }
    const submit = () => {
        docRef.get()
        .then(function(querySnapshot){
            if(querySnapshot.exists){
                const lastintroduce = querySnapshot.data().info.groupIntroduce;
                const lastname = querySnapshot.data().info.groupName;
                if(groupname==""){ 
                    groupname = lastname;
                    console.log(groupname);
                }
                if(introduce==""){
                    introduce = lastintroduce;
                    console.log(introduce);
                }
            }
        })
        docRef.set({info:{groupName:groupname, groupIntroduce:introduce}},{merge:true});
    }
   
    

    return<div>
        <input type="text" style={Box} value={groupname} onChange={e=>onGroupNameChange(e)} placeholder={groupname}/>
        <input type="text" style={Box} value={introduce} onChange={e=>onIntroduceChange(e)} placeholder={introduce}/>
        <button onClick={submit}>save</button>
      </div>
}

export default Ourpage_Edit