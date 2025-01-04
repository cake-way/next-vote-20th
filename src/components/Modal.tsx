"use client";
import styled from 'styled-components';

interface ModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContainer>
        <Message>{message}</Message>
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 1.875rem 2.5rem;
  border-radius: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Message = styled.p`
  margin-bottom: 1.25rem;
  font-size: 1rem;
  white-space: pre-line;
  @media (max-height: 48rem) {
    font-size: 0.7rem;
}
`;

const CloseButton = styled.button`
  padding: 0.3125rem 1.25rem;
  border: none;
  background-color:rgb(255, 108, 129);
  color: white;
  border-radius: 0.3125rem;
  cursor: pointer;
  font-size: 0.8rem;
  @media (max-height: 48rem) {
    font-size: 0.7rem;
    }
`;