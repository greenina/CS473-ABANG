import React, { useState , useEffect} from 'react';
import '../App.css';
import {db, auth} from '../firebase';
import {doc, getDoc} from "firebase/firestore";
import { arrayUnion, arrayRemove, updateDoc } from "firebase/firestore";
import MemoryList from "./MemoryList"
import { Tooltip } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import editIcon from "../Icons/EditButton.png"
import checkIcon from "../Icons/Check.png"
import closeIcon from "../Icons/Close.png"
import lockIcon from "../Icons/Lock.png"
import unlockIcon from "../Icons/Unlock.png"
import cartIcon from "../Icons/ShoppingCart.png"
import shareIcon from "../Icons/Share.png"
import { OutletSharp } from '@mui/icons-material';
import firebase from 'firebase/compat/app';

const BucketItemInfo = ({ data, onUpdate, onRemove, refresh, detail, groupId, link }) =>{
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

  const docRef = db.collection('group').doc('groupB');
  const style = { margin : '10px'}

  const handleToggleChange = (id) => {
    if(!toggle){ //edit
      setToggle(true)
    } else {
      setToggle(false)
      docRef.get()
        .then(function(querySnapshot){
          if(querySnapshot.exists){
            var length = querySnapshot.data().bucket.length;
            for(var i=0; i<length; i++){
                querySnapshot.data().bucket[i].get().then(s => {
                    if(s.id === id) {
                        var old = s.data()
                        old.text = todo
                        s.ref.set(old)
                    }
                })
            }
          }
        })
    }
  }

  const editTodo = (e) =>{
    setTodo(e.target.value)
  }
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

  const changeIsDone = async (id) => {
    setDone(!done)
    await docRef.get()
        .then(doc =>{
          var data = doc.data().bucket
          data.map(e => {
            e.get().then(s => {
                if(s.id === id) {
                    var old = s.data()
                    old.isDone = !old.isDone
                    s.ref.set(old)
                }
            })
          })
        }
    )
    await setOpen(true)
  }

  const handleRemove = () =>{
    docRef.get().then(doc => {
        doc.data().bucket.map(e => {
            e.get().then(s => {
                if(s.id === id) {
                    s.ref.delete()
                }
            })
        })
    //   if(doc.exists){
    //     const newBucket = doc.data().bucket.filter(e => {
    //       console.log("e.text",e.text)
    //       console.log("todo",todo)
    //       return e.text != todo
    //     })
    //     console.log("BUCKET",newBucket)
    //     updateDoc(docRef, {bucket: newBucket});
    //     refresh()
    //   }
    })
  }

  const changeIsLock = (id) => {
    setLock(!lock)
    docRef.get()
        .then(doc =>{
          var data = doc.data().bucket
          data.map(e => {
              e.get().then(s => {
                  if(s.id === id) {
                      var old = s.data()
                      old.isLock = !old.isLock
                      s.ref.set(old)
                  }
              })
          })
        }
    )
  }

    return(
        <div>
            <div className="bucket-item" style={done ? { backgroundColor: "#DFDAA8"} : { backgroundColor: "var(--lightgray)" }}>
                { !detail ? //<input className="clickable" type="checkbox" id="unchecked" onClick={() => changeIsDone(id)} checked={done}/>
                    <div className="clickable" style={{ display: "inline-block" }}>
                        <Checkbox checked={done} onChange={() => changeIsDone(id)} style={{ color: "#68694A"}}/>
                    </div>
                 : null }
                {toggle ? (
                    <input
                        style={style}
                        onChange={editTodo}
                        value={todo} 
                        name="text"
                        style={{ boxShadow: "inset 0px 0.5px 6px rgba(0, 0, 0, 0.25)", backgroundColor: "var(--lightgray)" }}
                    />
                ) : ( 
                <span className="clickable" onClick={() => setOpen(!open)} style={style}>{todo}</span> 
                )}
                { !detail ? 
                  <div className="icon-group">
                      <div onClick={() => handleToggleChange(id)} className="icon clickable">{toggle ? <img src={checkIcon} height='30px'/> : <img src={editIcon} height='40px'/> }</div>
                      {/* <div onClick={handleRemove} className="icon"><img src={closeIcon} height='30px'/></div> */}
                      <div onClick={() => changeIsLock(id)} className="icon clickable">{lock ? <img src={lockIcon} height='30px'/> : <img src={unlockIcon} height='30px'/>}</div>
                  </div>
                  :
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
                }
            </div>
            { open && done ?
                <div className="memory-list">
                    <MemoryList id={data.id} detail={detail} />
                </div>
            : null }
        </div>
    )
}

export default BucketItemInfo;