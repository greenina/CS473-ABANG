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
        text: "",
        toggle : false,
        style : {
            margin : '10px', 
        },
        boxstyle : {
          border: '1px solid black',
          padding: '25px',
          margin: '15px',
          backgroundColor: 'white'
        }
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value 
        });
        
    };
    
    handleRemove = () => {
        const {cart, isDone, isLock, text} = this.state;
        const { data, onRemove } = this.props;
        //console.log(data);
        onRemove(data.id);
        console.log("handleRemove: cart, isDone, isLock, text, 아랫줄은 data.전자들");
        console.log(cart, isDone, isLock, text); 
        console.log(data.cart, data.isDone, data.isLock, data.text);
        updateDoc(db.collection('group').doc('groupB'), {bucket: arrayRemove({cart:cart, isDone: data.isDone, isLock: isLock, text:data.text})});
      };


    handleToggleChange = () => {
        const { toggle, text } = this.state;
        const { data, onUpdate } = this.props;
        const docRef = db.collection('group').doc('groupB');
        var index = 0;
        //console.log(data.text);
        //console.log(text);
        if (!toggle) { //toggle is false 일 때 --> 수정 버튼 
          this.setState({
            text  : data.text, //data.text가 현재 데이터 (현재 데이터 & 적용 버튼 view)
            toggle: true,
          });

        } else { // 적용 버튼 --> 이때 데이터 업로드 해야 
          onUpdate(data.id, { text: text });
          this.setState({
            toggle: false,
          });
          
          docRef.get()
        .then(function(querySnapshot){
          if(querySnapshot.exists){
            var length = querySnapshot.data().bucket.length;
            for(var i=0; i<length; i++){
              if(querySnapshot.data().bucket[i].text==data.text){
                index = i;
                const docSnap =  getDoc(docRef).then(function(dbData){
                  const curData = dbData.data();
                  curData.bucket[index].text = text;
                  docRef.set(curData, {merge:true});
                  //updateDoc(db.collection('group').doc('groupB'), {bucket: arrayUnion({cart:0, isDone:false, isLock:true, text:this.state.text})});
                  }
                );
                }
              }
          
            }
          }
          )
        }

      };


      handleLockToggleChange = () => {
        const { isLock } = this.state;
        const { data } = this.props;
        const docRef = db.collection('group').doc('groupB');
        
        var index = 0; 
        //console.log(data.isLock);
        this.setState(
          {isLock:!isLock}
        )
        data.isLock = !data.isLock
        console.log(data.isLock);
        
        docRef.get()
        .then(function(querySnapshot){
          if(querySnapshot.exists){
            var length = querySnapshot.data().bucket.length;
            for(var i=0; i<length; i++){
              if(querySnapshot.data().bucket[i].text==data.text){
                index = i;
                const docSnap =  getDoc(docRef).then( function(dbData){
                  const curData = dbData.data();
                  curData.bucket[index].isLock = !dbData.data().bucket[index].isLock;
                  docRef.set(curData, {merge:true});
                  }
                );
                }
              }
          
            }
          }
          )
      };

      handleCheckToggleChange = () => {
        const { isDone } = this.state;
        const { data } = this.props;
        const docRef = db.collection('group').doc('groupB');

        var index = 0; 
        // false -> true
        data.isDone = !data.isDone;
        console.log(isDone);
        if (!isDone) { //isDone is false --> 체크 안된 상태 
          this.setState({
            isDone : !isDone, //change false to true
            boxstyle : {
              border: '1px solid black',
              padding: '25px',
              margin: '15px',
              backgroundColor: 'lightgreen'
            }
          });
        } else {
          this.setState({
            isDone: !isDone,
            boxstyle : {
              border: '1px solid black',
              padding: '25px',
              margin: '15px',
              backgroundColor: 'white'
            }
          });
        }
        console.log(isDone);

        docRef.get()
        .then(function(querySnapshot){
          if(querySnapshot.exists){
            var length = querySnapshot.data().bucket.length;
            for(var i=0; i<length; i++){
              if(querySnapshot.data().bucket[i].text==data.text){
                index = i;
                const docSnap =  getDoc(docRef).then(function(dbData){
                  const curData = dbData.data();
                  //console.log(curData);
                  curData.bucket[index].isDone = !isDone; 
                  docRef.set(curData, {merge:true});
                  }
                );
                }
              }
            }
          }
          )
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