import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../context/DarkModeProvider";

function DarkModeToggle() {
  const { isDark, setDark } = useDarkMode();

  return (
    <ButtonIcon onClick={setDark}>
      {isDark ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
