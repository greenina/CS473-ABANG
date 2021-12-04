import React, { useEffect } from "react";
import {useState} from 'react'; 
import {db, auth} from '../../firebase'
import '../../Pages/MakeVote.css';

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
            <input onChange = {submitTitle} className="set_vote_title" placeholder='Write title of new vote!'/>
            {bucketlist.map((data, i) => (
                <li className='list-text'><OptionItem data={data} i={i} setChecked={setChecked} checked={checked} setTitle={setTitle} options={options} setOptions={setOptions}/>
                </li>
            ))}
            <button  onClick={Submit} className='vote-make-button clickable'>MAKE NEW VOTE</button>
        </div>
      )
}

export default OptionList;