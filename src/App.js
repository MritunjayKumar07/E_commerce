import { Routes, Route, useLocation } from 'react-router-dom';
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
import LoginSignup from './Pages/User/LoginSignup';
import UserDashboard from './Pages/User/UserDashboard';

function App() {
  const location = useLocation();
  const isLoginSignupRoute = location.pathname.includes('/LoginSignup');

  return (
    <div className="App">
      {!isLoginSignupRoute && <Modal />}
      {!isLoginSignupRoute && <Header />}
      <Routes>
        <Route index element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/ProductDetail/:id' element={<ProductCard />} />{/* Show Single Product with simlear product */}
        <Route path='/Products/:category' element={<MainProduct />} />
        <Route path='/sideBarMenu' element={<SideBarMenu />} />
        <Route path='/LoginSignup' element={<LoginSignup />} />
        <Route path='/UserDashboard' element={<UserDashboard/>} />
        <Route path='/CheckOut' element={<CheckOut />} />
        <Route path='*' element={<Page404 />} />
      </Routes>
      {!isLoginSignupRoute && <Footer />}
    </div>
  );
}

export default App;
