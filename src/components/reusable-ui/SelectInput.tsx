import React from "react";
import styled from "styled-components";
import { theme } from "../../theme";


interface Option {
  optionValue: string; 
  label: string; 
}

interface SelectInputProps {
  options: Option[]; 
  value: string; 
  name: string; 
  Icon?: React.ReactNode; 
  className?: string; 
  onChange?: React.ChangeEventHandler<HTMLSelectElement>; 
}

const SelectInput = ({
  options,
  value,
  name,
  Icon,
  className,
  onChange,
  ...restProps
}: SelectInputProps) => {
  return (
    <SelectInputStyled className={className}>
      {Icon && <div className="icon">{Icon}</div>}
      <select name={name} value={value} onChange={onChange} {...restProps}>
        {options.map(({ optionValue, label }) => (
          <option key={label} value={optionValue}>
            {label}
          </option>
        ))}
      </select>
    </SelectInputStyled>
  );
};

const SelectInputStyled = styled.div`
  background-color: ${theme.colors.background_white};
  border-radius: ${theme.borderRadius.round};
  display: flex;
  align-items: center;
  padding: 8px 16px;

  .icon {
    font-size: ${theme.fonts.size.P1};
    margin-right: 13px;
    color: ${theme.colors.greyBlue};
    display: flex;
  }

  select {
    background: ${theme.colors.background_white};
    border: none;
    font-size: ${theme.fonts.size.SM};
    color: ${theme.colors.dark};
    width: 100%;
    outline: 0;
  }
`;

export default SelectInput;
