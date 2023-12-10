import React, { useState } from 'react';
import logo from "../assets/images/logo/logo.png";
import {
    FaSearch,
    FaUser,
    FaHeart,
    FaShoppingBag,
    FaAlignJustify,
    FaHome,
    FaGripVertical,
} from "react-icons/fa";
import HeaderTop from './Header/HeaderTop';
import { MenuCategories } from '../server/ApiMenu';
import { MirchMasalaProduct } from '../server/Api_MirchMasalaProduct';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
    const [heartCount, setHeartCount] = useState(0);
    const [bagCount, setBagCount] = useState(0);
    const navigate = useNavigate();

    const handleMenuTitleClick = (title) => {
        const filteredProduct = title ? MirchMasalaProduct.filter(product => product.name === title) : [];
        if (filteredProduct.length > 0) {
            const category = filteredProduct[0].category;
            navigate(`/Products/${category[0]}`);
        } else {
            console.error(`Product with name ${title} not found.`);
        }
    };


    return (
        <>
            <header>
                <HeaderTop />
                <div className="header-main">
                    <div className="container">
                        <Link to='/' className="header-logo">
                            <img src={logo} alt="Anon's logo" width="160" />
                        </Link>

                        <div className="header-search-container">
                            <input type="search" name="search" className="search-field" placeholder="Enter your product name..." />
                            <button className="search-btn">
                                <FaSearch />
                            </button>
                        </div>

                        <div className="header-user-actions">
                            <button className="action-btn">
                                <FaUser fontSize={29} />
                            </button>

                            <button className="action-btn" onClick={() => setHeartCount(heartCount + 1)}>
                                <FaHeart fontSize={29} />
                                <span className="count">{heartCount}</span>
                            </button>

                            <button className="action-btn" onClick={() => setBagCount(bagCount + 1)}>
                                <FaShoppingBag fontSize={29} />
                                <span className="count">{bagCount}</span>
                            </button>
                        </div>
                    </div>
                </div>
                <nav className="desktop-navigation-menu">
                    <div className="container">
                        <ul className="desktop-menu-category-list" >
                            {MenuCategories.map(category => (
                                <li key={category.id} className="menu-category">
                                    <a
                                        onClick={() => {
                                            if (category.title === "Home")
                                                navigate(category.link);
                                        }}
                                        href="#"
                                        className="menu-title"
                                    >
                                        {category.title}
                                    </a>
                                    {category.subcategories && (
                                        <div className="dropdown-panel" style={{ width: 'auto' }}>
                                            {category.subcategories.map(subcategory => (
                                                <ul
                                                    key={subcategory.items[0].title}
                                                    className="dropdown-panel-list"
                                                    style={{ width: 'auto' }}
                                                >
                                                    <li className="menu-title">
                                                        <a href="#">{subcategory.items[0].title}</a>
                                                    </li>
                                                    {subcategory.items.map(item => (
                                                        <li key={item.title} className="panel-list-item" style={{ width: 'auto' }}>
                                                            {item.image ? (
                                                                <a href="#">
                                                                    <img src={item.image} alt={item.title} width="250" height="119" />
                                                                </a>
                                                            ) : (
                                                                <a onClick={() => handleMenuTitleClick(item.title)} style={{ width: 'auto', whiteSpace: 'nowrap' }}>{item.title}</a>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ))}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
                <div className="mobile-bottom-navigation">
                    <button className="action-btn" data-mobile-menu-open-btn>
                        <FaAlignJustify />
                    </button>
                    <button className="action-btn">
                        <FaShoppingBag />
                        <span className="count">0</span>
                    </button>
                    <button className="action-btn">
                        <FaHome />
                    </button>
                    <button className="action-btn">
                        <FaHeart />
                        <span className="count">0</span>
                    </button>
                    <button className="action-btn" data-mobile-menu-open-btn>
                        <FaGripVertical />
                        <span className="count">0</span>
                    </button>
                </div>
            </header>
        </>
    )
}
