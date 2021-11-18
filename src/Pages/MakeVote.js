import React, { useEffect } from "react";
import {useState} from 'react'; 
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {db, auth} from '../firebase'
import { arrayUnion, updateDoc } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/compat/app';

const MakeVote = (props)=>{

    const docRef = db.collection('group').doc('groupZ')

    const user = useAuthState(auth);
    // const email = auth.currentUser.email
    const [options, setOptions] = useState([])
    const [checked, setChecked] = useState([])
    const [title, setTitle] = useState("")
    const [users, setUsers] = useState([])
    const [vote, setVote] = useState()
    const [length, setLength] = useState()

    useEffect(()=>{
        console.log("AUTH",auth)
        // console.log("USER",auth.currentUser.email)
        db.collection('group')
        .doc('groupZ')
        .get()
        .then(doc =>{
            console.log("DATA",doc.data())
            setOptions(doc.data().bucket.map(i=>i.text))
            setUsers(doc.data().friends.map(i=>i.email))
            setLength(doc.data().vote.length)
        })
    },[])
    useEffect(()=>{
        setChecked(Array(options.length).fill(false))
    },options)

    const Submit = async () => {
        const newVote = {
            createdAt: Date.now(),
            name:title,
            // madeBy:email,
            options: options.map(option =>{
                return {
                option:option,
                indiv: users.map(user =>{
                    console.log("user",user)
                    return {
                    comment:"",
                    email:user,
                    value:0
                    }
                })
            }
            }),
            index:length
        }
        await db.collection('message2').add({
            isText:false,
            text: newVote,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            email:auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })

        await updateDoc(db.collection('group').doc('groupZ'), {vote:arrayUnion(newVote)})
        window.location.href = "/chat"
        
    }
    const submitTitle = (e) =>{
                    setTitle(e.target.value)
                }
    return(
        <div>
            <FormGroup>
            {options.map((option,i)=>{
                const changeChecked = () => {
                    var arr = [...checked]
                    arr[i] = !arr[i]
                    setChecked(arr)
                }
                
                return(
                    <FormControlLabel 
                    control=
                    {<Checkbox checked={checked[i]} onChange={changeChecked}/>} 
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