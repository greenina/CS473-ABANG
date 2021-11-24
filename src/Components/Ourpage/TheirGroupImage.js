import React from "react";

import inhwaPic from "./profile/Inhwa.png"
import jeongaPic from "./profile/Jeonga.png"
import shinungPic from "./profile/Shinung.png"
import nicolePic from "./profile/Nicole.png"

const TheirGroupImage = () => {
    return (
      <div className="group-image">
          <img src={inhwaPic} />
          <img src={jeongaPic} />
          <img src={shinungPic} />
          <img src={nicolePic} />
      </div>
    );
  };
  
  export default TheirGroupImage;