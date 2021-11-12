import React, { Component } from 'react';
import {db} from '../firebase';
class ToDoForm extends Component {
    state = {
      text: '',
      number: 1,
      docId: ''
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
      db.collection('wishes').add({
        wishText :this.state.text,
        wishNumber : this.state.number,
      })//docId 추가하기
      .then(docRef => {
        db.collection('wishes').doc(docRef.id).set({
          docId : docRef.id
        },{merge:true})
      })
      this.state.number = this.state.number +1 
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