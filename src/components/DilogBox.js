import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NotItem from '../assets/images/empty_shoping_Bag.png';
import { MirchMasalaProduct } from '../server/Api_MirchMasalaProduct';
import { FaMinus, FaPlus, FaHeart } from 'react-icons/fa';
import { MdRemoveShoppingCart } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const DialogContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  height: 80%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  opacity: 0;
  animation: fadeIn 0.3s ease-out forwards;
  border-radius: 10px;
  overflow: scroll;
  scrollbar-width: thin;
  scrollbar-color: hsl(0, 0%, 80%) transparent;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: var(--white);
  }

  &::-webkit-scrollbar-thumb {
    background-color: hsl(0, 0%, 80%);
    border: 3px solid transparent;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: hsl(0, 0%, 70%);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 1055px) {
    width: 90%;
  }

  @media (max-width: 545px) {
    width: 95%;
  }

`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Box = styled.div`
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px 8px 8px 8px;
  @media (max-width: 545px) {
    padding: 2px;
  }
`;

const ProductImage = styled.div`
  img {
    border-radius: 8px;
    margin-right: 10px;
    max-width: 70px;
  }
  @media (max-width: 545px) {
    img {
    border-radius: 8px;
    margin-right: 3px;
    max-width: 50px;
  }
  }
`;

const ProductDetails = styled.div`
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;

  b {
    font-size: 1.2em;
    display: block;
    margin-bottom: 5px;
  }

  p {
    color: #555;
    margin-bottom: 10px;
  }

  @media (max-width: 545px) {
    padding-left: 10px;
    width:auto;
    b {
    font-size: 12px;
    }
    p {
    font-size: 12px;
    margin-bottom: 10px;
    }
  }

  @media (max-width: 315px) {
    b {
    font-size: 10px;
    }
    p {
    font-size: 8px;
    margin-bottom: 2px;
    }
  }

`;

const ProductPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    font-size: 1.2em;
    color: #333;
    margin-right: 10px;
    font-weight: 700;
  }

  del {
    font-size: 1em;
    color: red;
    text-decoration: line-through;
    font-weight: 700;
    padding: 10px;
  }
  @media (max-width: 545px) {
    p {
    font-size: 12px;
    margin-right: 4px;
  }
  del {
    font-size: 12px;
    padding: 4px;
  }
  }
  
  @media (max-width: 315px) {
    p {
    font-size: 10px;
    margin-right: 2px;
  }
  del {
    font-size: 10px;
    padding: 2px;
  }
  }
`;

const ProductAmount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin-bottom: 10px;
    font-size: 1.2em;
  }
  @media (max-width: 545px) {
    p {
    font-size: 12px;
  }
  }
`;

const ChangeAmount = styled.div`
  display: flex;
  align-items: center;
  

  svg {
    cursor: pointer;
    font-size: 1.5em;
    margin: 0 5px;
    color: #333;

    &:hover {
      color: #007bff;
    }
  }
  @media (max-width: 545px) {
    svg {
    font-size: 12px;
  }
  }
`;

const DialogBox = ({ isOpen, children, closeDialog, dilogName }) => {
  const [cartItems, setCartItems] = useState([]);
  const [likeItems, setLikeItems] = useState([]);
  const navigate = useNavigate();

  const updateCart = (ProductId, operation) => {
    let storedCartItems = localStorage.getItem('MirchMasalaCart');
    if (storedCartItems) {
      let cartItems = JSON.parse(storedCartItems);
      const existingItemIndex = cartItems.findIndex(item => item.ProductId === ProductId);

      if (existingItemIndex !== -1) {
        const existingItem = cartItems[existingItemIndex];

        if (operation === 'Sub' && existingItem.Amount > 1) {
          existingItem.Amount -= 1;
        } else if (operation === 'Add') {
          existingItem.Amount += 1;
        } else if (operation === 'Remove') {
          cartItems.splice(existingItemIndex, 1);
        }
      } else if (operation === 'Add') {
        cartItems.push({ ProductId, Amount: 1 });
      }

      localStorage.setItem('MirchMasalaCart', JSON.stringify(cartItems));
      fetchCartCount();
    }
  };

  const fetchCartCount = () => {
    const storedCartItems = localStorage.getItem('MirchMasalaCart');
    const parsedCartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
    setCartItems(parsedCartItems);
  };

  const fetchLikeItems = () => {
    const storedLikeItems = localStorage.getItem('MirchMasalaLikeCart');
    let parsedLikeItems = [];
    try {
      parsedLikeItems = storedLikeItems ? JSON.parse(storedLikeItems) : [];
      if (!Array.isArray(parsedLikeItems)) {
        parsedLikeItems = [];
      }
    } catch (error) {
      console.error("Error parsing like items:", error);
    }
    const filteredProducts = MirchMasalaProduct.filter(product => parsedLikeItems.includes(product.ProductId));
    setLikeItems(filteredProducts);
  };

  const UpdateFetchLikeItems = (ProductIdUpdate) => {
    let storedLikeItems = localStorage.getItem('MirchMasalaLikeCart');
    let parsedLikeItems = [];
    try {
      parsedLikeItems = storedLikeItems ? JSON.parse(storedLikeItems) : [];
      if (!Array.isArray(parsedLikeItems)) {
        parsedLikeItems = [];
      }
    } catch (error) {
      console.error("Error parsing like items:", error);
    }
    if (parsedLikeItems.includes(ProductIdUpdate)) {
      const index = parsedLikeItems.indexOf(ProductIdUpdate);
      parsedLikeItems.splice(index, 1);
      localStorage.setItem('MirchMasalaLikeCart', JSON.stringify(parsedLikeItems));
    }
    fetchLikeItems();
  };

  useEffect(() => {
    if (isOpen) {
      fetchCartCount();
      fetchLikeItems();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const renderCartItem = cartItem => {
    const product = MirchMasalaProduct.find(item => item.ProductId === cartItem.ProductId);

    return (
      <Box key={product.ProductId}>
        <ProductImage>
          <img src={NotItem} alt={product.name} />
        </ProductImage>
        <ProductDetails
          onClick={() => {
            navigate(`/ProductDetail/${product.id}`);
            closeDialog();
          }}
        >
          <b>{product.name}</b>
          <p>{product.title}</p>
          <ProductPrice>
            <p>
              {product.discountedPrice}
              <del> {product.originalPrice} </del>
              <span>Total : {Number(product.discountedPrice) * Number(cartItem.Amount)}</span>
            </p>
          </ProductPrice>
        </ProductDetails>
        <ProductAmount>
          <p>Amount : {cartItem.Amount}</p>
          <ChangeAmount>
            <FaMinus onClick={() => updateCart(product.ProductId, 'Sub')} />
            <FaPlus onClick={() => updateCart(product.ProductId, 'Add')} />
            <MdRemoveShoppingCart onClick={() => updateCart(product.ProductId, 'Remove')} />
          </ChangeAmount>
        </ProductAmount>
      </Box>
    );
  };

  const renderLikeItem = product => (
    <Box key={product.id}>
      <ProductImage>
        <img src={NotItem} alt={product.name} />
      </ProductImage>
      <ProductDetails
        onClick={() => {
          navigate(`/ProductDetail/${product.id}`);
          closeDialog();
        }}
      >
        <b>{product.name}</b>
        <p>{product.title}</p>
        <ProductPrice>
          <p>
            {product.discountedPrice}
            <del> {product.originalPrice} </del>
          </p>
          <FaHeart cursor={"pointer"} fontSize={32} color="red" onClick={() => UpdateFetchLikeItems(product.ProductId)} />
        </ProductPrice>
      </ProductDetails>
    </Box>
  );

  return (
    <>
      <Overlay />
      <DialogContainer className="cart">
        {children}
        {cartItems.length > 0 ? (
          dilogName === 'Shopping Bag' ? (
            cartItems.map(renderCartItem)
          ) : dilogName === 'Heart Bag' ? (
            likeItems.map(renderLikeItem)
          ) : (
            <div>
              <h5>You can't select any productPlease add the product.</h5>
              <img width={250} src={NotItem} alt="Not any item present" />
            </div>
          )
        ) : (
          <div>
            <h5>You can't select any productPlease add the product.</h5>
            <img width={250} src={NotItem} alt="Not any item present" />
          </div>
        )}
      </DialogContainer>
    </>
  );
};

export default DialogBox;
