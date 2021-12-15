/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useQuery } from "@apollo/client";
import React, { useContext, useState } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";

import { POKEMONS } from "../GraphQL/pokemon";

import PokemonCard from "../Components/PokemonCard";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Loader from "react-loader-spinner";
import { db } from "../config/db";
import { useLiveQuery } from "dexie-react-hooks";
import { ThemeContext } from "../util/ThemeManager";

const Home = () => {
  const {theme} = useContext(ThemeContext)
  const browserHistory = useHistory();
  const styles = useStyle();
  const [offset, setOffset] = useState(0);
  const [pokemons, setPokemons] = useState([]);

  const myPokemons = useLiveQuery(() => db.pokemons.toArray());

  let myPokemonCount = {};

  myPokemons?.forEach((item, index) => {
    if (myPokemonCount[item.name]) {
      myPokemonCount[item.name] += 1;
    } else {
      myPokemonCount[item.name] = 1;
    }
  });

  const fetchLimit = 36;
  const { fetchMore } = useQuery(POKEMONS, {
    variables: {
      limit: fetchLimit,
      offset: offset,
    },

    onCompleted: (data) => {
      setPokemons((pokemons) => [
        ...pokemons,
        ...(data?.pokemons.results || []),
      ]);
    },
    
    fetchPolicy: "cache-first",
  });

  useBottomScrollListener(() => {
    console.log("you reached the bottom");
    fetchMore({
      variables: {
        limit: fetchLimit,
        offset: offset + fetchLimit,
      },
    });

    setOffset(offset + fetchLimit);
  });

  return (
    <div
      css={css({
        background: theme.backgroundColor,
        minHeight: "100vh",
      })}
    >
      <div css={styles.container}>
        {pokemons.map((pokemon, index) => (
          <PokemonCard
            key={index}
            name={pokemon.name}
            imageUrl={pokemon.image}
            isOwned={false}
            ownedNum={myPokemonCount[pokemon.name] || 0}
            pokemonId={pokemon.id}
            onClick={function click() {
              return browserHistory.push({
                pathname: "/pokemon-details",
                state: {
                  name: pokemon.name,
                  url: pokemon.image,
                  pokemonId: pokemon.id,
                  isCatch: true,
                },
              });
            }}
          />
        ))}
        <Loader type="TailSpin" color="#00BFFF" height={20} width={20} />
      </div>
    </div>
  );
};

export default Home;

const useStyle = () => {
  return {
    container: css({
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    }),
  };
};
