import React, { Component } from 'react';
import {db} from '../firebase';
import { arrayUnion, updateDoc } from "firebase/firestore";

class Bucketdata extends Component {
    // state = {
    //     whitebox : {
    //       border: '1px solid black',
    //       padding: '25px',
    //       margin: '15px',
    //       backgroundColor: 'white'
    //     }, 
    //     greenbox : {
    //       border: '1px solid black',
    //       padding: '25px',
    //       margin: '15px',
    //       backgroundColor: 'lightgreen'
    //     }
    // };
    // render(){
    //     const { whitebox, greenbox } = this.state;
    //     const docRef = db.collection('group').doc('groupZ');
    //     const arr = [];
    //     docRef.get()
    //     .then(function(querySnapshot){
    //       if(querySnapshot.exists){
    //         var bucketIn = querySnapshot.data().bucket
    //         var length = bucketIn.length; 
    //         for(var i=0; i<length; i++){
    //           const cartdata = bucketIn.cart;
    //           const isDonedata = bucketIn.isDone; 
    //           const style = whitebox;
    //           if(isDonedata  == true){
    //               style = greenbox; 
    //           }else {
    //               style = whitebox;
    //           }
    //           const isLock = bucketIn.isLock; 
    //           const text = bucketIn.text;
    //           arr[i]= {cartdata : cartdata, isDonedata: isDonedata, style : style, isLock: isLock, text: text};  
    //           console.log(arr[i]);
    //           }
    //         }
    //       }
    //       )
    //       return(
    //           <div>arr</div>
    //       )
    // }
    
    
  }
  export default Bucketdata;