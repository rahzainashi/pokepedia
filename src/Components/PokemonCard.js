/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import React, { useContext } from "react";
import pokeball from "../assets/pokeball.png";
import { ThemeContext } from "../util/ThemeManager";
import { db } from "../config/db";
import PokeballButton from "../Components/PokeballButton";
import { useHistory } from "react-router-dom";

// import { css, useTheme, jsx } from "@emotion/react"

function PokemonCard({
  name,
  imageUrl,
  isOwned,
  ownedNum,
  pokemonId,
  primaryKey,
  onClick = () => {},
}) {
  const history = useHistory();
  const { theme } = useContext(ThemeContext);
  const styles = useStyle(theme);

  function deleteOnClick(e) {
    e.stopPropagation()
    db.pokemons.delete(primaryKey);
  

  }
  return (
    <div onClick={onClick} css={styles.card}>
      <div css={styles.cardHeader}>
        <img alt="pokeball" src={pokeball} css={styles.pokeballImage} />
        <span css={css({ marginLeft: "auto", marginRight: 10 })}>
          No. {pokemonId.toString().padStart(3, 0)}
        </span>
      </div>
      <img alt="Pokemon" src={imageUrl} />
      <span>{name}</span>
      {/* <div>
        <span>{isOwned}</span>
      </div> */}

      {isOwned ? (
        <button
          onClick={deleteOnClick}
          css={styles.releaseContainer}
        >
          Release
        </button>
      ) : (
        <div css={styles.ownedContainer}>Owned: {ownedNum}</div>
      )}
    </div>
  );
}

export default PokemonCard;

const useStyle = (theme) => {
  return {
    pokeballImage: css({
      height: 24,
      width: 24,
      // marginRight: 5
    }),

    card: css({
      display: "flex",
      flexDirection: "column",
      // backgroundColor: "#afc7f5",
      background: theme.cardBackgroundColor,
      width: "30%",
      margin: 4,
      textAlign: "center",
      maxWidth: 130,
      borderRadius: 10,
      paddingBottom: 10,
      "&:hover": {
        transform: "matrix(1,0,0,1,0,2)",
        transition: ".40s ease",
      },
      boxShadow: theme.shadowColor,
      color: theme.color,
      cursor: "pointer",
    }),

    cardHeader: css({
      // backgroundColor: "#fac833",#ffdd78
      background: "linear-gradient(to bottom right,#e36c04,#ffdd78);",

      display: "flex",
      padding: 5,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      color: "black",
    }),
    ownedContainer: css({
      display: "inline-block",
      padding: 5,
      margin: 10,
      background: "linear-gradient(to bottom right,#e36c04,#ffdd78);",
      borderRadius: 10,
      textAlign: "center",
      marginBottom: 0,
      color: "black",
    }),
    releaseContainer:css({
      display: "inline-block",
      padding: 5,
      margin: 10,
      background: "red",
      borderRadius: 10,
      textAlign: "center",
      marginBottom: 0,
      color: "white",
      zIndex:100
    })
  }
};
