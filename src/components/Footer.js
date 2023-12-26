import React from 'react';
import payment from "../assets/images/payment.png";
import { categories, navItems, contactInfo, socialLinks } from '../server/ApiFooter';
import { Link } from 'react-router-dom';

//1023
const Footer = () => {
    return (
        <footer>
            <div className="footer-category">
                <div className="container">
                    <h2 className="footer-category-title">Brand directory</h2>
                    {categories.map((category, index) => (
                        <div key={index} className="footer-category-box">
                            <h3 className="category-box-title">{category.title} :</h3>
                            {category.links.map((link, i) => (
                                <Link key={i} to={"/" }className="footer-category-link">
                                    {link}
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className="footer-nav">
                <div className="container">
                    {navItems.map((item, index) => (
                        <ul key={index} className="footer-nav-list">
                            <li className="footer-nav-item">
                                <h2 className="nav-title">{item.title}</h2>
                            </li>
                            {item.links.map((link, i) => (
                                <li key={i} className="footer-nav-item">
                                    <Link to={"/"} className="footer-nav-link">
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ))}

                    {/* Contact info */}
                    {contactInfo.map((info, index) => (
                        <ul key={index} className="footer-nav-list">
                            <li className="footer-nav-item flex">
                                <div className="icon-box">{info.icon}</div>
                                {info.text.includes('@') ? (
                                    <Link to={`mailto:${info.text}`} className="footer-nav-link">
                                        {info.text}
                                    </Link>
                                ) : (
                                    <address className="content">{info.text}</address>
                                )}
                            </li>

                        </ul>
                    ))}

                    {/* Follow Us */}
                    <ul >
                        <li>
                            <ul className="social-link">
                                {socialLinks.map((social, index) => (
                                    <li key={index} className="footer-nav-item">
                                        <Link to={social.link} className="footer-nav-link">
                                            {social.icon}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <img src={payment} alt="payment method" className="payment-img" />
                    <p className="copyright">
                        Copyright &copy; <Link to={"#"}>Mirch Masala</Link> all rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
