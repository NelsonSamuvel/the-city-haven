import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  padding-block: 16px;
  padding-inline: 12px;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}


  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1rem;
    `}

    ${(props) =>
    props.type === "flexEnd" &&
    css`
      justify-content: flex-end;
      padding-block: 4px;
      padding-inline: 12px;
      align-items: center;
    `}
`;
Row.defaultProps = {
  type: "vertical",
};

export default Row;
