import React from "react";
import {Link} from 'react-router-dom';


const Home = () => {
  return (
    <div>
    <div>This is Home</div>
    <Link to = "../ourpage">Ourpage</Link>
    </div>
  );
};

export default Home;
