import React, { useEffect } from "react";
import {useState} from 'react'; 
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {db} from '../firebase'
import { arrayUnion, updateDoc } from "firebase/firestore";

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

  const Submit = () =>{
    db.collection('group')
      .doc(group)
      .get()
      .then((doc)=>{
        const vote = [...doc.data().vote]
        vote[voteIndex].options.map((i, index)=>{
          i.indiv.map((e, j)=>{
            if(e.email == email){
              i.indiv[j].value = parseInt(value[index]) 
              i.indiv[j].comment = comment[index]
            }
          })  
        })
        console.log("vote2",vote)
        updateDoc(db.collection('group').doc(group),{vote:vote})
      })
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
      setResult(result)
      console.log("RES",result)
    })
    setShow(true)
  }

  return (
    <div>
      <h1>{voteName}</h1>
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
            setComment(Array.from(arr, item => typeof item === 'undefined' ? 0 : item))
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
              {checked[i]?<input type="number" onChange={submitValue}/>:<div></div>}
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

export default VoteBox;