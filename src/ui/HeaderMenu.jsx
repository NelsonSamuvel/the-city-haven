import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi";
import Logout from "../features/authentication/Logout";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.8rem;
`;

function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <StyledHeaderMenu>
      <ButtonIcon onClick={() => navigate("/account")}>
        <HiOutlineUser />
      </ButtonIcon>
      <DarkModeToggle/>
      <Logout />
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
