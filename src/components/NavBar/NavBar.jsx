import React from "react";
import "../../stylesheets/NavBar.css"
import { useState, useEffect } from "react";

const NavBar = () => {
    const [showItems, setShowItems] = useState(true);

    return <> 
    <div className="navbar">
        <div className="nav-left-group">
    <div className="nav-item">
            <a className="nav-brand nav-link">LOGO</a>
        </div>
        <div className="nav-item">
            <input type="text" id="nav-search" className="simple-textbox" placeholder="Search .." />
        </div>
        <div className="nav-item">
            <div className="nav-link" id="show-items-btn" onClick={() => setShowItems(!showItems)}>=</div>
        </div>
        </div>
        <div className="nav-right-group">
        <div className="nav-item">
            <a className="nav-link">Home</a>
        </div>
        <div className="nav-item">
            <a className="nav-link">Explore</a>
        </div>
        <div className="nav-item">
            <a className="nav-link">About</a>
        </div>
        <div className="nav-item">
            <a className="nav-link">Contacts</a>
        </div>
        <div className="nav-item">
            <a className="nav-link">PlaceHolder</a>
        </div>
        </div>
    </div>
    </>;
}

export default NavBar;