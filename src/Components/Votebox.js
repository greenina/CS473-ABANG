import React, { useEffect } from "react";
import {useState} from 'react'; 
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {db, auth} from '../firebase'
import { arrayUnion, updateDoc } from "firebase/firestore";
import { connect } from 'react-redux';
import './VoteBox.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import {useParams} from 'react-router-dom'


const mapStateToProps = state =>({
  email : state.counter.email
})

const VoteBox = (props) => {

  const params = useParams()
  const [user] = useAuthState(auth);
  const [wishes, setWishes] = useState([])
  const [checked, setChecked] = useState([])
  const [value, setValue] = useState([])
  const [comment, setComment] = useState([])
  const voteIndex  = params.id //will have to give by props usePrams
  const email = auth.currentUser.email //will have to get by auth.currentUser.email
  const group = "groupB" //will have to get 
  const [result, setResult] = useState([])
  const [show, setShow] = useState(false)
  const [voteName, setVoteName] = useState("")
  const {vid, voteRef} = props

  const Submit = () =>{
    db.collection('vote')
      .doc(vid)
      .get()
      .then((doc)=>{
        const vote = doc.data()
        vote.options.map((i, index)=>{
          i.indiv.map((e, j)=>{
            if(e.email == email){
              i.indiv[j].value = parseInt(Array.from(value, item => (typeof item === 'undefined') || isNaN(item) ? 0 : item)[index]) 
              i.indiv[j].comment = Array.from(comment, item => (typeof item === 'undefined') || isNaN(item) ? "" : item)[index]
            }
          })  
        })
        console.log("vote2",vote)
        updateDoc(db.collection('vote').doc(vid),{vote:vote})
      })
  }

  const eventHandler = (e) =>{
    console.log("HANDLER", e.target.value)
  }
  
  useEffect(()=>{
    db.collection('vote')
    .doc(vid) 
    .get()
    .then((doc)=>{
      debugger;
      console.log("VID",vid)
      debugger;
      console.log("DOC",doc.data())
      if(doc.exists &&  doc.data()){
        const wishArr = doc.data().options.map(i => i.option)
      setWishes(wishArr)
      setVoteName(doc.data().name)
      } else{
        console.log("NUUUL")
      }
      
  })
  },[])
  useEffect(()=>{
    setChecked(Array(wishes.length).fill(false))
    setValue(Array(wishes.length).fill(0))
    setResult(Array(wishes.length).fill(0))
    setComment(Array(wishes.length).fill(""))
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

export default connect(mapStateToProps)(VoteBox);

