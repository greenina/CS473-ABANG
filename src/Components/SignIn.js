import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/auth';
import { arrayUnion, updateDoc } from "firebase/firestore";
import { connect } from "react-redux";
import {setEmail} from '../store/modules/counter'
import {auth, db} from '../firebase'

const mapStateToProps = (state) => ({
  email: state.counter.email,
});
const mapDispatchToProps = (dispatch) => ({
  setEmail: (category) => dispatch(setEmail(category)),
});

function SignIn(props) {
  const {setEmail, email} = props
  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);
    await console.log("AUTH",auth.currentUser.email)
    debugger;
    await setEmail(auth.currentUser.email)
    await console.log("EMAIL",email)
    debugger;
    await db.collection('group').doc('groupB').get().then((doc)=>{
        console.log(doc.data.friends)
    })
    debugger;
    await updateDoc(db.collection('group').doc('groupB'), {friends: arrayUnion({email:auth.currentUser.email, name:auth.currentUser.name})})
    debugger;
  }
  const enroll = async () =>{
      console.log("enrolling~!~!")
      await signInWithGoogle()
    //   await (()=>{
    //       console.log("A")
    //       debugger;
    //   })
    //   await setEmail(auth.currentUser.email)
    //   await (()=>{
    //       console.log("B",auth.currentUser.email)
    //       debugger;
    //   })
    //   await updateDoc(db.collection('group').doc('groupB'), {friends: arrayUnion({email:auth.currentUser.email, name:auth.currentUser.name})})
    //   await (()=>{
    //       console.log("C")
    //       debugger;
    //   })
      await console.log("enrolled~!~!",email)
      await (()=>{
          console.log("D")
          debugger;
      })
      await (()=>window.location.href="/main")
  }

  console.log('provider');
  return (
    <button onClick = {enroll}>Sign in with google.</button>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);