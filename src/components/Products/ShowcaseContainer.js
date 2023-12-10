import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { MirchMasalaProduct } from '../../server/Api_MirchMasalaProduct';
import { Link } from 'react-router-dom';

export default function ShowcaseContainer() {
    return (
        <>
            {MirchMasalaProduct.filter(product=>product.deal === String('Best Sale')).map((product) => (
                <Link to={`/ProductDetail/${product.id} `} className="showcase" key={product.id}>
                    <a href="#" className="showcase-img-box">
                        <img src={product.images[0]} alt={product.name} className="showcase-img" width="75" height="75" />
                    </a>
                    <div className="showcase-content">
                        <a href="#">
                            <h4 className="showcase-title">{product.name}</h4>
                        </a>
                        <div className="showcase-rating">
                            {[...Array(5)].map((star, index) => (
                                <span key={index}>
                                    {index + 1 <= product.rating ? <FaStar /> : index + 0.5 === product.rating ? <FaStarHalfAlt /> : <FaRegStar />}
                                </span>
                            ))}
                        </div>
                        <div className="price-box">
                            <del>${product.originalPrice}</del>
                            <p className="price">${product.discountedPrice}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </>
    )
}
