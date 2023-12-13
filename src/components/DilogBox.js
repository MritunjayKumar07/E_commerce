import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NotItem from '../assets/images/empty_shoping_Bag.png';
import { MirchMasalaProduct } from '../server/Api_MirchMasalaProduct';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { MdRemoveShoppingCart } from "react-icons/md";
import {useNavigate} from 'react-router-dom';

const DialogContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  height:80%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  opacity: 0;
  animation: fadeIn 0.3s ease-out forwards;
  border-radius: 8px;
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
  border-radius: 8px;
`;

const ImageBox = styled.div`
  img {
    border-radius: 8px;
    margin-right: 10px;
    max-width: 70px;
  }
`;

const DetailBox = styled.div`
  flex: 1;
  margin-right: 10px;
  padding-left:20px;
  padding-right:20px;

  bold {
    font-size: 1.2em;
    display: block;
    margin-bottom: 5px;
  }

  p {
    color: #555;
    margin-bottom: 10px;
  }
`;

const Price = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    font-size: 1.2em;
    color: #333;
    margin-right: 10px;
    fontWeight:700;
  }

  del {
    font-size: 1em;
    color: red;
    text-decoration: line-through;
    fontWeight:700;
    padding:10px;
  }
`;

const AmountBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin-bottom: 10px;
    font-size: 1.2em;
  }
`;

const IncreaseDecreaseAmount = styled.div`
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
`;

export default function DialogBox({ isOpen, children, closeDialog, dilogName }) {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  //
  //
  //
  // Work On dilogName
  //
  //
  //
  
  const updateCart = (ProductId, operation) => {
    let cartItems = localStorage.getItem('MirchMasalaCart');
    if (cartItems) {
      cartItems = JSON.parse(cartItems);
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
    } else {
      cartItems = [{ ProductId, Amount: 1 }];
    }

    localStorage.setItem('MirchMasalaCart', JSON.stringify(cartItems));
    fetchCartCount();
  };

  const fetchCartCount = () => {
    const cartItems = localStorage.getItem('MirchMasalaCart');
    const parsedCartItems = cartItems ? JSON.parse(cartItems) : [];
    setItems(parsedCartItems);
  };

  useEffect(() => {
    if (isOpen) {
      fetchCartCount();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <Overlay />
      <DialogContainer className="cart">
        {children}
        {items.length > 0 ? (
          items.map((cartItem) => {
            const product = MirchMasalaProduct.find((item) => item.ProductId === cartItem.ProductId);
            return (
              <Box key={product.ProductId}>
                <ImageBox>
                  <img src={NotItem} alt={product.name} />
                </ImageBox>
                <DetailBox onClick={()=>{navigate(`/ProductDetail/${product.id}`);closeDialog();}}>
                  <bold>{product.name}</bold>
                  <p>{product.title}</p>
                  <Price>
                    <p>
                      {product.discountedPrice}
                      <del> {product.originalPrice} </del>
                      <span>Total : {Number(product.discountedPrice) * Number(cartItem.Amount)}</span>
                    </p>
                  </Price>
                </DetailBox>
                <AmountBox>
                  <p>Amount : {cartItem.Amount}</p>
                  <IncreaseDecreaseAmount>
                    <FaMinus onClick={() => updateCart(product.ProductId, 'Sub')} />
                    <FaPlus onClick={() => updateCart(product.ProductId, 'Add')} />
                    <MdRemoveShoppingCart onClick={() => updateCart(product.ProductId, 'Remove')}/>
                  </IncreaseDecreaseAmount>
                </AmountBox>
              </Box>
            );
          })
        ) : (
          <>
            <div>
              <h3>You can't select any product<br />Please add the product.</h3>
              <img src={NotItem} alt='Not any item present' />
            </div>
          </>
        )}
      </DialogContainer>
    </>
  );
}