import React from 'react';
import payment from "../assets/images/payment.png";
import { categories, navItems, contactInfo, socialLinks } from '../server/ApiFooter';

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
                                <a key={i} href="#" className="footer-category-link">
                                    {link}
                                </a>
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
                                    <a href="#" className="footer-nav-link">
                                        {link}
                                    </a>
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
                                    <a href={`mailto:${info.text}`} className="footer-nav-link">
                                        {info.text}
                                    </a>
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
                                        <a href={social.link} className="footer-nav-link">
                                            {social.icon}
                                        </a>
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
                        Copyright &copy; <a href="#">Mirch Masala</a> all rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
