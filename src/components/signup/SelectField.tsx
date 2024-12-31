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
  padding: 0.9375rem;
  margin: 0.3125rem;
  border: 0.125rem solid rgb(255, 108, 129);
  border-radius: 0.3125rem;
  font-size: 1rem;
  background-color: white;
  outline: none;
`;