import React, { Component } from 'react';
import NavBar from "./components/navbar";
import GithubLink from "./components/githubLink"
import Search from "./Search";
import Overall from "./Overall";
import {Switch, Route} from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";

class App extends Component {
  
  render() { 
    return (
      <React.Fragment>
        <NavBar/> 
        <div className="container">
          <Switch>
            <Route path="/" component={Search} exact />
            <Route path="/Chart" component={Overall}/>
          </Switch>
          <GithubLink/>
        </div>
      </React.Fragment>
      );
  }
}
 
export default App;