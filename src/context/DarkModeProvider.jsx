import { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDark, setIsdark] = useState(false);

  function setDark() {
    setIsdark((dark) => !dark);
  }

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDark]);

  return (
    <DarkModeContext.Provider value={{ isDark, setDark }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("darkMode value us used outside of the context");

  return context;
}

export default DarkModeProvider;
