/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { POKEMON } from "../GraphQL/pokemon";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import DetailListContent from "../Components/DetailListContent";
import DetailHeaderContent from "../Components/DetailHeaderContent";
import PokeballButton from "../Components/PokeballButton";
import { db } from "../config/db";
import { ThemeContext } from "../util/ThemeManager";

const PokemonDetail = (props) => {
  const {theme} = useContext(ThemeContext)
  const styles = useStyle();
  const history = useHistory();
  if (!props.location.state) {
    history.push({
      pathname: "/",
    });
  }
  const [pokemonDetail, setPokemonDetail] = useState();

  // const { loading, error, data } = 
  useQuery(POKEMON, {
    variables: {
      name: props.location.state?.name,
    },
    // onCompleted: setPokemons((pokemons) => [...pokemons, data.pokemons.results]),
    onCompleted: (data) => setPokemonDetail(data.pokemon),
  });

  return (
    <div
      css={css({
        background: theme.backgroundColor,
        minHeight: "100vh",
        color: theme.color
      })}
    >
      
      <div css={styles.container}>
        <DetailHeaderContent
          name={props.location.state.nickname || props.location.state.name}
          imageURL={props.location.state.url}
        />
        <DetailListContent
          title={"Types"}
          detailList={pokemonDetail?.types.map((item) => item.type.name)}
        />
        <DetailListContent
          title={"Abilities"}
          detailList={pokemonDetail?.abilities.map((item) => item.ability.name)}
        />
        <DetailListContent
          title={"Moves"}
          detailList={pokemonDetail?.moves.map((item) => item.move.name)}
        />
        <PokeballButton
          isCatch={props.location.state.isCatch}
          onClick={
            props.location.state.isCatch
              ? function clicked() {
                  return history.push({
                    pathname: "/catching-pokemon",
                    state: props.location.state,
                  });
                }
              : function release() {
                  db.pokemons.delete(props.location.state.primaryKey);
                  return history.push({
                    pathname: "/",
                  });
                }
          }
        />
      </div>
    </div>
  );
};
//moves ..abilitioes ..types
export default PokemonDetail;

const useStyle = () => {
  return {
    container: css({
      textAlign: "center",
    }),
  };
};
