import React, { useState } from 'react';
import {db} from '../firebase';
import { arrayUnion, updateDoc } from "firebase/firestore";

const ToDoForm = () =>{


  const docRef = db.collection('group').doc('groupB')

  const [todo, setTodo] = useState()
  const handleChange = (e) =>{
    setTodo(e.target.value)
  }

  const submit =  () => {
    updateDoc(db.collection('group').doc('groupB'), {bucket: arrayUnion({cart:0, isDone:false, isLock:true, text:todo})});
  } 

  return (
    <div>
      <form>
        <input value={todo} name="text" placeholder="..입력" onChange={handleChange}></input>
        <button type="submit" onClick={submit}>추가</button>
      </form>
    </div>
  )
}
  
  export default ToDoForm;