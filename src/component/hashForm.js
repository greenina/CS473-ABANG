import React, { Component } from 'react';
import {db} from '../firebase';
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
      db.collection('hash').add({
        hashName :this.state.text
      })
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
  
  export default HashForm;