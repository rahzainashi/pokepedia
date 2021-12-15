/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import React from "react";
import pokeballOpen from "../assets/pokeballSpriteOpen.png";
import pokeballClose from "../assets/pokeballSpriteClose.png";

function PokeballButton({ isCatch, onClick = () => {} }) {
  const styles = useStyle();
  return (
    <div css={styles.pokeballButton} onClick={onClick}>
      <img
        alt="catch button logo"
        src={isCatch ? pokeballClose : pokeballOpen}
        css={styles.pokeball}
      />
      <label>{isCatch ? "catch" : "release"}</label>
    </div>
  );
}

export default PokeballButton;

const Wobble = keyframes`25% {
  transform: rotate(15deg);
}
50% {
  transform: rotate(-30deg);
}
75% {
  transform: rotate(5deg);
}
100% {
  transform: rotate(0deg);
}`;

const useStyle = () => {
  return {
    pokeballButton: css({
      bottom: 10,
      background: "rgb(255,255,255,0.6);",
      position: "fixed",
      left: "50%",
      marginLeft: "-30px",
      display: "flex",
      flexDirection: "column",
      padding: 10,
      borderRadius: 20,cursor: "pointer",
    }),
    pokeball: css({
      width: 50,  
          animation: `${Wobble} 1s 1`,

    }),

    
  };
};
