import React, { Component } from 'react';
import HashInfo from './hashInfo';

class HashList extends Component {
  render(){
    const { data, onUpdate, onRemove } = this.props;

    return (
      <div>
          {data.map((data) => (
              <HashInfo data={data} onUpdate={onUpdate} onRemove={onRemove} />
          ))}
      </div>
    );
  }  
}
export default HashList;