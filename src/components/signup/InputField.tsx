import styled from "styled-components";

const InputField: React.FC<{
    name: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    errorMessage?: string;
    isPassword?: boolean;
    togglePasswordVisibility?: () => void;
  }> = ({ name, type, placeholder, value, onChange, errorMessage, isPassword, togglePasswordVisibility }) => {
    return (
      <InputWrapper>
        <Input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {isPassword && (
          <PasswordContainer>
            <ToggleButton onClick={togglePasswordVisibility}>
              {type === "password" ? "보기" : "숨기기"}
            </ToggleButton>
          </PasswordContainer>
        )}
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
      </InputWrapper>
    );
  };

export default InputField


const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 0.75rem;
  margin-top: -0.3125rem; 
`;

const Input = styled.input`
  width: 100%;
  padding: 0.9375rem;
  margin-bottom: 1rem;
  border: none;
  border-bottom: 0.125rem solid rgb(255, 108, 129);
  outline: none;
  font-size: 1rem;
`;

const PasswordContainer = styled.div`
  position: absolute;
  right: 0.625rem;
  top: 2.1875rem;
`;

const ToggleButton = styled.button`
  background: none;
  width: 3.125rem;
  position: absolute;
  bottom: 0;
  right: 0.3125rem;
  border: none;
  color: #ccc;
  cursor: pointer;
  font-size: 0.875rem;
  &:hover {
    color: rgb(255, 108, 129);
    transition: 0.2s;
  }
`;