/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import React, { useContext } from "react";
import { db } from "../config/db";
import PokemonCard from "../Components/PokemonCard";
import { useLiveQuery } from "dexie-react-hooks";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import pokeballClose from "../assets/pokeballSpriteClose.png";
import { ThemeContext } from "../util/ThemeManager";

function MyPokemonList() {
  const history = useHistory();
  const { theme } = useContext(ThemeContext);
  const styles = useStyle();
  const pokemons = useLiveQuery(() => db.pokemons.toArray());

  return (
    <div
      css={css({
        background: theme.backgroundColor,
        minHeight: "100vh",
        color: theme.color,
      })}
    >
      {pokemons?.length ? (
        <div>
          <div css={styles.container}>
            {pokemons?.map((pokemon, index) => (
              <PokemonCard
                key={index}
                name={pokemon.nickname}
                imageUrl={pokemon.image}
                isOwned={true}
                displayNum={false}
                pokemonId={pokemon.pokemonId}
                primaryKey={pokemon.id}
                onClick={function click() {
                  return history.push({
                    pathname: "/pokemon-details",
                    state: {
                      name: pokemon.name,
                      nickname: pokemon.nickname,

                      url: pokemon.image,
                      pokemonId: pokemon.pokemonId,
                      isCatch: false,
                      primaryKey: pokemon.id,
                    },
                  });
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        <div
          css={css({
            position: "absolute",
            top: "45%",
            left: "50%",
            transform: "translateX(-50%) translateY(-50%)",
            textAlign: "center",
          })}
        >
          <img css={styles.wobble} src={pokeballClose}></img>
          <h3>You have no pokemon right now</h3>
        </div>
      )}
    </div>
  );
}

export default MyPokemonList;

const useStyle = () => {
  return {
    container: css({
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    }),
    wobble: css({
      height: 200,
      animation: `${Wobble} 1s 4`,
    }),
  };
};

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
