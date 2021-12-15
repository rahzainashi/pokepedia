import { BrowserRouter, Switch, Route } from "react-router-dom";

//pages
import Home from "./Pages/Home";
import MyPokemonList from "./Pages/MyPokemonList";
import PokemonDetail from "./Pages/PokemonDetail";
import PokemonCatch from "./Pages/PokemonCatch";

//graphql Related Import
import { ApolloProvider } from "@apollo/client";
import { client } from "./GraphQL/client";
import NavigationBar from "./Components/NavigationBar";

import ScrollToTop from "./Components/scrollToTop";
import { ThemeProvider } from "./util/ThemeManager";

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <BrowserRouter>
          <ScrollToTop>
            <NavigationBar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/pokemon-details" component={PokemonDetail} />
              <Route exact path="/my-pokemon" component={MyPokemonList} />
              <Route exact path="/catching-pokemon" component={PokemonCatch} />
            </Switch>
          </ScrollToTop>
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
