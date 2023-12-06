import React, { useEffect } from 'react';
import './style.css';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import img from '../assets/images/products/pizza.svg'
import MainProduct from '../components/Products/MainProduct';
import { useParams } from 'react-router-dom';
import { MainProducts } from '../server/MainProduct';

export default function ProductCard() {
    const { id } = useParams();
    const filterProduct = id ? MainProducts.filter(product => product.id === Number(id)) : ''
    console.log(filterProduct)

    return (
        <>
            {filterProduct.map((product) => (<div className='ProductPage'>
                <section className='SectionMainProduct'>
                    <div className='ImageSection'>
                        <img src={img} alt='' />
                    </div>
                    <div className='ContentSection'>
                        <h2>{product.category}</h2>
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
                            <p className="price">{product.price}</p>
                        </div>
                        <div className='buttons'>
                            <button>Add to cart</button>
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
