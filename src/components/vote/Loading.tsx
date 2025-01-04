import styled, { keyframes } from "styled-components";

const Loading: React.FC = () => {
  return (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  );
};

export default Loading;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10rem;
  background-color: #ffffff;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3; /* 회색 배경 */
  border-top: 5px solid #ff6c81; /* 로딩 색상 */
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
