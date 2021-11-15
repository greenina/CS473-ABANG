import React, { Component , useEffect} from 'react';
import '../App.css';
import {db} from '../firebase';
import HashForm from './hashForm';
import { arrayRemove, updateDoc } from "firebase/firestore";


class HashInfo extends Component {
    state = {
        toggle : false, 
        text : '',
        style : {
            margin : '10px', 
        },
        locktoggle : true, //true: lock
        boxstyle : {
          display: 'inline-box',
          border: '1px solid lightgray',
          height: '30px',
          width: '100px',
          margin: '5px',
          backgroundColor: 'lightgray',
          "border-radius": "10px"
        }, 
        checktoggle : false // true: check
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value, 
        });
    };
    
    handleRemove = () => {
        const { data, onRemove } = this.props;
        onRemove(data.id);
        updateDoc(db.collection('group').doc('groupB'), {hash: arrayRemove({text:data.text})});
      };
    //handleToggleChange method : false -> true(수정 버튼 클릭)
    //true -> false (적용 버튼 클릭)

    render() {
    const { data } = this.props;
    const { toggle, text, locktoggle} = this.state;
    
    return (
      <div style={this.state.boxstyle}>
        {toggle ? (
          <input
            style={this.state.style}
            onChange={this.handleChange}
            value={text}
            name="text"
          ></input>
        ) : (
          <span style={this.state.style}>{data.text}</span>
        )}
        <button onClick={this.handleRemove}>x</button>
        &nbsp;&nbsp;&nbsp;&nbsp;
      </div>
    );
  }
}
export default HashInfo;