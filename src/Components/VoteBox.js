import React, { useEffect } from "react";
import {useState} from 'react'; 
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {db} from '../firebase'
import { arrayUnion, updateDoc } from "firebase/firestore";
import { connect } from 'react-redux';
import './VoteBox.css'


const mapStateToProps = state =>({
  email : state.counter.email
})

const VoteBox = (props) => {
  
  const [wishes, setWishes] = useState([])
  const [checked, setChecked] = useState([])
  const [value, setValue] = useState([])
  const [comment, setComment] = useState([])
  const voteIndex  = props.index //will have to give by props
  const email = "kaist.helloworld@gmail.com" //will have to get by auth.currentUser.email
  const group = "groupA" //will have to get 
  const [result, setResult] = useState([])
  const [show, setShow] = useState(false)
  const [voteName, setVoteName] = useState("")
  const {userEmail} = props
  console.log("userEmail", userEmail)

  const Submit = () =>{
    db.collection('group')
      .doc(group)
      .get()
      .then((doc)=>{
        const vote = [...doc.data().vote]
        vote[voteIndex].options.map((i, index)=>{
          i.indiv.map((e, j)=>{
            if(e.email == email){
              i.indiv[j].value = parseInt(Array.from(value, item => typeof item === 'undefined' ? 0 : item)[index]) 
              i.indiv[j].comment = Array.from(comment, item => typeof item === 'undefined' ? 0 : item)[index]
            }
          })  
        })
        console.log("vote2",vote)
        updateDoc(db.collection('group').doc(group),{vote:vote})
      })
  }

  const eventHandler = (e) =>{
    console.log("HANDLER", e.target.value)
  }
  
  useEffect(()=>{
    db.collection('group')
    .doc(group) //should be later changed to props
    .get()
    .then((doc)=>{
      const wishArr = doc.data().vote[voteIndex].options.map(i => i.option)
      setWishes(wishArr)
      setVoteName(doc.data().vote[voteIndex].name)
  })
  },[])
  useEffect(()=>{
    setChecked(Array(wishes.length).fill(false))
    setValue(Array(wishes.length).fill(0))
    setResult(Array(wishes.length).fill(0))
    setComment(Array(wishes.length).fill(""))
  }, wishes)

  const getResult = () =>{
    db.collection('group')
    .doc(group)
    .get()
    .then((doc)=>{
      const result = doc.data().vote[voteIndex].options.map((option, i)=>{
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
            var arr = [...value]
            arr[i] = parseInt(e.target.value)
            setValue(Array.from(arr, item => typeof item === 'undefined' ? 0 : item))
            console.log("values2",value)
          }
          const submitComment = (e) =>{
            console.log("comment1",comment)
            console.log("SUBMITCOMMENT")
            var arr = [...comment]
            arr[i] = e.target.value
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
              {checked[i]?<div><input type="number" onChange={submitValue}/><input type="range" onChange={submitValue}  className="input-range__slider" min="0" max="100" step=".1" defaultValue="0" /></div>:<div></div>}
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

export default connect(mapStateToProps)(VoteBox);
