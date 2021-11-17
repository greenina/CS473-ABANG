import React, {useState, useEffect} from 'react';
import {Route,Link} from 'react-router-dom';
import { db } from '../firebase';
import Bucket_Edit from '../component/bucket.js';
import Hash from '../component/hash';
import DisplayImage from '../component/DisplayImage';
import Bucket from '../component/bucket'

const Ourpage = () =>{
    const [name, setName] = useState("")
    const [intro, setIntro] = useState("")

    useEffect(()=>{
        db.collection("group")
        .doc("groupA")
        .get()
        .then(doc => {
            if(doc.exists){
                setName(doc.data().info.groupName)
                setIntro(doc.data().info.groupIntroduce)
            }
            
        });
    },[])
    const inarrange ={
        display : "flex", 
        flexDirection: "column", 
        alignItems:"center"
    }

    return(
        <div>
            <div style ={inarrange}>
            <img src = "/img/Yellow_back.png" style ={{position: 'relative', top:'250px',left:'-36px', width:'743.84px','z-index':'1'}}/>
            <div style = {{position: 'relative' ,top: '-800px'}}><DisplayImage/></div>
            <img src = "/img/groupNameBox.png" style = {{position: 'relative', 'z-index':'2',top:'-900px',left:'-36px'}}/> 
            <h4 style = {{position: 'relative', 'z-index':'3', top:'-960px',left:'-36px'}}>{name}</h4>
            <h2 style = {{position: 'relative', 'z-index':'3', top:'-960px',left:'-280px', 'font-family':'DM Serif Text', color :'#777541'}}>Introduce about Us</h2>
            <h4 style = {{position: 'relative', 'z-index':'3', top:'-990px',left:'-300px',color :'#777541'}}>{intro}</h4>
            <Link to = "/ourpage/edit"><img src = {'/img/edit_button.png'} height='70px' style = {{position: 'relative', top:'-1100px',left: '280px', 'z-index':'2'}}/></Link>
            <Hash/>
            <button><Link to = "/ourpage/bucket"> bucket edit </Link></button>
            <Bucket/>
            </div>
            </div>
    )
}

export default Ourpage