import React, { Component } from "react";
import {doc, setDoc} from "firebase/firestore";
import {db} from '../firebase';

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
    const docRef = doc(db, 'group','groupZ');
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        image: URL.createObjectURL(img)
      });
      console.log(URL.createObjectURL(img));
      setDoc(docRef, {info: {photo:URL.createObjectURL(img)}}, {merge:true});
    }
  };

  render() {
    return (
          <div>     
            <img src={this.state.image} height='300px'/>
            <label for = "input-file">
              <img src = {'/img/edit_button.png'} height='70px' style = {{position: 'relative', 'z-index':'1',top:"-220px",left:"-90px"}}/>
            </label>
            <input type="file" id="input-file" name="myImage" onChange={this.onImageChange} style={{display : "none"}} />
          </div>
    );
  }
}
export default DisplayImage;