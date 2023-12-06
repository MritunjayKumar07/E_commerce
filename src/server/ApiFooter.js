import {
    FaLocationDot,
    FaPhone,
    FaSquareFacebook,
    FaSquareInstagram,
    FaYoutube,
    FaSquareTwitter,
} from 'react-icons/fa6';
import { IoMdMail } from 'react-icons/io';

export const categories = [
    {
        title: 'Fashion',
        links: ['T-shirt', 'Shirts', 'shorts & jeans', 'jacket', 'dress & frock', 'innerwear', 'hosiery'],
    },
    {
        title: 'Footwear',
        links: [
            'sport',
            'formal',
            'Boots',
            'casual',
            'cowboy shoes',
            'safety shoes',
            'Party wear shoes',
            'Branded',
            'Firstcopy',
            'Long shoes',
        ],
    },
    {
        title: 'Jewellery',
        links: ['Necklace', 'Earrings', 'Couple rings', 'Pendants', 'Crystal', 'Bangles', 'bracelets', 'nosepin', 'chain', 'Earrings', 'Couple rings'],
    },
    {
        title: 'Cosmetics',
        links: [
            'Shampoo',
            'Bodywash',
            'Facewash',
            'makeup kit',
            'liner',
            'lipstick',
            'perfume',
            'Body soap',
            'scrub',
            'hair gel',
            'hair colors',
            'hair dye',
            'sunscreen',
            'skin lotion',
            'liner',
            'lipstick',
        ],
    },
];

export const navItems = [
    { title: 'Popular Categories', links: ['Fashion', 'Electronic', 'Cosmetic', 'Health', 'Watches'] },
    { title: 'Products', links: ['Prices drop', 'New products', 'Best sales', 'Contact us', 'Sitemap'] },
    { title: 'Our Company', links: ['Delivery', 'Legal Notice', 'Terms and conditions', 'About us', 'Secure payment'] },
    { title: 'Services', links: ['Prices drop', 'New products', 'Best sales', 'Contact us', 'Sitemap'] },
];

export const contactInfo = [
    { icon: <FaLocationDot />, text: '419 State 414 Rte Beaver Dams, New York(NY), 14812, USA' },
    { icon: <FaPhone />, text: '(607) 936-8058' },
    { icon: <IoMdMail />, text: 'example@gmail.com' },
];

export const socialLinks = [
    { icon: <FaSquareFacebook />, link: '#' },
    { icon: <FaSquareInstagram />, link: '#' },
    { icon: <FaYoutube />, link: '#' },
    { icon: <FaSquareTwitter />, link: '#' },
];