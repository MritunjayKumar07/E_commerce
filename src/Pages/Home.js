import React from 'react';
import '../assets/css/style-prefix.css';
import '../assets/css/style.css';
import Banners from '../components/Banners';
import Category from '../components/Category';
import Blogs from '../components/Blogs';
import TCS from '../components/TCS';
import Products from '../components/Products';
import NotifucationToast from '../components/NotifucationToast';

export default function Home() {


  return (
    <div>
      <NotifucationToast />
      <main>
        <Banners />
        <Category />
        <Products />
        <TCS />
        <Blogs />
      </main>
    </div>
  );
}
