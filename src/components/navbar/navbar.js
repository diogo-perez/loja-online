import React from 'react';
import './navbar.css';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = ({ itemCount, modal }) => {
    return (
        <nav className="navbar">
            <div className="navbar-title">
                <h1>MKS</h1> <h2>Sistemas</h2>
            </div>
            <div className="navbar-button">
                <button className="cart-button" onClick={modal}>
                    <FaShoppingCart className="cart-icon" />
                    <span className="button-value">{itemCount}</span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;