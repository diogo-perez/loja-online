import React, { useEffect, useState } from 'react';
import './index.css';
import Navbar from '../components/navbar/navbar';
import Card from '../components/card/card';
import { buscaProducts } from '../services/api';
import { toast } from 'react-toastify';
import ModalComponent from '../components/modal/modal';
import { formatValor } from '../utils/function';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { motion } from "framer-motion";

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [itemPage, setItemPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    const fetchProducts = async () => {
        try {
            const response = await buscaProducts(itemPage);
            if (response != null) {
                setProducts(response);
                setLoading(false);
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
    }, [itemPage]);

    return (
        <div>
            <Navbar itemCount={selectedProduct.length} modal={openModal} />
            <div className="content" key={1}>
                <motion.div
                    className="grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >

                    {loading ? (
                        Array.from({ length: 8 }).map((_, index) =>
                            <Skeleton key={index} variant="rectangular" width={250} height={250} />
                        )
                    ) : (
                        products.map((product, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card
                                    image={product.imagem}
                                    title={product.nome}
                                    description={product.descricao}
                                    value={product.preco}
                                    buttonText="COMPRAR"
                                    onClick={() => comprar(product)}
                                />
                            </motion.div>
                        )))}
                </motion.div>
                <div className="pagination-container">
                    <button onClick={() => setItemPage(itemPage - 1)} className="btn-arrow" disabled={itemPage === 1}>
                        <IoIosArrowBack size={24} />
                    </button>
                    <div className="item-page">{itemPage}</div>
                    <button onClick={() => setItemPage(itemPage + 1)} className="btn-arrow" disabled={itemPage === 1}>
                        <IoIosArrowForward size={24} />
                    </button>
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
