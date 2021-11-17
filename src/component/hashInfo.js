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
          margin : '10px'
        },
        locktoggle : true, //true: lock
        checktoggle : false // true: check 
    };
    
    handleRemove = () => {
        const { data, onRemove } = this.props;
        onRemove(data.id);
        updateDoc(db.collection('group').doc('groupA'), {hash: arrayRemove({text:data.text})});
      };
    //handleToggleChange method : false -> true(수정 버튼 클릭)
    //true -> false (적용 버튼 클릭)

    render() {
    const { data } = this.props;
    const { toggle, text } = this.state;
    return (
      
      <span>
        <img src = "/img/hashBox.png" height = '50px'/>
        <label for = "xbutton">
              <img src = {'/img/Xbutton_yellow.png'} height='20px' style = {{position: 'relative', 'z-index':'1',top:"-20px",left:"-33px"}}/>
        </label>
        <button id="xbutton" onClick={this.handleRemove} style={{display : "none"}} />
        <span style = {{position:'relative', 'z-index':'1', left : '-100px', top: '-25px'}}>{data.text}</span>
      </span>
    );
  }
}
export default HashInfo;