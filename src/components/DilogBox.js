import React from 'react';
import styled from 'styled-components';

const DialogContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
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

export default function DialogBox({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  
  return (
    <>
      <Overlay onClick={onClose} />
      <DialogContainer>
        {children} 
        <p>You can put any content you want here.</p>
        <button onClick={onClose}>Close</button>
      </DialogContainer>
    </>
  );
}
