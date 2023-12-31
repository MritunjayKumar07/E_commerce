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

  @media (max-width: 480px) {
    width: 100%;
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

const VerificationForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  section {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }
`;

const OTPInput = styled.input`
  width: 45px;
  height: 45px;
  padding: 10px;
  margin: 10px;
  border: 1px solid #aaa;
  border-radius: 8px;
  color: #080b0e;
  font-weight: 500;
  text-align: center;
  font-size: 18px;

  &:focus {
    outline: none;
    border-color: #a674d6;
  }
  @media (max-width: 550px) {
    width: 35px;
    height: 35px;
    padding: 5px;
    margin: 5px;
  }
`;

const SubmitButton = styled.button`
  width: 70%;
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

export default function VerificationCode({
  countdown,
  countdownActive,
  emailVerification,
}) {
  const [regenerateCountdown, setRegenerateCountdown] = useState();
  const [regenerateCountdownActive, setRegenerateCountdownActive] =
    useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [userVerificationCode, setUserVerificationCode] = useState({
    code: Array(6).fill(""),
    email: emailVerification,
  });

  const handleInputChange = (index, value) => {
    setUserVerificationCode((prevUser) => {
      const updatedCode = [...prevUser.code];
      updatedCode[index] = value;
      return { ...prevUser, code: updatedCode };
    });
  };

  const ReGenerateVarificationCode = async () => {
    setRegenerateCountdown(300);
    setRegenerateCountdownActive(true);

    const interval = setInterval(() => {
      setRegenerateCountdown((prev) => prev - 1);
    }, 1000);

    setTimeout(() => {
      setRegenerateCountdownActive(false);
      clearInterval(interval);
    }, 300000);
  };

  const handleSubmitVerificationCode = async (e) => {
    if (e) {
      e.preventDefault();
      const fullVerificationCode = parseInt(
        userVerificationCode.code.join(""),
        10
      );
      // console.log(fullVerificationCode)
      setIsDisable(true);
      // Determine the API endpoint based on the state
      const changeSignupSystem = regenerateCountdownActive
        ? "forgotPassword"
        : "userVerificationCode";

      try {
        const response = await axios.post(
          `http://localhost:9000/mirchmasala/${changeSignupSystem}`,
          {
            code: fullVerificationCode,
            email: userVerificationCode.email,
          }
        );
        if (response.data.status) {
          localStorage.setItem("setActiveContainer", "PasswordCreate");
        }
      } catch (error) {
        setIsDisable(false);
        alert(error.response?.data?.message || "Error during verification");
      }
    }
    // console.log(e)
  };

  const focusNextInput = (index) => {
    const nextIndex = index + 1;
    if (nextIndex < 6) {
      const nextInput = document.getElementsByName(`code${nextIndex}`)[0];
      if (nextInput) {
        nextInput.focus();
        nextInput.select();
      }
    } else if (nextIndex === 6) {
      handleSubmitVerificationCode();
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
      <SubTitle>Verification Code</SubTitle>
      <VerificationForm onSubmit={(e) => handleSubmitVerificationCode(e)}>
        <section>
          {Array.from({ length: 6 }).map((_, index) => (
            <OTPInput
              key={index}
              type="text"
              name={`code${index}`}
              maxLength={1}
              required
              value={userVerificationCode.code[index] || ""}
              onChange={(e) => {
                handleInputChange(index, e.target.value);
                focusNextInput(index);
              }}
            />
          ))}
        </section>
        <SubmitButton type="submit" disabled={isDisable}>
          Submit
        </SubmitButton>
      </VerificationForm>
      <SmallText>
        Don't have an account?
        <SignUp onClick={() => window.location.reload()}>Login</SignUp>
      </SmallText>
      {countdownActive || regenerateCountdownActive ? (
        <SmallText>
          Countdown: {Math.floor((regenerateCountdown || countdown) / 60)} :{" "}
          {(regenerateCountdown || countdown) % 60}
        </SmallText>
      ) : (
        <ForgotButton onClick={ReGenerateVarificationCode}>
          Re-Generate Code
        </ForgotButton>
      )}
    </Container>
  );
}
