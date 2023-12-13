import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar, FaHeart, FaEye, FaShoppingBag } from 'react-icons/fa';
import { IoRepeat } from "react-icons/io5";
import { useParams } from 'react-router-dom';
import { MirchMasalaProduct } from '../../server/Api_MirchMasalaProduct';
import { Link, useNavigate } from 'react-router-dom';
// MirchMasalaLikeCart

const Showcase = ({ product }) => {
    const navigate = useNavigate();

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

    const likeCart = (productId) => {
        let cartItems = localStorage.getItem('MirchMasalaLikeCart');
        if (cartItems) {
            cartItems = JSON.parse(cartItems);
            if (!cartItems.includes(productId)) {
                cartItems = [...cartItems, productId];
                localStorage.setItem('MirchMasalaLikeCart', JSON.stringify(cartItems));
            }
        } else {
            cartItems = [productId];
            localStorage.setItem('MirchMasalaLikeCart', JSON.stringify(cartItems));
        }
    };

    return (
        <div className="showcase" key={product.id} >
            <div className="showcase-banner">
                <img src={product.images[0]} alt={product.title} width="300" className="product-img default" />
                <img src={product.images[1]} alt={product.title} width="300" className="product-img hover" />

                {product.deal && <p className="showcase-badge">{product.deal}</p>}

                <div className="showcase-actions">
                    <button className="btn-action" onClick={()=>likeCart(product.ProductId)}>
                        <FaHeart />
                    </button>
                    <button className="btn-action" onClick={()=>navigate(`/ProductDetail/${product.id}`)}>
                        <FaEye />
                    </button>
                    {/* <button className="btn-action">
                        <IoRepeat />
                    </button> */}
                    <button className="btn-action" onClick={() => AddToCart(product.ProductId)}>
                        <FaShoppingBag />
                    </button>
                </div>
            </div>

            <Link to={`/ProductDetail/${product.id}`} className="showcase-content">
                <a href="#" className="showcase-category">{product.name}</a>
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
                    <p className="price">${product.discountedPrice}</p>
                    {product.originalPrice && <del>${product.originalPrice}</del>}
                </div>
            </Link>
        </div>
    )
};

export default function MainProduct({ PageTitle, KeyWords }) {
    const { category } = useParams();
    const decodedId = decodeURIComponent(category);
    PageTitle = PageTitle ? PageTitle : category;

    const filteredProducts = KeyWords
        ? MirchMasalaProduct.filter(product =>
            product.keyWords.some(keyword => KeyWords.includes(keyword))
        )
        : category ? MirchMasalaProduct.filter(product => product.category.includes(decodedId)) : MirchMasalaProduct;

    return (
        <>
            <div style={{ marginLeft: category ? `10%` : null, marginRight: category ? `10%` : null }} className="product-main">
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
