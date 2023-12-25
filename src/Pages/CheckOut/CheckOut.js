import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdPayment } from "react-icons/md";
import { TbCash } from "react-icons/tb";
import { MirchMasalaProduct } from "../../server/Api_MirchMasalaProduct";
import NotItem from "../../assets/images/empty_shoping_Bag.png";

// Styled components
const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5rem;
  margin-top: 2rem;
`;

const Window = styled.div`
  height: 540px;
  width: 800px;
  background: #fff;
  display: flex;
  box-shadow: 0px 15px 50px 10px rgba(0, 0, 0, 0.2);
  border-radius: 30px;
`;

const ProductCardDetail = styled.div`
  overflow-y: scroll;
  height: 22rem;
  width: 100%;
  padding-right: 10px;
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #e6e6fa;
    border-radius: 30px;
  }
`;

const OrderInfo = styled.div`
  height: 100%;
  width: 50%;
  padding-left: 25px;
  padding-right: 25px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  position: relative;
`;

const OrderTable = styled.table`
  position: relative;
  width: 100%;
`;

const Tbody = styled.tbody`
  ₹{"" /* font-size:12px; */}
`;

const Price = styled.div`
  bottom: 0px;
  position: absolute;
  right: 0px;
  color: #000;
`;

const Total = styled.div`
  margin-top: 25px;
  font-size: 20px;
  position: absolute;
  bottom: 30px;
  right: 27px;
  left: 35px;
`;

const CreditInfo = styled.div`
  background: #080b0e;
  height: 100%;
  width: 50%;
  color: #fff;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  padding-left: 25px;
  padding-right: 25px;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  position: relative;

  h2 {
    text-align: center;
    color: #fff;
    margin-bottom: 20px;
  }
`;

const Address = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    font-size: 16px;
    margin-bottom: 10px;
    color: #fff;
  }

  address {
    background: #fff;
    color: #000;
    border-radius: 5px;
    overflow-y: scroll;
    min-height: 60px;
    max-height: 100px;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 20px;

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #e6e6fa;
      border-radius: 30px;
    }
  }
`;

const PaymentDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;

  strong {
    font-size: 18px;
    color: #fff;
    margin-bottom: 10px;
  }
`;

const PaymentButton = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #000;
  background: #fff;
  margin-top: 12px;
  height: 40px;
  line-height: 40px;
  border-radius: 5px;
  cursor: pointer;
  padding-right: 15px;
  padding-left: 15px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #8934eb;
  }

  svg {
    font-size: 30px;
    color: #000;
    margin-right: 15px;
  }

  span {
    font-size: 16px;
    font-weight: 600;
  }
`;
const CheckOut = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(0);

  const fetchData = () => {
    const carts = JSON.parse(localStorage.getItem("MirchMasalaCart"));
    if (carts) {
      const cart = carts.map((cartItem) => {
        const product = MirchMasalaProduct.find(
          (product) => product.ProductId === cartItem.ProductId
        );
        return product ? { ...product, Amount: cartItem.Amount } : null;
      });
      setCartItems(cart.filter((item) => item !== null));

      const total = cart.reduce(
        (acc, item) => acc + item.Amount * item.discountedPrice,
        0
      );
      setTotalPrice(total);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container>
      <Window>
        <OrderInfo>
          <div>
            <h3 style={{ textAlign: "center" }}>Order Summary</h3>
            <ProductCardDetail>
              {cartItems.map((item) => {
                return (
                  <OrderTable>
                    <Tbody>
                      <tr>
                        <td>
                          <img src={NotItem} height={60} width={63} />
                        </td>
                        <td>
                          <br /> <span>{item.name}</span>
                          <br /> {item.title}
                          <br />
                          <span>
                            {item.category[1]}
                            <br />
                            <br />
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Q {item.Amount} × Rs {item.discountedPrice}
                          <Price>
                            Rs:
                            {Number(item.Amount) * Number(item.discountedPrice)}
                          </Price>
                        </td>
                      </tr>
                    </Tbody>
                  </OrderTable>
                );
              })}
            </ProductCardDetail>
            <Total className="total">
              <span style={{ float: "left", fontWeight: "bold", fontSize: 17 }}>
                <div style={{ fontSize: 16, fontWeight: "500" }}>Total</div>
                <div style={{ fontSize: 16, fontWeight: "500" }}>Delivery</div>
                <div style={{ fontSize: 16, fontWeight: "500" }}>GST 18%</div>
                Sub Total
              </span>
              <span
                style={{
                  float: "right",
                  textAlign: "right",
                  fontWeight: "bold",
                  fontSize: 17,
                }}
              >
                <div style={{ fontSize: 16, fontWeight: "500" }}>
                  ₹{totalPrice}
                </div>
                <div style={{ fontSize: 16, fontWeight: "500" }}>
                  ₹{deliveryPrice}
                </div>
                <div style={{ fontSize: 16, fontWeight: "500" }}>
                  ₹{(18 * (totalPrice + deliveryPrice)) / 100}
                </div>
                ₹{totalPrice + (18 * totalPrice + deliveryPrice) / 100}
              </span>
            </Total>
          </div>
        </OrderInfo>
        <CreditInfo>
          <h2>Checkout</h2>
          <Address>
            <strong>Delivery Address</strong>
            <address>Lalabag, Gugdal Pur, Chhattisgarh, 8500</address>
          </Address>
          <PaymentDetail>
            <strong>Payment Method</strong>
            <PaymentButton>
              <MdPayment />
              <span>Online Payment</span>
            </PaymentButton>
            <PaymentButton>
              <TbCash />
              <span>Cash On Delivery</span>
            </PaymentButton>
          </PaymentDetail>
        </CreditInfo>
      </Window>
    </Container>
  );
};

export default CheckOut;
