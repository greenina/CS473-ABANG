import React, { useEffect } from "react";
import {useState} from 'react'; 
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {db, auth} from '../firebase'
import { arrayUnion, updateDoc } from "firebase/firestore";
import { connect } from 'react-redux';
import './VoteBox.css'
import {useParams} from 'react-router-dom'
import firebase from 'firebase/compat/app';


const mapStateToProps = state =>({
  email : state.counter.email
})

const VoteBox = (props) => {
  const {vid, voteRef} = props
  console.log(vid)

  const params = useParams()
  
  const [wishes, setWishes] = useState()
  const [checked, setChecked] = useState([])
  const [value, setValue] = useState([])
  const [comment, setComment] = useState([])
  const voteIndex  = params.id //will have to give by props usePrams
  const email = auth.currentUser ? auth.currentUser.email : "" //will have to get by auth.currentUser.email
  const group = "groupZ" //will have to get 
  const [result, setResult] = useState([])
  const [show, setShow] = useState(false)
  const [voteName, setVoteName] = useState("")
  const {userEmail} = props
  console.log("userEmail", userEmail)
  const messagesRef = db.collection('message2')

  const sendResult = async() => {

    const { email, photoURL } = auth.currentUser;
    await messagesRef.add({
      isText:4,
      text: {
        vid:vid,
        name:voteName
      },
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      email,
      photoURL 
    })
  }

  const Submit = () =>{
    db.collection('vote')
      .doc(vid)
      .get()
      .then(async (doc)=>{
        const vote = doc.data()
        await vote.options.map((i, index)=>{
          i.indiv.map((e, j)=>{
            console.log(e.email, email)
            if(e.email == email){
              i.indiv[j].value = parseInt(value[index]) 
              i.indiv[j].comment = comment[index]
              i.indiv[j].trial = true
            }
          })
          if(index==0){
            var done = true
            i.indiv.map((e,j)=>{
              if(!e.trial){
                done = false
              }
            })
            if(done){
              console.log("Sending Result!!")
              sendResult()
            }
            else {
              console.log("Not finished!")
            }
          }
        });
        await console.log("vote2",vote)
        await updateDoc(db.collection('vote').doc(vid), vote)
        window.location.href="/chat"
      })
  }


  useEffect(()=>{
    console.log("yay")
    db.collection('vote')
    .doc(vid) //should be later changed to props
    .get()
    .then((doc)=>{
      console.log(doc.data())
      if(doc.data()) {
        const wishArr = doc.data().options.map(i => i.option)
        setWishes(wishArr)
        setVoteName(doc.data().name)
        console.log(wishArr)
      }

  })
  },[])
  useEffect(()=>{
    if(wishes) {
      setChecked(Array(wishes.length).fill(false))
      setValue(Array(wishes.length).fill(0))
      setResult(Array(wishes.length).fill(0))
      setComment(Array(wishes.length).fill(""))
    }
  }, wishes)

  const getResult = () =>{
    db.collection('vote')
    .doc(vid)
    .get()
    .then((doc)=>{
      const result = doc.data().options.map((option, i)=>{
        var sum = 0
        option.indiv.map((indi, j)=>{
          console.log("value",indi.value)
          sum+=indi.value
        })
        return sum
      })
      setResult(result.map(e=>e.toString()+" "))
      console.log("RES",result.map(e=>e.toString()+" "))
    })
    setShow(true)
  }

  if(!wishes) return null

  return (
    <div id="vote_box">
      <h1 id="vote_title">{voteName}</h1>

      <FormGroup>
        {wishes.map((wish, i)=>{
          const changeChecked = () =>{
          var arr = [...checked]
          arr[i] = !arr[i]
          setChecked(arr)
          }

          const submitValue = (e) =>{
            console.log("values1",value)
            var arr = value
            arr[i] = parseInt(e.target.value)
            console.log(arr)
            setValue(Array.from(arr, item => typeof item === 'undefined' ? 0 : item))
            console.log("values2",value)
          }
          const submitComment = (e) =>{
            console.log("comment1",comment)
            console.log("SUBMITCOMMENT")
            var arr = comment
            arr[i] = e.target.value
            console.log(arr)
            setComment(Array.from(arr, item => typeof item === 'undefined' ? "" : item))
            console.log("comment2",comment)

          }
          return (
            <div>
              <FormControlLabel 
                control=
                {<Checkbox 
                  checked={checked[i]} 
                  onChange={changeChecked}
                />} 
                label={wish} />
              {checked[i]?<div><input type="range" onChange={submitValue}  className="input-range__slider" min="0" max="100" step=".1" defaultValue="0" /></div>:<div></div>}

              <input onChange = {submitComment}/>
            </div>
          )
        })}
      </FormGroup>
      <button  onClick={Submit}>VOTE</button>

      <button  onClick={getResult}>RESULT</button>
      
      <div>{result}</div>

    </div>
  );
};

export default VoteBox