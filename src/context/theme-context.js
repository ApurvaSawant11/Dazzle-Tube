import { createContext, useContext, useState } from "react";
import { useEffect } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("night");

  useEffect(
    () => setTheme(localStorage.getItem("DazzleTube Theme") ?? "night"),
    []
  );

  const changeTheme = () => {
    localStorage.setItem(
      "DazzleTube Theme",
      theme === "night" ? "light" : "night"
    );
    setTheme(localStorage.getItem("DazzleTube Theme"));
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export { useTheme, ThemeProvider };
