import React, { useEffect } from "react";
import {useState} from 'react'; 
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {db, auth} from '../firebase'
import { arrayUnion, updateDoc } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/compat/app';

import OptionList from "../Components/Vote/OptionList";

const MakeVote = (props)=>{

    const docRef = db.collection('group').doc('groupB')
    const user = useAuthState(auth);
    // const email = auth.currentUser.email
    const [options, setOptions] = useState([])
    const [title, setTitle] = useState("no title")
    const [users, setUsers] = useState([])
    const [length, setLength] = useState()
    const [voteRef, setVoteRef] = useState(null)



    const [bucketList, setBucketList] = useState(null);
    const [checked, setChecked] = useState(null)

    useEffect(() => {
        db.collection('group').doc('groupB').get().then(snapshot => {
            setBucketList(snapshot.data().bucket)
            setUsers(snapshot.data().friends.map(i=>i.email))
            console.log(snapshot.data().bucket)
        });
    }, []);

    useEffect(() => {
        if(bucketList) {
            setChecked(new Array(bucketList.length).fill(false))
            setLength(bucketList.length)
        }
    }, [bucketList])

    
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
        console.log(newVote)
        await db.collection('vote').add(newVote).then(async ref=>{
            await db.collection('message2').add({
                isText:2,
                text: newVote,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                email:auth.currentUser.email,
                photoURL: auth.currentUser.photoURL,
                ref: ref.id
            })
            debugger;
            await console.log("REF",ref.id)
            debugger;
            await updateDoc(docRef, {vote:arrayUnion(ref)})
        })
        // await console.log(voteRef)

        
        //await updateDoc(db.collection('group').doc('groupB'), {vote:arrayUnion(newVote)})
        window.location.href = "/chat"
        
    }

    if(!bucketList) return null
    return(
        <div>
            {/* <FormGroup> */}
                <OptionList data={bucketList} setChecked={setChecked} checked={checked} setTitle={setTitle} Submit={Submit} options={options} setOptions={setOptions}/>
            {/* </FormGroup> */}
            {/* <input onChange = {submitTitle}/> */}
            {/* <button onClick={Submit}>MAKE</button> */}
        </div>
    )
}

export default MakeVote;