import React, { useEffect } from "react";
import {useState} from 'react'; 
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {db} from '../firebase'
import { arrayUnion, updateDoc } from "firebase/firestore";

const MakeVote = (props)=>{

    const [options, setOptions] = useState([])
    const [checked, setChecked] = useState([])
    const [title, setTitle] = useState("")
    const [users, setUsers] = useState([])

    useEffect(()=>{
        db.collection('group')
        .doc('groupB')
        .get()
        .then(doc =>{
            setOptions(doc.data().buckets.map(i=>i.text))
            setUsers(doc.data().friends.map(i=>i.name))
        })
    },[])
    useEffect(()=>{
        setChecked(Array(options.length).fill(false))
    },options)

    const Submit = () => {
        const newVote = {
            createdAt: Date.now(),
            name:title,
            options: options.map(option =>{
                return {
                option:option,
                indiv: users.map(user =>{
                    console.log("user",user)
                    return {
                    comment:"",
                    uid:user,
                    value:0
                    }
                })
            }
            })
        }
        console.log("newvote2",newVote)
        updateDoc(db.collection('group').doc('groupB'), {vote:arrayUnion(newVote)})
    }

    const submitTitle = (e) =>{
                    setTitle(e.target.value)
                }

    return(
        <div>
            <FormGroup>
            {options.map((option,i)=>{
                const changeChecked = () =>{
                    var arr = [...checked]
                    arr[i] = !arr[i]
                    setChecked(arr)
                }
                
                return(
                    <FormControlLabel 
                    control=
                    {<Checkbox checked={checked[i]} onChange={changeChecked} style={{ color: "#68694A"}}/>} 
                    label={option} />
                )
            })}
            </FormGroup>
            <input onChange = {submitTitle}/>
            <button  onClick={Submit}>MAKE</button>
        </div>
    )
}

export default MakeVote;