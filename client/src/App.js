import React from "react";
import "./App.css";

// importing react router dom and its components
import { HashRouter, Switch, Route } from "react-router-dom";

// importing react components
import Home from "./Containers/Home";
import Analysis from "./Containers/Analysis";

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/analysis/:songID" component={Analysis} />
      </Switch>
    </HashRouter>
  );
}
export default App;
