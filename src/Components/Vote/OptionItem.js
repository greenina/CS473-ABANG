import React, { useEffect } from "react";
import {useState} from 'react'; 
import {db, auth} from '../../firebase'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const OptionItem = ({ data, checked, i, setChecked, options, setOptions }) => {
    const [id, setID] = useState(null)
    const [text, setText] = useState(null)

    useEffect(() => {
        console.log("DATA",data)
        data.get().then(s => {
            if(s.exists) {
                setID(s.id)
                setText(s.data().text)
            }
        })
      }, [data])

    const changeChecked = () => {
        var arr = [...checked]
        if(arr[i]) {
            arr[i] = false
            options.pop(text)
            setOptions(options)
        } else {
            arr[i] = true
            options.push(text)
            setOptions(options)
        }
        setChecked(arr)
        console.log(checked, options)
    }

    if(!text) return null
    return (
        <div>
            <FormControlLabel 
                control=
                {<Checkbox checked={checked[i]} onChange={(i) => changeChecked(i)} style={{ color: "#68694A"}}/>} 
                label={text} />
        </div>
    )
}

export default OptionItem;