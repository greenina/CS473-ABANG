import React, { useEffect } from "react";
import {useState} from 'react'; 
import $ from 'jquery'; 

const InputRange2 = () => {
    const onChangeListener = () =>{
        console.log("changing")
    }
    return(
      <div>range slider</div>
    );
}


// React.render(
//   <div>
//     <Title value="ReactJS progress bar example" />
//     <ProgressBar />
//     <InputRange />
//   </div>,
//   document.getElementById("app")
// );

export default InputRange2;