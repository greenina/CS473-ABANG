import React, { Component } from 'react';
import HashForm from './hashForm';
import HashList from './/hashList';

class Hash extends Component {
  id = 4;
  state = {
    hashList: []
  };

  handleCreate = (data) => {
    const { hashList } = this.state;

    this.setState({
      hashList: hashList.concat({
        id: this.id++,
        ...data,
      }),
    });
  };
  handleUpdate = (id, data) => {
    const { hashList } = this.state;

    this.setState({
      hashList: hashList.map((hashList) => {
        console.log(hashList);
        if (hashList.id === id) {
          console.log(hashList.id + ' / ' + id);
          return {
            id,
            ...data,
          };
        }
        return hashList;
      }),
    });
  };
  handleRemove = (id) => {
    const { hashList } = this.state;
    this.setState({
      hashList: hashList.filter((data) => data.id !== id),
    });
  };
  render(){
    const { hashList } = this.state;
    return (
        <div>
          <HashList data={hashList} onUpdate={this.handleUpdate} onRemove={this.handleRemove} />
          <HashForm onCreate={this.handleCreate} />
        </div>
      );
  }

}

export default Hash;