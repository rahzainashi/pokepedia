import React, { createContext, useState } from "react";
import {darkTheme, lightTheme} from "./theme"

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState(lightTheme)

    const toggleTheme = () =>{
        if(theme.themeName === "light"){
            setTheme(darkTheme)
        }else{
          setTheme(lightTheme)
        }
    }
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
