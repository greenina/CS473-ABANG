import React, { Component } from 'react';
import {db} from '../firebase';
import { arrayUnion, updateDoc } from "firebase/firestore";

class HashForm extends Component {
    state = {
      text: ''
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
      updateDoc(db.collection('group').doc('groupB'), {hash : arrayUnion({text:this.state.text})});
    }
    render() {
      const { text } = this.state;
      return (
        <div>
          <form onSubmit={this.handleSubmit} style = {{position: 'absolute', 'z-index':'1',top:"45vh",left:"45vw"}}>
            <div style={{position:"absoulte", 'z-index':'3', top:"10vh", right:"40vw"}}>
            <input value={text} style ={{position: 'absolute', top:"1vh", left:"-13vw"}} name="text" placeholder="Write down your group's bucketlist" onChange={this.handleChange}></input>
            <label for = "hashplus"><img src = {'/img/hashplus.png'} height='50px' /></label>
            <button onClick={this.submit} id="hashplus" style={{display : "none"}}/>
            </div>
          </form>
        </div>
      );
    }
  }
  
  export default HashForm;