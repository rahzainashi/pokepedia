/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import pokemonLogo from "../assets/pokemonLogo.png";
import pokeball from "../assets/pokeball.png";
import { ThemeContext } from "../util/ThemeManager";
import { DarkModeSwitch } from "react-toggle-dark-mode";

function NavigationBar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const styles = useStyle(theme);
  const [isDarkMode, setDarkMode] = useState(theme.themeName === "dark");

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
    toggleTheme();
  };

  return (
    <div css={styles.container}>
      <Link to="/">
        <img
          alt="pokemon header logo"
          css={styles.logoImage}
          src={pokemonLogo}
        />
      </Link>
      <div css={css({ display: "flex", justifyContent: "center" })}>
        <Link to="/my-pokemon">
          <img alt="my pokemon list button" css={styles.item} src={pokeball} />
        </Link>
        <div css={styles.item}>
          <DarkModeSwitch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={40}
          />
        </div>
        {/* <img alt="placeholder" css={styles.logoImage3} src={pokemonLogo} /> */}
      </div>
    </div>
  );
}

export default NavigationBar;

const useStyle = (theme) => {
  return {
    container: css({
      backgroundColor: theme.headerColor,
      position: "sticky",
      top: 0,
      // display: "block",
      // //   height: 70,
      // alignItems: "center",
      // //   padding: 5,
      // width: "100%",
      zIndex: 100,
      boxShadow: theme.shadowColor,

      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
    }),
    item: css({
      marginRight: 10,
      height: 40,
      // alignSelf:"flex-end"
      // marginLeft: "auto",
    }),
    logoImage: css({
      height: 50,
      margin: 5,
      marginLeft: 10,
    }),
    logoImage2: css({
      height: 50,
      marginRight: 10,
    }),
  };
};
