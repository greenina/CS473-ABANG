import React, { Component } from "react";
import {doc, setDoc, getDoc} from "firebase/firestore";
import {db} from '../../firebase';
import editButton from '../../Icons/edit_button.png'
class DisplayImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '/img/Default_Image.png',
      toggle: true //비었나? 
    };

    this.onImageChange = this.onImageChange.bind(this);
  }

  onImageChange = event => {
    const docRef = doc(db, 'group','groupB');
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      if(img==null){
        this.setState({
          image: '/img/Default_Image.png'
        })
      }
      this.setState({
        image: URL.createObjectURL(img)
      });

      console.log(URL.createObjectURL(img));
      //setDoc(docRef, {info: {photo:URL.createObjectURL(img)}}, {merge:true});
    }
  };

  render() {
    return (
      
          <div>     
            <img src={this.state.image} width='100%'/>
            <label for = "input-file">
              <img src = {editButton} height='70px' style = {{position: 'relative', 'z-index':'3',top:"-77vh",left:"93vw"}}/>
            </label>
            <input type="file" id="input-file" name="myImage" onChange={this.onImageChange} style={{display : "none"}} />
          </div>
    );
  }
}
export default DisplayImage;