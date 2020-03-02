import React from "react";
import "./App.css";

// importing react router dom and its components
import { HashRouter, Switch, Route } from "react-router-dom";

// importing react components
import Home from "./components/Home";
import SongAnalysis from "./components/SongAnalysis";

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/analysis/:songID" component={SongAnalysis} />
      </Switch>
    </HashRouter>
  );
}
export default App;
