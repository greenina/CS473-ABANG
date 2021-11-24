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

    const docRef = db.collection('group').doc('testGroup')
    const user = useAuthState(auth);
    // const email = auth.currentUser.email
    const [options, setOptions] = useState([])
    const [checked, setChecked] = useState([])
    const [title, setTitle] = useState("no title")
    const [users, setUsers] = useState([])
    const [length, setLength] = useState()


    useEffect(()=>{
        // console.log("AUTH",auth)
        async function getOptions (){
            await docRef.get()
            .then(async doc =>{
                const bucket = doc.data().bucket
                const newBucket = []
                await bucket.map(i=>{
                    i.get().then(snapshot => {
                        console.log("snapshott",options.push([snapshot.data().text]))
                        newBucket.push(snapshot.data().text)
                        console.log("new",newBucket)
                        setOptions(newBucket)
                })
                // console.log("options",options)
                })
                await setUsers(doc.data().friends.map(i=>i.email))
                await setLength(doc.data().vote.length)
                await setChecked(Array(options.length).fill(false))
            })
        }
        getOptions()
    },[])


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
                    value:0,
                    trial:false
                    }
                })
            }
            }),
            index:length
        }
        await db.collection('message2').add({
            isText:2,
            text: newVote,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            email:auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })
        await db.collection('vote').add(newVote).then(ref=>{
            updateDoc(docRef, {vote:ref})
        })
        // await updateDoc(db.collection('group').doc('groupZ'), {vote:arrayUnion(newVote)})
        window.location.href = "/chat"
        
    }
    const submitTitle = (e) =>{
                    setTitle(e.target.value)
                }

    // console.log(options)
    // console.log(typeof(options))
    return(
        <div>
            <FormGroup>
            {options.map((option,i)=>{
                const changeChecked = () => {
                    var arr = [...checked]
                    arr[i] = !arr[i]
                    setChecked(arr)
                }
                console.log("!!!!",options)
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