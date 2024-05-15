import React from 'react';
import './card.css';
import { FaShoppingBag } from 'react-icons/fa';
import { formatValor } from '../../utils/function';

const Card = ({ image, title, description, value, buttonText, onClick }) => {

    const addProduct = () => {
        onClick();
    };

    return (
        <div className="custom-card">
            <img src={image} alt="Product" className="card-image" />
            <div className="card-body">
                <div className="title-value-container">
                    <h2 className="card-title">{title}</h2>
                    <div className="card-value">{formatValor(value)}</div>
                </div>
                <p className="card-description">{description}</p>
            </div>
            <div className="card-button" onClick={addProduct}>
                <FaShoppingBag className="icon" size={15} /> {buttonText}</div>
        </div>
    );
};

export default Card;
