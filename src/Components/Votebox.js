import React from "react";
import {useState} from 'react'; 
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {db} from '../firebase'

const VoteBox = (props) => {
  
  const [wishes, setWishes] = useState([])
  const [checked, setChecked] = useState([false,false,false])
  const [value, setValue] = useState([0,0,0])
  const Submit = () =>{
    console.log(value)
    db.collection('group')
      .doc('groupA')
      .get()
      .then((doc)=>{
        const data = [...doc.data()]
        console.log("DATA",data)
        value.map((i)=>{
          data[i].values[0].value = i
        })
        db.collection('group')
        .doc('groupA')
        .update({
          wishes:data
        })
      })
  }
  db.collection('group')
    .doc('groupA')
    .get()
    .then((doc)=>{
      const wishArr = doc.data().buckets.map(i => i.text)
      setWishes(wishArr)
      // setChecked([false]*wishArr.length)
    })

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
            arr[i] = e.target.value
            setValue(arr)

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
            </div>
          )
        })}
      </FormGroup>
      <button  onClick={Submit}>VOTE</button>
    </div>
  );
};

export default VoteBox;