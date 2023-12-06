import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar, FaHeart, FaEye, FaShoppingBag } from 'react-icons/fa';
import { IoRepeat } from "react-icons/io5";
import { MainProducts } from '../../server/MainProduct';
import { Link } from 'react-router-dom';

const Showcase = ({ product }) => {
    return (
        <Link to={`/ProductCard/${product.id} `} className="showcase" key={product.id} >
            <div className="showcase-banner">
                <img src={product.images[0]} alt={product.title} width="300" className="product-img default" />
                <img src={product.images[1]} alt={product.title} width="300" className="product-img hover" />

                {product.badge && <p className="showcase-badge">{product.badge}</p>}

                <div className="showcase-actions">
                    <button className="btn-action">
                        <FaHeart />
                    </button>
                    <button className="btn-action">
                        <FaEye />
                    </button>
                    <button className="btn-action">
                        <IoRepeat />
                    </button>
                    <button className="btn-action">
                        <FaShoppingBag />
                    </button>
                </div>
            </div>

            <div className="showcase-content">
                <a href="#" className="showcase-category">{product.category}</a>
                <h3>
                    <a href="#" className="showcase-title">{product.title}</a>
                </h3>

                <div className="showcase-rating">
                    {[...Array(5)].map((star, index) => (
                        <span key={index}>
                            {index + 1 <= product.rating ? <FaStar /> : index + 0.5 === product.rating ? <FaStarHalfAlt /> : <FaRegStar />}
                        </span>
                    ))}
                </div>

                <div className="price-box">
                    <p className="price">${product.price}</p>
                    {product.originalPrice && <del>${product.originalPrice}</del>}
                </div>
            </div>
        </Link>
    )
};

export default function MainProduct({ PageTitle, KeyWords }) {

    const filteredProducts = KeyWords
        ? MainProducts.filter(product =>
            product.keyWords.some(keyword => KeyWords.includes(keyword))
        )
        : MainProducts;

    return (
        <>
            <div className="product-main">
                <h2 className="title">{PageTitle ? PageTitle : 'New Products'}</h2>
                <div className="product-grid">
                    {filteredProducts.map((product) => (
                        <Showcase key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </>
    )
}
