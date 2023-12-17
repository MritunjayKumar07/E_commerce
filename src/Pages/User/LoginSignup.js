import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import LogoImage from '../../assets/images/logo/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import VerificationCode from './VerificationCode';
import PasswordGenerate from './PasswordGenerate';
import { FaEye, FaRegEyeSlash } from "react-icons/fa6";
import Loading from '../../Loading';



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
  margin-top: 10px;
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

  @media (max-width: 480px) {
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
    font-weight: 500;
  }

  button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 8px;
    background-color: #a674d6;
    color: #fff;
    cursor: pointer;
    margin-top: 20px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #8e5bba;
    }
  }
`;

const PasswordView = styled.div`
  position: relative;
  width: 100%;

  input {
    width: calc(100% - 0px); 
    padding: 10px;
    margin-bottom: 18px;
    border: none;
    border-radius: 8px;
    color: #080B0E;
    font-weight: 500;
  }

  svg {
    position: absolute;
    top: 15%;
    right: 6px;
    color: #000;
    cursor: pointer;
    font-size: 24px;
    transition: color 0.3s;
    font-weight: 600;

    &:hover {
      color: #a674d6;
    }
  }
`;

const SmallText = styled.span`
  color: #aaa;
  white: 100%;
  font-size: 14px;
  text-align: center;
  margin-top: 25px;
  display: block;
`;

const SignUp = styled.span`
  cursor: pointer;
  color: #a674d6;
  padding-left: 2px;
  font-size: 14px;
  font-weight:600;
  transition: color 0.3s;

  &:hover {
    color: #9c5cbc;
  }
`;

const ForgotButton = styled.span`
  float: right;
  color: #a674d6;
  cursor: pointer;
  line-height: 20px;
  border-left: none;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
  margin-top: 20px;
  margin-right: 10px;

  &:hover {
    color: #9c5cbc;
  }
`;

export default function LoginSignup() {
  const [countdown, setCountdown] = useState(300); // 7 minutes in seconds
  const [countdownActive, setCountdownActive] = useState(false);
  const [activeContainer, setActiveContainer] = useState('Login');
  const [emailVerification, setEmailVerification] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    var retrievedValue = localStorage.getItem('setActiveContainer');
    var retrievedValueVerification = localStorage.getItem('setEmailVerification');
    if (retrievedValue) {
      setActiveContainer(retrievedValue);
      localStorage.clear('setActiveContainer');
    }
    if (retrievedValueVerification) {
      setEmailVerification(retrievedValueVerification);
      localStorage.clear('setEmailVerification');
    }
  })

  const startCountdown = () => {
    setCountdownActive(true);
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Clear the interval after 7 minutes
    setTimeout(() => {
      setCountdownActive(false);
      clearInterval(interval);
    }, 300000);
  };

  const ForgotContainer = () => {
    const [userForgot, setUserForgot] = useState({ email: '' });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUserForgot((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSubmitForgot = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:9000/mirchmasala/forgotPassword', userForgot);
        alert(response.data.message);
        setActiveContainer('Re-Generate VerificationCode')
      } catch (error) {
        if (error.response && error.response.status === 409) {
          alert(error.response.data.message);
        } else {
          console.error('Error during forgot password:', error);
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
            name="email"
            required
            autoComplete="off"
            title="Enter a valid Email id"
            onChange={handleInputChange}
          />
          <button type="submit">Submit</button>
        </Form>
        <SmallText>
          Don't have an account?<SignUp onClick={() => setActiveContainer('SignUp')}>SignUp</SignUp>
        </SmallText>
        <ForgotButton onClick={() => setActiveContainer('FORGOT PASSWORD')}>FORGOT PASSWORD</ForgotButton>
      </Container>
    );
  };

  const SignupContainer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isDisable, setIsDisable] = useState(false);
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
      setIsDisable(true);
      setIsLoading(true);
      try {
        const response = await axios.post('http://localhost:9000/mirchmasala/signup', userSignup);
        alert(response.data.message);
        setEmailVerification(response.data.email)
        setActiveContainer('Re-Generate VerificationCode')
        startCountdown();
      } catch (error) {
        setIsDisable(false)
        setIsLoading(false);
        if (error.response && error.response.status === 409) {
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
        {isLoading ? <Loading loadingFor={"Wait a second"}/> : <Form onSubmit={handleSubmitSignup}>
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
            title="Enter a valid Email id"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="contactNumber"
            placeholder="Contact number"
            required
            inputMode="numeric"
            pattern="[0-9]{10,12}"
            maxLength={12}
            title="Enter a valid Contact number"
            onChange={handleInputChange}
          />
          <button type="submit" disabled={isDisable} style={isDisable ? { backgroundColor: '#bd8deb' } : {}}>Submit</button>
        </Form>}
        <SmallText>
          Don't have an account?<SignUp onClick={() => setActiveContainer('Login')}>Login</SignUp>
        </SmallText>
        <ForgotButton onClick={() => setActiveContainer('FORGOT PASSWORD')}>FORGOT PASSWORD</ForgotButton>
      </Container>
    );
  };

  const LoginContainer = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [userLogin, setUserLogin] = useState({
      usernameOrEmail: '',
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
        // console.log(response);
        if (response.data.status) {
          navigate('/');
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        // console.error('Error during login:', error);
        if (error.response) {
          if (error.response.status === 404) {
            alert('Not found in my Data Base, SignUp now...');
            setActiveContainer('SignUp');
          } else if (error.response.status === 401) {
            alert('Invalid username or password');
          } else if (error.response.status === 500) {
            alert('Internal server error');
          }
        } else {
          alert('Network error, please try again later.');
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
            name="usernameOrEmail"
            required
            onChange={handleInputChange}
          />
          <PasswordView>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              name="Password"
              required
              autoComplete="off"
              onChange={handleInputChange}
            />
            {showPassword ? (
              <FaEye onClick={() => setShowPassword(false)} />
            ) : (
              <FaRegEyeSlash onClick={() => setShowPassword(true)} />
            )}
          </PasswordView>
          <button type="submit">Login</button>
        </Form>
        <SmallText>
          Don't have an account?<SignUp onClick={() => setActiveContainer('SignUp')}>SignUp</SignUp>
        </SmallText>
        <ForgotButton onClick={() => setActiveContainer('FORGOT PASSWORD')}>FORGOT PASSWORD</ForgotButton>
      </Container>
    );
  };

  const renderContainer = () => {
    switch (activeContainer) {
      case 'SignUp':
        return <SignupContainer />;
      case 'Login':
        return <LoginContainer />;
      case 'FORGOT PASSWORD':
        return <ForgotContainer />;
      case 'Re-Generate VerificationCode':
        return <VerificationCode
          countdown={countdown}
          countdownActive={countdownActive}
          emailVerification={emailVerification}
        />;
      case 'PasswordCreate':
        return <PasswordGenerate
          emailVerification={emailVerification}
        />;
      default:
        return <LoginContainer />;
    }
  };

  return renderContainer();
}
