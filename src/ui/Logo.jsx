import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeProvider";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
  border-radius: 50%;
`;

function Logo() {
  const { isDark } = useDarkMode();

  const src = isDark ? "/hotel-logo-dark.jpg" : "/hotel-logo-light.jpg";

  return (
    <StyledLogo>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
