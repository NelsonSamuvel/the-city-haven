import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 900;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2.5rem;
    `}

    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
    `} 
    
    font-weight:600;
  color: var(--color-gray-600);
`;

export default Heading;
