import React, { createContext, useEffect, useState } from "react";
import { changeTheme } from "../utils/helper";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    theme === "light" ? changeTheme("dark") : changeTheme("light");
  };
  useEffect(() => {
    changeTheme(theme);
  }, []);
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
