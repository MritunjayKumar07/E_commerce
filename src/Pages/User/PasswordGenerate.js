import React, { useState } from "react";
import styled from "styled-components";
import LogoImage from "../../assets/images/logo/logo.png";
import { Link } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 40%;
  max-width: 400px;
  height: 650px;
  transform: translate(-50%, -50%);
  background: #080b0e;
  padding: 20px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Poppins", sans-serif;

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
  font-family: "Poppins", sans-serif;
  letter-spacing: 1px;
`;

const SubTitle = styled.h3`
  color: #ec9d65;
  font-weight: normal;
  text-align: center;
  margin-bottom: 15px;
  font-family: "Poppins", sans-serif;
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
    color: #080b0e;
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
  font-weight: 600;
  transition: color 0.3s;

  &:hover {
    color: #9c5cbc;
  }
`;

const PasswordSagesion = styled.span`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  color: #aaa;
  font-size: 12px;
  text-align: center;

  i {
    margin-left: 4px;
    margin-right: 4px;
  }

  @media (max-width: 480px) {
    font-size: 10px;

    i {
      margin-left: 3px;
      margin-right: 3px;
    }
  }
`;

export default function PasswordGenerate({ emailVerification }) {
  const [userPassword, setUserPassword] = useState({
    Password: "",
    CPassword: "",
    email: emailVerification,
  });
  const [passwordStrength, setPasswordStrength] = useState({
    lowercase: false,
    uppercase: false,
    digit: false,
    specialChar: false,
    length: false,
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserPassword((prevUser) => ({ ...prevUser, [name]: value }));
    // Check password conditions and update passwordStrength state
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const digitRegex = /\d/;
    const specialCharRegex = /[@$!%*?&]/;

    setPasswordStrength({
      lowercase: lowercaseRegex.test(value),
      uppercase: uppercaseRegex.test(value),
      digit: digitRegex.test(value),
      specialChar: specialCharRegex.test(value),
      length: value.length >= 6,
    });
  };

  const getStrengthColor = (condition) => (condition ? "#00cc00" : "#cccccc");

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    try {
      if (userPassword.Password !== userPassword.CPassword) {
        alert("Passwords do not match.");
        return;
      } else {
        const response = await axios.post(
          "http://localhost:9000/mirchmasala/passwordCreate",
          { Password: userPassword.Password, email: userPassword.email }
        );
        alert(response.data.message);
        localStorage.setItem("setEmailVerification", undefined);
        localStorage.setItem("setActiveContainer", undefined);
        window.location.reload();
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert(error.response.data.message);
      } else {
        console.error("Error during creating Password:", error);
      }
    }
  };
  return (
    <Container>
      <Logo>
        <Link to={"/"}>
          <img src={LogoImage} alt="Logo" />
        </Link>
      </Logo>
      <Title>Mirch Masala</Title>
      <SubTitle>Create Password</SubTitle>
      <Form onSubmit={handleSubmitPassword}>
        <input
          type="password"
          name="Password"
          placeholder="Password"
          required
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="CPassword"
          placeholder="Confirm Password"
          required
          onChange={handleInputChange}
        />
        <PasswordSagesion>
          Use strong password
          <i style={{ color: getStrengthColor(passwordStrength.lowercase) }}>
             lowercase
          </i>
          ,
          <i style={{ color: getStrengthColor(passwordStrength.uppercase) }}>
            uppercase
          </i>
          ,
          <i style={{ color: getStrengthColor(passwordStrength.digit) }}>
            digit
          </i>
          ,
          <i style={{ color: getStrengthColor(passwordStrength.specialChar) }}>
            special character among @ $ ! % * ? &
          </i>
          ,
          <i style={{ color: getStrengthColor(passwordStrength.length) }}>
            {" "}
            6 characters
          </i>
          .
        </PasswordSagesion>
        <button type="submit">Submit</button>
      </Form>
      <SmallText>
        Alwarady have an account?
        <SignUp onClick={() => window.location.reload()}>Login</SignUp>
      </SmallText>
    </Container>
  );
}
