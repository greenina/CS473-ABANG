import React, { useState , useEffect} from 'react';
import '../App.css';
import {db, auth} from '../firebase';
import {doc, getDoc} from "firebase/firestore";
import { arrayUnion, arrayRemove, updateDoc } from "firebase/firestore";
import MemoryList from "./MemoryList"
import { Tooltip } from '@mui/material';

import editIcon from "../Icons/EditButton.png"
import checkIcon from "../Icons/Check.png"
import closeIcon from "../Icons/Close.png"
import lockIcon from "../Icons/Lock.png"
import unlockIcon from "../Icons/Unlock.png"
import cartIcon from "../Icons/ShoppingCart.png"
import shareIcon from "../Icons/Share.png"
import { OutletSharp } from '@mui/icons-material';
import { useParams } from 'react-router';
import firebase from 'firebase/compat/app';

const BucketItemInfo = ({ data, onUpdate, onRemove, refresh, detail, groupId, link }) =>{
    const { group } = useParams()
    const [id, setID] = useState(null)
    const [lock, setLock] = useState(null)
  const [todo, setTodo] = useState(null)
  const [toggle, setToggle] = useState(false)
  const [done, setDone] = useState(null)
  const [open, setOpen] = useState(false)

  const [bucketList, setBucketList] = useState([]);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        db.collection("group").doc("groupB").get().then(async s => {
            await s.data().bucket.forEach(i => {
                i.get().then(x => {
                    if(bucketList) bucketList.push(x.data().text)
                })
            })
        })
    }, [])

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

  const share = async () => {
    await db.collection('message2').add({
        isText:3,
        text: {name:todo, link:`/bucket/${link}`},
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        email:auth.currentUser.email,
        photoURL: auth.currentUser.photoURL
    })

    window.location.href = "/chat"
    
}

const addBucket = () => {
  if(!bucketList.includes(todo)) {
      db.collection('bucket').add({
          text: todo,
          cart: 0,
          isDone: false,
          isLock: true,
          memories: [],
      }).then(async snapshot => {
          console.log(snapshot)
          await updateDoc(db.collection('group').doc('groupB'), {bucket: arrayUnion(snapshot)})
          await window.location.replace(`/ourpage/bucket`)
      }) 
  } else {
      setShowTooltip(true)
  }
}

    return(
        <div>
            <div className="bucket-item clickable" 
              onClick={() => window.location.href=`/bucket/${id}`}
              style={done ? { backgroundColor: "var(--green)"} : { backgroundColor: "var(--lightgray)" }}>
            {/* <span onClick={() => setOpen(!open)} style={style}>{todo}</span>  */}
            {todo}
                <div className="icon-group">
                      <div onClick={share} className="icon clickable"><img src={shareIcon} height='30px'/></div>
                      { showTooltip ? 
                          <Tooltip title="Already added to our bucket list!" arrow>
                              <div className="icon clickable" onClick={addBucket}><img src={cartIcon} height="30px" /></div>
                          </Tooltip> 
                      : 
                        <div className="icon clickable" onClick={addBucket}><img src={cartIcon} height="30px" /></div>
                    }
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