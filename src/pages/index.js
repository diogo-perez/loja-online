import React, { useEffect, useState } from 'react';
import './index.css';
import Navbar from '../components/navbar/navbar';
import Card from '../components/card/card';
import { buscaProducts } from '../services/api';
import { toast } from 'react-toastify';
import ModalComponent from '../components/modal/modal';
import { formatPriceToNumber, formatValor } from '../utils/function';

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [itemCount, setItemCount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    const fetchProducts = async () => {
        try {
            const response = await buscaProducts();
            if (response != null) {
                setProducts(response)
            }
        } catch (error) {
            toast.error('Erro ao buscar produtos:' + error);
            setLoading(false);
        }
    };

    const comprar = (produto) => {
        const existingProductIndex = selectedProduct.findIndex(item => item.id === produto.id);
        if (existingProductIndex !== -1) {
            const updatedProducts = [...selectedProduct];
            updatedProducts[existingProductIndex].quantidade++;
            setSelectedProduct(updatedProducts);
        } else {
            setSelectedProduct([...selectedProduct, produto]);
        }
        setIsModalOpen(true);
    }

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const removeItemFromCart = (index) => {
        const updatedCart = [...selectedProduct];
        updatedCart.splice(index, 1);
        setSelectedProduct(updatedCart);
    };

    const checkout = () => {
        toast.success("Compra Finalizada com Sucesso!");
        setSelectedProduct([])
    };
    useEffect(() => {
        const total = selectedProduct.reduce((acc, curr) => acc + parseFloat(curr.preco), 0);
        setTotalPrice(formatValor(total));
    }, [selectedProduct]);

    useEffect(() => {
        fetchProducts()
    }, []);

    return (
        <div>
            <Navbar itemCount={selectedProduct.length} modal={openModal} />
            <div className="content">
                <div className="grid">
                    {products.map((product, index) => (
                        <Card
                            image={product.imagem}
                            title={product.nome}
                            description={product.descricao}
                            value={product.preco}
                            buttonText="COMPRAR"
                            onClick={() => comprar(product)}
                        />
                    ))}
                </div>
            </div>
            <ModalComponent
                isOpen={isModalOpen}
                onClose={closeModal}
                selectedProduct={selectedProduct}
                onRemoveItemClick={removeItemFromCart}
                onCheckout={checkout}
                setSelectedProduct={setSelectedProduct}
            />
        </div>
    );
};

export default Home;
