import styled from "styled-components";

const SelectField: React.FC<{
    name: string;
    value: string;
    options: string[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  }> = ({ name, value, options, onChange }) => {
    return (
      <Select name={name} value={value} onChange={onChange}>
        {options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </Select>
    );
  };

export default SelectField

const Select = styled.select`
  width: 45%;
  padding: 0.5rem;
  margin: 0.3125rem;
  text-align: center;
  border: 0.125rem solid rgb(255, 108, 129);
  border-radius: 0.5rem;
  font-size: 1rem;
  background-color: white;
  outline: none;
  cursor: pointer;
  
  @media (max-width: 29.6875rem){
    padding: 0.5rem;
    font-size: 0.5rem;
  }
  @media (max-width: 50rem){
    padding: 0.7rem;
    font-size: 0.9rem;
  }
  appearance: none; /* 기본 드롭다운 화살표 아이콘 제거 */
`;