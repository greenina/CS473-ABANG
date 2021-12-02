import React, { useEffect } from "react";
import {useState} from 'react'; 
import {db, auth} from '../../firebase'

import OptionItem from "./OptionItem"

const OptionList = ({ data, setChecked, checked, setTitle, Submit, options, setOptions }) => {
    const [bucketlist, setBucketlist] = useState(null)
    useEffect(()=>{
        setBucketlist(data)
        console.log(data)
    },[data])

    const submitTitle = (e) =>{
        setTitle(e.target.value)
    }

    if(!bucketlist) return null
    return(
        <div>
            {bucketlist.map((data, i) => (
                <OptionItem data={data} i={i} setChecked={setChecked} checked={checked} setTitle={setTitle} options={options} setOptions={setOptions}/>
            ))}
            <input onChange = {submitTitle}/>
            <button  onClick={Submit}>MAKE</button>
        </div>
      )
}

export default OptionList;