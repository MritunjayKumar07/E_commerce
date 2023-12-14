import React, { useState } from 'react';
import styled from 'styled-components';
import LogoImage from '../assets/images/logo/logo.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 40%;
  max-width: 400px;
  height: 650px;
  transform: translate(-50%, -50%);
  background: #080B0E;
  padding: 20px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Poppins', sans-serif;

  @media (max-width: 1055px) {
    width: 90%;
  }
`;

const Logo = styled.div`
  img {
    width: 125px;
    border-radius: 50%;
  }
`;

const Title = styled.h1`
  color: #fff;
  font-size: 28px;
  text-align: center;
  margin-top:10px;
  margin-bottom: 5px;
  font-family: 'Poppins', sans-serif;
  letter-spacing: 1px;
`;

const SubTitle = styled.h3`
color: #ec9d65;
font-weight: normal;
text-align: center;
margin-bottom: 15px;
font-family: 'Poppins', sans-serif;
letter-spacing: 1px;
@media (max-width: 480px){
  font-size: 14px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 18px;
    border: none;
    border-radius: 8px;
    color: #080B0E;
    font-weight:500;
  }

  button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 8px;
    background-color: #a674d6;
    color: #fff;
    cursor: pointer;
    margin-top:20px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #8e5bba;
    }
  }
`;

const SmallText = styled.span`
color:#aaa;
white:100%;
font-size: 14px;
text-align:center;
margin-top:25px;
display:block;
`;

const SignUp = styled.span`
cursor:pointer;
color:#a674d6;
padding-left:2px;
fontSize:12px;
transition: color 0.3s;
&:hover{
  color:#9c5cbc;
  }
`;

const ForgotButton = styled.span`
float:right;
color:#a674d6;
cursor:pointer;
lineHeight:20px;
borderLeft:1px solid #ddd;
height:20px;
display:inline-block;
verticalAlign:middle;
marginTop:20px;
marginRight:10px;
&:hover{
  color:#9c5cbc;
  }
`;




export default function LoginSignup() {
  const [activeContainer, setActiveContainer] = useState("Login")

  const ForgotContainer = () => {
    const [userForgot, setUserForgot] = useState({ email: "" });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUserForgot((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSubmitForgot = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:9000/mirchmasala/forgotPassword', userForgot);
        console.log(response.data);
      } catch (error) {
        if (error.response.status === 409) {
          alert(error.response.data.message);
        } else {
          console.error('Error during signup:', error);
        }
      }
    };

    return (
      <Container>
        <Logo>
          <Link to={'/'}>
            <img src={LogoImage} alt="Logo" />
          </Link>
        </Logo>
        <Title>Mirch Masala</Title>
        <SubTitle>Forgot Password</SubTitle>
        <Form onSubmit={handleSubmitForgot}>
          <input
            type="email"
            placeholder="Email Id"
            name='email'
            required
            autoComplete="off"
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            title="Enter a valid Email id"
            onChange={handleInputChange}
          />
          <button type="submit">Submit</button>
        </Form>
        <SmallText>Don't have an account?<SignUp onClick={() => setActiveContainer("SignUp")}>SignUp</SignUp></SmallText>
        <ForgotButton onClick={() => setActiveContainer("FORGOT PASSWORD")}>FORGOT PASSWORD</ForgotButton>
      </Container>
    )
  }

  const SignupContainer = () => {
    const [userSignup, setUserSignup] = useState({
      firstName: '',
      lastName: '',
      email: '',
      contactNumber: '',
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUserSignup((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSubmitSignup = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:9000/mirchmasala/signup', userSignup);
        console.log(response.data);
      } catch (error) {
        if (error.response.status === 409) {
          alert(error.response.data.message);
        } else {
          console.error('Error during signup:', error);
        }
      }
    };

    return (
      <Container>
        <Logo>
          <Link to={'/'}>
            <img src={LogoImage} alt="Logo" />
          </Link>
        </Logo>
        <Title>Mirch Masala</Title>
        <SubTitle>SignUp</SubTitle>
        <Form onSubmit={handleSubmitSignup}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            required
            pattern="[A-Za-z]+"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            required
            pattern="[A-Za-z]+"
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email id"
            required
            autoComplete="off"
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            title="Enter a valid Email id"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="contactNumber"
            placeholder="Contact number"
            required
            pattern="[0-9]{10,12}"
            maxLength={12}
            autoComplete="off"
            title="Enter a valid Contact number"
            onChange={handleInputChange}
          />
          <button type="submit">Submit</button>
        </Form>
        <SmallText>
          Don't have an account?
          <SignUp onClick={() => setActiveContainer('Login')}>Login</SignUp>
        </SmallText>
        <ForgotButton onClick={() => setActiveContainer('FORGOT PASSWORD')}>FORGOT PASSWORD</ForgotButton>
      </Container>
    );
  };

  const LoginContainer = () => {
    const [userLogin, setUserLogin] = useState({
      Username: '',
      Password: '',
    });
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUserLogin((prevUser) => ({ ...prevUser, [name]: value }));
    };
    const handleSubmitLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:9000/mirchmasala/login', userLogin);
        console.log(response.data);
      } catch (error) {
        if (error.response.status === 409) {
          alert(error.response.data.message);
        } else {
          console.error('Error during login:', error);
        }
      }
    };
    return (
      <Container>
        <Logo>
          <Link to={'/'}>
            <img src={LogoImage} alt="Logo" />
          </Link>
        </Logo>
        <Title>Mirch Masala</Title>
        <SubTitle>Login</SubTitle>
        <Form onSubmit={handleSubmitLogin}>
          <input
            type="text"
            placeholder="Username"
            name='Username'
            required
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Password"
            name='Password'
            required
            autoComplete="off"
            onChange={handleInputChange}
          />
          <button type="submit">Login</button>
        </Form>
        <SmallText>Don't have an account?<SignUp onClick={() => setActiveContainer("SignUp")}>SignUp</SignUp></SmallText>
        <ForgotButton onClick={() => setActiveContainer("FORGOT PASSWORD")}>FORGOT PASSWORD</ForgotButton>
      </Container>
    )
  }

  let container =
    activeContainer === "SignUp" ? SignupContainer :
      activeContainer === "FORGOT PASSWORD" ? ForgotContainer :
        LoginContainer;

  return container();
}
