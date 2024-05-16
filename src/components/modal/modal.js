import React, { useEffect, useState } from 'react';
import './modal.css';
import { formatValor } from '../../utils/function';
import { IoMdClose } from "react-icons/io";

const ModalComponent = ({ isOpen, onClose, selectedProduct, onRemoveItemClick, onCheckout, setSelectedProduct }) => {
    const [totalPrice, setTotalPrice] = useState(0);
    console.log(selectedProduct)

    const handleAdiciona = (index) => {
        const updatedProducts = [...selectedProduct];
        updatedProducts[index].quantidade++;
        setTotalPrice(formatValor(totalPrice + updatedProducts[index].preco));
        setSelectedProduct(updatedProducts);
    };

    const handleRemove = (index) => {
        const updatedProducts = [...selectedProduct];
        updatedProducts[index].quantidade = Math.max(1, updatedProducts[index].quantidade - 1);
        setTotalPrice(formatValor(totalPrice - updatedProducts[index].preco));
        setSelectedProduct(updatedProducts);
    };

    useEffect(() => {
        let total = 0;
        selectedProduct.forEach(product => {
            total += product.preco * product.quantidade;
        });
        setTotalPrice(formatValor(total));
    }, [selectedProduct]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);


    return (
        <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
            <div className={`modal-content ${isOpen ? 'active' : ''}`}>
                <div className="modal-header">
                    <h2>Carrinho de Compras</h2>
                    <button className="close-button" onClick={onClose}>
                        <IoMdClose className="remove-icon" size={20} />
                    </button>
                </div>
                <div className="modal-body">
                    {selectedProduct.length == 0 ? (
                        <p className='aviso'>O carrinho está vazio.</p>
                    ) : (
                        selectedProduct.map((product, index) => (
                            <div className="cart-item" key={index}>
                                <button className="remove-button" onClick={(e) => { e.stopPropagation(); onRemoveItemClick(index) }}>
                                    <IoMdClose className="remove-icon" size={15} />
                                </button>
                                <img src={product.imagem} />
                                <div className="product-info">
                                    <p className="product-name">{product.nome}</p>
                                    <div className="quantity">
                                        <button className="decrement" onClick={(e) => { e.stopPropagation(); handleRemove(index) }}>-</button>
                                        <span>{product.quantidade}</span>
                                        <button className="increment" onClick={(e) => { e.stopPropagation(); handleAdiciona(index) }}>+</button>

                                    </div>
                                    <p className="product-price">{formatValor(product.preco)}</p>
                                </div>
                            </div>
                        )
                        ))}
                </div>
                <div className='modal-total'>
                    <p>Total:</p>
                    <p>{totalPrice}</p>
                </div>
                {selectedProduct.length == 0 ?
                    <></>
                    :
                    <div className="modal-footer" onClick={onCheckout}>
                        Finalizar Compra
                    </div>

                }
            </div>
        </div>
    );
};

export default ModalComponent;
