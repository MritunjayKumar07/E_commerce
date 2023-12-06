import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { BestSellersproducts } from '../../server/BestSellersProducts';

export default function ShowcaseContainer() {
    return (
        <>
            {BestSellersproducts.map((product) => (
                <div className="showcase" key={product.id}>
                    <a href="#" className="showcase-img-box">
                        <img src={product.image} alt={product.name} className="showcase-img" width="75" height="75" />
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
                </div>
            ))}
        </>
    )
}
