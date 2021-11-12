import React, { Component } from 'react';
import ToDoForm from './ToDoForm';
import ToDoList from './/ToDoList';

class Bucket extends Component {
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
    this.setState({
      toDoList: toDoList.filter((data) => data.id !== id),
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

export default Bucket;