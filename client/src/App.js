import * as React from "react";
// import { PodCentralProvider } from "./utils/GlobalState";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// import Auth from "./utils/auth";

import GlobalAppBar from "./components/GlobalAppBar";

import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Episodes from "./pages/Episodes";
// import Signup from "./pages/Signup";
// import Profile from "./pages/Profile";
// import Publish from "./pages/Publish";

// const httpLink = createHttpLink({
//   uri: "/graphql",
// });
// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem("id_token");
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

document.body.style = "background-color: #f0eeeb";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: [
        "Oswald",
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
      ].join(","),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApolloProvider client={client}>
        <Router>
          <GlobalAppBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/episodes" component={Episodes} />
            <Route exact path="/admin" component={Login} />
            {/* <Route exact path="/signup" component={Signup} /> */}
            {/* {Auth.loggedIn() ? (
                <Route exact path="/publish" component={Publish} />
              ) : (
                <Redirect to="/login" />
              )} */}
            {/* <Route exact path="/profile" component={Profile} /> */}
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
