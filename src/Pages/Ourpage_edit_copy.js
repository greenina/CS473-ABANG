import React, {Component, useEffect, useState} from 'react';
import {Route,Link} from 'react-router-dom';
import {db} from '../firebase';
import {doc, getDoc} from "firebase/firestore";
import GroupName from '../component/groupname';
import Introduce from '../component/introduce';
import DisplayImage from '../Components/Ourpage/DisplayImage';
import NavBar from '../Components/Main/NavBar';
import Hashtags from "../Components/Ourpage/Hashtags";
import BucketList from '../component/BucketList'
import zIndex from '@material-ui/core/styles/zIndex';
import "../Components/Ourpage/Ourpage.css"
import GroupImage from "../Components/Ourpage/GroupImage";
import { fontFamily } from '@mui/system';

class Ourpage_Edit extends Component {

    render(){
        return(
            <div className="ourpage">
                <div className="ourpage-container">
                    {/* <DisplayImage/> */}
                    <GroupImage />
                    <br/>
                    <GroupInfo/>
                </div>
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
        marginTop:"10px",
        width:"364px",
        height:"36px",
        backgroundColor: "var(--lightyellow)"
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
   
    

    return (
        <div> 
            <input className="group-name" type="text"  value={groupname} onChange={e=>onGroupNameChange(e)} placeholder={groupname}/>
            <div className="info-container">
            <div className="group-introduction">
                <div className="header">
                    Introduce Us
                    <Link to="/ourpage"> <div onClick={submit} className="edit-finish-button" style = {{position: 'relative', color: 'var(--browntext)', marginTop: "0px", fontWeight: "normal", fontSize: "18px"}} >edit finish!</div></Link>
                </div>
                
                <input type="text" className='text-jeju group-introduction-text' style={{ width: "calc(100% - 20px)", backgroundColor: "var(--lightyellow)"}} value={introduce} onChange={e=>onIntroduceChange(e)} placeholder={introduce}/>
                <Hashtags/>
                
                </div>
                <div className="bucket-container">
                    <BucketList show={true} />
                </div>
            </div>
        </div>
    )
}

export default Ourpage_Edit