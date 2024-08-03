import './header.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className="banner">
            <h1 className="bannerName">TrashDivers</h1>
            <div>
                <ul className="links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/map">Map</Link></li>
                    <li><Link to="/login">Login/Signup</Link></li>
                </ul>
            </div>
        </div>
    )
}

export{Header};