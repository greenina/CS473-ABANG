import React, { useState, useEffect } from 'react';
import HashInfo from './HashInfo';

const HashList = ({ data, onRemove }) => {
    return (
      <div>
          {data.map((data, id) => (
              <HashInfo id={id} data={data} onRemove={onRemove} />
          ))}
      </div>
    );  
}
export default HashList;