import React, { useState } from 'react';
import './style.css';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import img from '../assets/images/products/pizza.svg'
import MainProduct from '../components/Products/MainProduct';
import { useParams } from 'react-router-dom';
import { MirchMasalaProduct } from '../server/Api_MirchMasalaProduct';
import DilogBox from '../components/DilogBox';

export default function ProductCard() {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const { id } = useParams();
    const filterProduct = id ? MirchMasalaProduct.filter(product => product.id === Number(id)) : ''
    console.log(id)

    const openDialog = () => setDialogOpen(true);
    const closeDialog = () => setDialogOpen(false);

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
                            <button onClick={openDialog}>Add to cart</button>
                            <button>Eat now</button>
                        </div>
                    </div>
                </section>
                <section className='OtherProduct'>
                    <MainProduct PageTitle='Similar Product' KeyWords={product.keyWords} />
                </section>
            </div>))}
            <DilogBox isOpen={isDialogOpen} onClose={closeDialog}>
                <h2>Cart</h2>
            </DilogBox>
        </>
    );
}
