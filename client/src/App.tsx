import React from "react";
import "./App.css";

// importing react router dom and its components
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// importing react components
import Home from "./components/Home";
import SongAnalysis from "./components/SongAnalysis";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/analysis/:songID" component={SongAnalysis} />
      </Switch>
    </Router>
  );
};
export default App;
