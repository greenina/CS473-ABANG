import React, { Component , useEffect} from 'react';
import '../App.css';
import {db} from '../firebase';
import ToDoForm from './ToDoForm';


class ToDoInfo extends Component {
    state = {
        toggle : false, 
        text : '',
        style : {
            margin : '10px', 
        },
        locktoggle : true, //true: lock
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
        onRemove(data.id);
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
        const { locktoggle } = this.state;
        // false -> true
        if (!locktoggle) {
          this.setState({
            locktoggle: true,
          });
        } else {
          this.setState({
            locktoggle: false,
          });
        }
        // true -> false
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
    const { toggle, text, locktoggle} = this.state;
    
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
        <button onClick={this.handleLockToggleChange}>{locktoggle ? <img src={"/img/unlocked.png"} height='30px'/> : <img src={"/img/locked.png"} height='30px'/>}</button>
        </li>
      </div>
    );
  }
}
export default ToDoInfo;