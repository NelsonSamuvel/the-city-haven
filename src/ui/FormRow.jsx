import styled, { css } from "styled-components";

const StyledFormRow = styled.div`
  ${(props) =>
    props.type === "default" &&
    css`
      display: grid;
      align-items: center;
      grid-template-columns: 24rem 1fr 1.2fr;
      gap: 2.4rem;
      padding: 0.8rem 0;
    `}

  ${(props) =>
    props.type === "customColumn" &&
    css`
      display: flex;
      flex-direction: column;
    `}

    ${(props) =>
    props.type === "customRow" &&
    css`
      display: flex;
      flex-direction: row;
      margin-top: 12px;
    `}

  &:first-child {
    padding-top: 0;
    margin-bottom: 12px;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

const FormRow = ({ label, error, type, children }) => {
  return (
    <StyledFormRow type={type}>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
};

StyledFormRow.defaultProps = {
  type: "default",
};

export default FormRow;
