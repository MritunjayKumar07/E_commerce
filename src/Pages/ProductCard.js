import React, { useState } from 'react';
import './style.css';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import img from '../assets/images/products/pizza.svg'
import MainProduct from '../components/Products/MainProduct';
import { useParams } from 'react-router-dom';
import { MirchMasalaProduct } from '../server/Api_MirchMasalaProduct';

export default function ProductCard() {
    const { id } = useParams();
    const filterProduct = id ? MirchMasalaProduct.filter(product => product.id === Number(id)) : ''

    const AddToCart = (ProductId) => {
        let cartItems = localStorage.getItem('MirchMasalaCart');
        if (cartItems) {
            cartItems = JSON.parse(cartItems);
            const existingItem = cartItems.find(item => item.ProductId === ProductId);
            if (existingItem) {
                existingItem.Amount += 1;
            } else {
                cartItems.push({ "ProductId": ProductId, "Amount": 1 });
            }
        } else {
            cartItems = [{ "ProductId": ProductId, "Amount": 1 }];
        }
        localStorage.setItem('MirchMasalaCart', JSON.stringify(cartItems));
    }


    return (
        <>
            {filterProduct.map((product) => (<div className='ProductPage'>
                <section className='SectionMainProduct'>
                    <div className='ImageSection'>
                        <img src={img} alt='' />
                    </div>
                    <div className='ContentSection'>
                        <h2>{product.name}</h2>
                        <p>{product.title}</p>
                        <p>{product.description}</p>
                        <div className="showcase-rating">
                            {[...Array(5)].map((star, index) => (
                                <span key={index}>
                                    {index + 1 <= product.rating ? <FaStar /> : index + 0.5 === product.rating ? <FaStarHalfAlt /> : <FaRegStar />}
                                </span>
                            ))}
                            <h3>{product.rating}</h3>
                        </div>
                        <div className="price-box">
                            <h4>Price:</h4>
                            <del>{product.originalPrice}</del>
                            {/* <p className="price">{product.discountedPrice.replace(/(<([^>]+)>)/ig,"")}</p> */}
                            <p className="price">{product.discountedPrice}</p>
                        </div>
                        <div className='buttons'>
                            <button onClick={() => AddToCart(product.ProductId)}>Add to cart</button>
                            <button>Eat now</button>
                        </div>
                    </div>
                </section>
                <section className='OtherProduct'>
                    <MainProduct PageTitle='Similar Product' KeyWords={product.keyWords} />
                </section>
            </div>))}

        </>
    );
}
