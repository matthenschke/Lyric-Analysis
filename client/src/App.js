import React, {Component} from 'react';
import './App.css';

// importing react router dom and its components
import { BrowserRouter, Switch, Route } from "react-router-dom";

// importing react components
import Home from "./Containers/Home";
import Analysis from "./Containers/Analysis";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      // songs : [],
      // // selectedSong : 'hio',
      // analysis : {},
    }
  }
  render(){
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/analysis/:songID" component = {Analysis} />
        </Switch>
      </BrowserRouter>
  );
}
}
export default App;
