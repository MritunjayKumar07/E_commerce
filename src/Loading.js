import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoadingConainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  h3{
  color:#fff;
  margin-right:10px;
  }

`;

const loadingAnimation = keyframes`
  0%, 20%, 80%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
`;

const LoadingDot = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: #fff;
  border-radius: 50%;
  margin: 0 4px;
  animation: ${loadingAnimation} 1.5s infinite ease-in-out;
`;

export default function Loading({loadingFor}) {
    return (
        <LoadingConainer>
            <h3>{loadingFor}</h3>
            <LoadingDot style={{ background: "red" }} />
            <LoadingDot style={{ background: "blue" }} />
            <LoadingDot style={{ background: "green" }} />
        </LoadingConainer>
    )
}
