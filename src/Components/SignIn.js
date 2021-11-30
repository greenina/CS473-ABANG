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

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  // // updateDoc(db.collection('group').doc('groupB'), {friends: arrayUnion({email:auth.currentUser.email, name:auth.currentUser.name})})
  }

  console.log('provider');
  return (
    <button onClick = {signInWithGoogle}>Sign in with google.</button>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);