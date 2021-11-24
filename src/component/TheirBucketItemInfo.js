import React, { useState , useEffect} from 'react';
import '../App.css';
import {db} from '../firebase';
import {doc, getDoc} from "firebase/firestore";
import { arrayRemove, updateDoc } from "firebase/firestore";
import MemoryList from "./MemoryList"

import editIcon from "../Icons/EditButton.png"
import checkIcon from "../Icons/Check.png"
import closeIcon from "../Icons/Close.png"
import lockIcon from "../Icons/Lock.png"
import unlockIcon from "../Icons/Unlock.png"
import cartIcon from "../Icons/ShoppingCart.png"
import shareIcon from "../Icons/Share.png"
import { OutletSharp } from '@mui/icons-material';
import { useParams } from 'react-router';

const BucketItemInfo = ({ data, onUpdate, onRemove, refresh, detail, groupId }) =>{
    const { group } = useParams()
    const [id, setID] = useState(null)
    const [lock, setLock] = useState(null)
  const [todo, setTodo] = useState(null)
  const [toggle, setToggle] = useState(false)
  const [done, setDone] = useState(null)
  const [open, setOpen] = useState(false)

//   console.log(data)

  useEffect(() => {
    if(detail) {
      setOpen(true)
      // setDone(false)
    }
  });

  useEffect(() => {
    console.log("DATA",data)
    data.get().then(s => {
        if(s.exists) {
            setID(s.id)
            setLock(s.data().isLock)
            setTodo(s.data().text)
            setDone(s.data().isDone)
        }
    })
  }, [data])

  const boxstyle = done? {
        border: '1px solid black',
        padding: '25px',
        margin: '15px',
        backgroundColor: 'lightgreen'
    } : {
        border: '1px solid black',
        padding: '25px',
        margin: '15px',
        backgroundColor: 'white'
    }

  const docRef = db.collection('group').doc(group);
  const style = { margin : '10px'}

    return(
        <div>
            <div className="bucket-item" 
              onClick={() => window.location.href=`/bucket/${id}`}
              style={done ? { backgroundColor: "var(--green)"} : { backgroundColor: "var(--lightgray)" }}>
            {/* <span onClick={() => setOpen(!open)} style={style}>{todo}</span>  */}
            {todo}
                  <div className="icon-group">
                      <div className="icon"><img src={shareIcon} height='30px'/></div>
                      <div className="icon"><img src={cartIcon} height='30px'/></div>
                  </div>
            </div>
            { open ?
                <div className="memory-list">
                    <MemoryList id={data.id} detail={true} />
                </div>
            : null }
        </div>
    )
}

export default BucketItemInfo;