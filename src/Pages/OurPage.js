import React, {Component} from 'react';
import {Route,Link} from 'react-router-dom';
import { db } from '../firebase';
import Bucket_Edit from '../component/bucket.js';
import Hash from '../component/hash';
import DisplayImage from '../component/DisplayImage';

class Ourpage extends Component {
    //get firestore data
    state = {
        groupname : "",
        introduce : ""
    }
    
    componentDidMount(){
        db.collection("group")
        .doc("groupB")
        .get()
        .then(doc => {
            this.setState({
                groupname : doc.data().info.groupName,
            })
        });

        db.collection("group")
        .doc("groupB")
        .get()
        .then(doc => {
            this.setState({
                introduce : doc.data().info.groupIntroduce ,
            })
        });

    }
    render(){
        const inarrange ={
            display : "flex", 
            flexDirection: "column", 
            alignItems:"center"
        }
        return(
            <div>
            <div style ={inarrange}>
            <DisplayImage/>
            <img src = "/img/groupNameBox.png" style = {{position: 'relative',top:'-35px',left:'-36px'}}/> 
            <h4 style = {{position: 'relative', 'z-index':'1', top:'-95px',left:'-36px'}}>{this.state.groupname}</h4>
            <h4>{this.state.introduce}</h4>
            <button><Link to = "/ourpage/edit">edit</Link></button>
            <Hash/>
            <button><Link to = "/ourpage/bucket"> bucket edit </Link></button>
            </div>
            </div>
        )
    }
}
export default Ourpage