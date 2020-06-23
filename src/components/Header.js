import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header(props) {
    return (
        <header id="header">
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/discography">Discography</Link>
            <Link to="/filmography">Filmography</Link>
        </header>
    );
}

export default Header;
