import React, { useEffect } from "react";
import {useState} from 'react'; 
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {db} from '../firebase'
import { arrayUnion, updateDoc } from "firebase/firestore";

const VoteBox = (props) => {
  
  const [wishes, setWishes] = useState([])
  const [checked, setChecked] = useState([false,false,false])
  const [value, setValue] = useState([0,0,0])
  const [comment, setComment] = useState([])
  const Submit = () =>{
    db.collection('group')
      .doc('groupA')
      .get()
      .then((doc)=>{
        const vote = [...doc.data().vote]
        vote[0].options.map((i, index)=>{
          i.indiv[0].value = parseInt(value[index]) //여기서 0 은 해당 friend의 index
          i.indiv[0].comment = comment[index]
        })
        console.log("vote2",vote)
        updateDoc(db.collection('group').doc('groupA'),{vote:vote})
      })
  }
  
  useEffect(()=>{
    db.collection('group')
    .doc('groupA')
    .get()
    .then((doc)=>{
      const wishArr = doc.data().vote[0].options.map(i => i.option)
      setWishes(wishArr)
  })
  },[])
  useEffect(()=>{
    setChecked(Array(wishes.length).fill(false))
    setValue(Array(wishes.length).fill(0))
    setComment(Array(wishes.length).fill(""))
  }, wishes)

  return (
    <div>
      <FormGroup>
        {wishes.map((wish, i)=>{
          const changeChecked = () =>{
          var arr = [...checked]
          arr[i] = !arr[i]
          setChecked(arr)
          }

          const submitValue = (e) =>{
            var arr = [...value]
            arr[i] = parseInt(e.target.value)
            setValue(arr)
          }
          const submitComment = (e) =>{
            var arr = [...comment]
            arr[i] = e.target.value
            console.log("arr",arr)
            setComment(arr)
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
    </div>
  );
};

export default VoteBox;