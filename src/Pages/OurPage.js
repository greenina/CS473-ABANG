import React, {Component} from 'react';
import {useRouter,useState} from 'next/router';
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
        return(
            <div>
            <DisplayImage/>
            <div><h2>Ourpage</h2></div>
            <h6>Group Name</h6>
            <h4>{this.state.groupname}</h4>
            <h6>Introduce our group</h6>
            <h4>{this.state.introduce}</h4>
            <button><Link to = "/ourpage/edit">edit</Link></button>
            <Hash/>
            <button><Link to = "/ourpage/bucket"> bucket edit </Link></button>
            </div>
        )
    }
}
export default Ourpage