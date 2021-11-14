import React, { Component } from 'react';
import {db} from '../firebase';
import { arrayUnion, updateDoc } from "firebase/firestore";
class ToDoForm extends Component {
    state = {
      // text: '',
      // number: 1,
      // docId: ''
      cart : 0,
      isDone : false, 
      isLock : true, 
      text: " "
    };
    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      });
    };
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.onCreate(this.state);
      this.setState({
        text: '',
      });
    };
    submit =  () => {
      updateDoc(db.collection('group').doc('groupB'), {bucket: arrayUnion({cart:0, isDone:false, isLock:true, text:this.state.text})});
    }
    render() {
      const { text } = this.state;
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <input value={text} name="text" placeholder="..입력" onChange={this.handleChange}></input>
            <button type="submit" onClick={this.submit}>추가</button>
          </form>
        </div>
      );
    }
  }
  
  export default ToDoForm;