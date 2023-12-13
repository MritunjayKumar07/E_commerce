import { Routes, Route } from 'react-router-dom';
import Home from "./Pages/Home";
import Page404 from './Pages/Page404';
import ProductCard from './Pages/ProductCard';
import Footer from './components/Footer';
import Header from './components/Header';
import Modal from './components/Modal';
import MainProduct from './components/Products/MainProduct';
// import AddToCart from './Pages/AddToCart';
import CheckOut from './Pages/CheckOut';
import SideBarMenu from './components/Header/SideBarMenu';
import LoginSignup from './Pages/LoginSignup';

function App() {

  return (
    <div className="App">
    <Modal/>
    <Header/>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/ProductDetail/:id' element={<ProductCard/>}/>{/* Show Single Product with simlear product */} 
        <Route path='/Products/:category' element={<MainProduct/>}/>
        <Route path='/sideBarMenu' element={<SideBarMenu/>}/>
        <Route path='/loginSignup/:way' element={<LoginSignup/>}/>
        <Route path='/CheckOut' element={<CheckOut/>}/>
        <Route path='*' element={<Page404/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
