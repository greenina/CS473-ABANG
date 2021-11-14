import React, { Component , useEffect} from 'react';
import '../App.css';
import {db} from '../firebase';
import ToDoForm from './ToDoForm';
import {doc, getDoc} from "firebase/firestore";
import { arrayRemove, updateDoc } from "firebase/firestore";

class ToDoInfo extends Component {
    state = {
        cart : 0,
        isDone : false, //true : checked
        isLock : true,  // true: locked
        text: "jeonga",
        toggle : false,
        style : {
            margin : '10px', 
        },
        boxstyle : {
          border: '1px solid black',
          padding: '25px',
          margin: '15px',
          backgroundColor: 'white'
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
        console.log(data);
        onRemove(data.id);
        updateDoc(db.collection('group').doc('groupB'), {bucket: arrayRemove({cart:data.cart, isDone: data.isDone, isLock: data.isLock, text:data.text})});
      };
    //handleToggleChange method : false -> true(수정 버튼 클릭)
    //true -> false (적용 버튼 클릭)
    handleToggleChange = () => {
        const { toggle, text } = this.state;
        const { data, onUpdate } = this.props;
        // false -> true
        if (!toggle) {
          this.setState({
            text  : data.text,
            toggle: true,
          });
        } else {
          onUpdate(data.id, { text: text });
          this.setState({
            toggle: false,
          });
        }
        // true -> false
      };
      handleLockToggleChange = () => {
        const { isLock } = this.state;
        const { data } = this.props;
        const docRef = db.collection('group').doc('groupB');
        
        var index = 0; 
        // false -> true
        //if (!isLock) {
        if(true){
          this.setState({
            isLock: !isLock
          });
          console.log(data.text);
          
          docRef.get()
          .then(function(querySnapshot){
            if(querySnapshot.exists){
              var length = querySnapshot.data().bucket.length;
              //console.log(length);
              for(var i=0; i<length; i++){
                if(querySnapshot.data().bucket[i].text==data.text){
                  console.log(querySnapshot.data().bucket[i]);
                  console.log(data.text);
                  index = i;
                  //console.log(index);
                  //docSnap.bucket[index].isLock=false;
                  const docSnap =  getDoc(docRef).then( function(dbData){
                    //console.log(dbData.data());
                    const curData = dbData.data();
                    curData.bucket[index].isLock = !dbData.data().bucket[index].isLock;
                    docRef.set(curData, {merge:true});
                    }
                  );
                  
                  
                  //docRef.set({bucket:{index:{cart:data.cart, isDone:data.isDone, isLock:!data.isLock, text:data.text}}},{merge:true});
                  //updateDoc(db.collection('group').doc('groupB'), {bucket:{index:{cart:0, isDone:false, isLock:false, text:this.state.text}}});
                }
              }
          
            }
          }
          )

          //updateDoc(db.collection('group').doc('groupB').data().bucket, {isLock:true});
        } 
      };
      handleCheckToggleChange = () => {
        const { checktoggle } = this.state;
        // false -> true
        if (!checktoggle) {
          this.setState({
            checktoggle: true,
            boxstyle : {
              border: '1px solid black',
              padding: '25px',
              margin: '15px',
              backgroundColor: 'lightgreen'
            }
          });
        } else {
          this.setState({
            checktoggle: false,
            boxstyle : {
              border: '1px solid black',
              padding: '25px',
              margin: '15px',
              backgroundColor: 'white'
            }
          });
        }
        // true -> false
      };
      

    render() {
    const { data } = this.props;
    const { toggle, text, isLock} = this.state;
    
    return (
      <div>
        <li style={this.state.boxstyle}>
        <input type="checkbox" id="unchecked" onClick={this.handleCheckToggleChange}/>
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
        <button onClick={this.handleToggleChange}>{toggle ? '적용' : '수정'}</button>
        <button onClick={this.handleRemove}>삭제</button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={this.handleLockToggleChange}>{isLock ? <img src={"/img/locked.png"} height='30px'/> : <img src={"/img/unlocked.png"} height='30px'/>}</button>
        </li>
      </div>
    );
  }
}
export default ToDoInfo;