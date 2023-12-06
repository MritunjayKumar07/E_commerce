import { Routes, Route } from 'react-router-dom';
import Home from "./Pages/Home";
import Page404 from './Pages/Page404';
import ProductCard from './Pages/ProductCard';
import Footer from './components/Footer';
import Header from './components/Header';
import Modal from './components/Modal';
import MainProduct from './components/Products/MainProduct';

function App() {

  return (
    <div className="App">
    <Modal/>
    <Header/>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/Product/:id' element={<ProductCard/>}/>
        <Route path='/ProductCard/:category' element={<MainProduct/>}/>
        <Route path='*' element={<Page404/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
