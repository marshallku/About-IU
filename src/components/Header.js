import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
    return (
        <header id="header">
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/discography">Discography</Link>
        </header>
    );
}

export default Header;
