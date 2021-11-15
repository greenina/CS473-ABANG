import React, { Component } from "react";
import {doc, setDoc} from "firebase/firestore";
import {db} from '../firebase';

class DisplayImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      toggle: true //null인가? 
    };

    this.onImageChange = this.onImageChange.bind(this);
  }

  onImageChange = event => {
    const docRef = doc(db, 'group','groupB');
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
        <div>
          <div>
            <img src={this.state.image} />
            <h1>Select Image</h1>
            <input type="file" name="myImage" onChange={this.onImageChange} />
          </div>
        </div>
      </div>
    );
  }
}
export default DisplayImage;