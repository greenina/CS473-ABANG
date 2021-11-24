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
import { fontFamily } from '@mui/system';

class Ourpage_Edit extends Component {

    render(){
        return(
            <div className="info-container">
                <DisplayImage/>
                <div><GroupInfo/></div>
                
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
   
    

    return<div> 
        <input className="group-name" type="text"  value={groupname} onChange={e=>onGroupNameChange(e)} placeholder={groupname}/>
        <div className="info-container">
            <div className="introduce-us">Introduce Us</div>
            
            <input type="text" className='text-jeju' style={{marginTop:"10px", width:"99%", height:'4vh',backgroundColor: "var(--lightyellow)"}}value={introduce} onChange={e=>onIntroduceChange(e)} placeholder={introduce}/>
            <Link to="/ourpage"> <div onClick={submit} className="edit-finish-button" style = {{position: 'relative', color: 'var(--browntext)','z-index':'3',top:"0vh",left:"-78vw"}} >edit finish!</div></Link>
            <Hashtags/>
            <div className="bucket-container">
                        <BucketList show={true} />
            </div>
        </div>
        

      </div>
}

export default Ourpage_Edit