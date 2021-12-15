/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../config/db";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useLiveQuery } from "dexie-react-hooks";
import Explotion from "react-explode/Explosion10";
import pokeballClose from "../assets/pokeballSpriteClose.png";
import pikachuHappy from "../assets/pikachuHappy.png";
import pikachuSpeachless from "../assets/pikachuSpeachless.png";
import { ThemeContext } from "../util/ThemeManager";

function PokemonCatch(props) {
  //array.filter(function(currentValue, index, arr), thisValue)
  const browserHistory = useHistory();
  const [nickname, setNickname] = useState("");
  const [isShown, setIsShown] = useState(false);
  const [explotion, setExplotion] = useState(true);


  const [catched, setCatched] = useState(false);
  const {theme} = useContext(ThemeContext)
  const styles = useStyle(theme);
  const pokemons = useLiveQuery(() => db.pokemons.toArray());

  useEffect(() => {
    setTimeout(() => {
      setIsShown(true);
      setCatched(Math.random() < 0.5);

      setTimeout(() => {
        setExplotion(false)
      }, 1500);
    }, 4000);
  }, []);

  let myPokemonCount = {};
  pokemons?.forEach((item, index) => {
    if (myPokemonCount[item.nickname]) {
      myPokemonCount[item.nickname] += 1;
    } else {
      myPokemonCount[item.nickname] = 1;
    }
  });

  let pokemon = props.location.state;
  async function addPokemon(name, nickname, image, pokemonId) {
    // let arr = pokemons.filter((item) => item.nickname === nickname);
    if (!myPokemonCount[nickname] && nickname.length !== 0) {
      try {
        // Add the new friend!
        const id = await db.pokemons.add({
          name,
          nickname,
          image,
          pokemonId,
        });

        console.log(`Friend ${name} successfully added. Got id ${id}`);
        browserHistory.push({ pathname: "/" });
      } catch (error) {
        console.log(`Failed to add ${name}: ${error}`);
      }
    } else {
      console.log("bruh change the nickname");
    }
  }

  function catchOnClick() {
    if (catched) {
      addPokemon(pokemon.name, nickname, pokemon.url, pokemon.pokemonId);
    } else {
      browserHistory.push({ pathname: "/" });
    }
  }

  return (
    <div
      css={css({
        background: theme.backgroundColor,
        minHeight: "100vh",
        color: theme.color
      })}
    >
      <div css={styles.container}>
        <div
          css={css({ position: "fixed", left: "50%", marginLeft: "-200px" })}
        ></div>

        <div
          css={css({
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translateX(-50%) translateY(-50%)",
          })}
        >
          {isShown ? (
            <div css={css({ textAlign: "center" })}>
              <h2>{catched ? "Pokemon Catched!! " : "Pokemon Escaped..."}</h2>
              <img
                css={css({ width: 200, display: "block" })}
                src={catched ? pikachuHappy : pikachuSpeachless}
              />
              {catched && (
                <input
                  css={styles.input}
                  type="text"
                  placeholder="Nickname..."
                  onChange={(event) => {
                    // setPokemonNickname(event.target.value);
                    setNickname(event.target.value);

                    if (!myPokemonCount[event.target.value]) {
                      styles.inputMessage = css({
                        color: "red",
                        display: "none",
                      });
                    } else {
                      styles.inputMessage = css({
                        color: "red",
                        display: "block",
                      });
                    }
                  }}
                />
              )}
              {myPokemonCount[nickname] && (
                <label css={styles.inputMessage}>
                  Given nickname already exist.
                </label>
              )}
              {/* <button css={css({ display: "block" })}>submit</button> */}
              <div css={styles.backToHomeButton} onClick={catchOnClick}>
                {catched ? (
                  <span>Submit and Back to Home</span>
                ) : (
                  <span>Back to Home</span>
                )}
              </div>

              <div
                css={css({
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translateX(-50%) translateY(-50%)",
                })}
              >
                {explotion && <Explotion size="400"  repeat={0} />
}              </div>
            </div>
          ) : (
            <img css={styles.wobble} src={pokeballClose}></img>
          )}
        </div>
      </div>
    </div>
  );
}

export default PokemonCatch;

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

const useStyle = (theme) => {
  return {
    inputMessage: css({
      display: "block",
      color: "red",
    }),
    container: css({
      textAlign: "center",
    }),
    wobble: css({
      height: 200,
      animation: `${Wobble} 1s 4`,
    }),
    backToHomeButton: css({
      background: "#e36c04",
      borderRadius: 50,
      padding: 5,
      maxWidth: 250,
      cursor: "pointer",
    }),
    input: css({
      paddingLeft: 10,
      paddingRight: 10,
      height: 40,
      fontSize: 13,
      borderRadius: 50,
      marginBottom: 5,
    }),
  };
};
