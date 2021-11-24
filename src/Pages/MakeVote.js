import React, { useEffect } from "react";
import {useState} from 'react'; 
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {db} from '../firebase'
import { arrayUnion, updateDoc } from "firebase/firestore";
import DateTimePicker from 'react-datetime-picker';
import TextField from '@mui/material/TextField';

const MakeVote = (props)=>{

    const [options, setOptions] = useState([])
    const [checked, setChecked] = useState([])
    const [title, setTitle] = useState("")
    const [users, setUsers] = useState([])

    useEffect(()=>{
        db.collection('group')
        .doc('groupZ')
        .get()
        .then(doc =>{
            setOptions(doc.data().bucket.map(i=>i.text))
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
        <div style={{display:"flex", flexDirection:"column",justifyContent:"flex-start",maxWidth: "100vw", width:"100vw"}}>
            <FormGroup>
            <div style={{height:"70vh",width:"100vw",background:"#F4CCCC", display:"flex", justifyContent:"center", alignItems:"center"}}>
                <div style={{height:"80%", width:"80%", backgroundColor:"#F2E1E1", padding:10, borderRadius:10}}>
            {options.map((option,i)=>{
                const changeChecked = () =>{
                    var arr = [...checked]
                    arr[i] = !arr[i]
                    setChecked(arr)
                }
                
                return(
                    
                    <div style={{display:"flex", flexDirection:"column",justifyContent:"flex-end", width:"100%-20px",background:"#EFF1EE",color:"#605A2A", marginBottom:"15px",borderRadius:10, paddingLeft:"10px", paddingRight:"10px"}}>
                    <FormControlLabel 
                    control=
                    {<Checkbox checked={checked[i]} onChange={changeChecked}/>} 
                    label={option} />
                    </div>
                    
                )
            })}
            </div>
            </div>
            </FormGroup>
            
            <TextField id="standard-basic" onChange = {submitTitle} label=" Enter the Title of the vote." variant="standard" style={{marginBottom:"15px"}}/>
            
            <button style={{width:"10vw",height:"auto",backgroundColor:"#EAAEAE", color:"#FDFCF7",borderWidth:0,
      boxShadow:"0px 2px 4px rgba(0, 0, 0, 0.25)", borderRadius:"10px", padding:5, margin: "auto"}} onClick={Submit}>MAKE</button>
        </div>
    )
}

export default MakeVote;