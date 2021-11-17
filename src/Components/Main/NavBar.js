import React from "react";
import { Link } from "react-router-dom";

import "./NavBar.css";

import chatIcon from "../../Icons/Chat.png";
import mainIcon from "../../Icons/Main.png";
import profileIcon from "../../Icons/Profile.png";

const NavBar = () => {
    return (
        <div className="navbar-container">
            <Link to="/chat" className="navbar-item" style={{ backgroundColor: "var(--lightblue)" }}>
                <img src={chatIcon} />
            </Link>
            <Link to="/main" className="navbar-item" style={{ backgroundColor: "var(--green)" }}>
                <img src={mainIcon} />
            </Link>
            <Link to="/ourpage" className="navbar-item" style={{ backgroundColor: "var(--yellow)" }}>
                <img src={profileIcon} />
            </Link>
        </div>
    );
};

export default NavBar;