import React, { Component } from 'react';
import ToDoForm from './ToDoForm';
import ToDoList from './ToDoList';

class Bucket_Edit extends Component {
  id = 4;
  state = {
    toDoList: []
  };

  handleCreate = (data) => {
    const { toDoList } = this.state;

    this.setState({
      toDoList: toDoList.concat({
        id: this.id++,
        ...data,
      }),
    });
  };
  handleUpdate = (id, data) => {
    const { toDoList } = this.state;

    this.setState({
      toDoList: toDoList.map((toDoList) => {
        console.log(toDoList);
        if (toDoList.id === id) {
          console.log(toDoList.id + ' / ' + id);
          return {
            id,
            ...data,
          };
        }
        return toDoList;
      }),
    });
  };
  handleRemove = (id) => {
    const { toDoList } = this.state;
    toDoList[id] = "null"
    this.setState({
      toDoList: toDoList
    });
  };
  render(){
    const { toDoList } = this.state;
    return (
        <div>
          <div><h2>Our Bucket List</h2></div><br/>
          <ToDoList data={toDoList} onUpdate={this.handleUpdate} onRemove={this.handleRemove} />
          <ToDoForm onCreate={this.handleCreate} />
        </div>
      );
  }
  
}

export default Bucket_Edit;