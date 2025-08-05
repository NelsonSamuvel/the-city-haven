import styled from "styled-components";

const StyledDropdown = styled.select`
  background-color: var(--color-brand-100);
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: var(--border-radius-tiny);
  font-size: 18px;
  margin: 12px 8px;
  color: black;
`;

export default function Dropdown({ options, register, id }) {
  return (
    <StyledDropdown name={id} {...register(id)}>
      {options?.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledDropdown>
  );
}
