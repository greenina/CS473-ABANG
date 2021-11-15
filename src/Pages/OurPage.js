import React, {Component} from 'react';
import {Route,Link} from 'react-router-dom';
import { db } from '../firebase';
import Bucket from '../component/bucket';
import Hash from '../component/hash';

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
                //groupname : doc.data().info.groupName,
            })
        });

        db.collection("group")
        .doc("groupB")
        .get()
        .then(doc => {
            this.setState({
                //introduce : doc.data().info.groupIntroduce ,
            })
        });

    }
    render(){
        return(
            <div>
            <div><h2>Ourpage</h2></div>
            <h6>Group Name</h6>
            <h4>{this.state.groupname}</h4>
            <h6>Introduce our group</h6>
            <h4>{this.state.introduce}</h4>
            <button><Link to = "/ourpage/edit">edit</Link></button>
            <Hash/>
            <Bucket/>
            </div>
        )
    }
}
export default Ourpage