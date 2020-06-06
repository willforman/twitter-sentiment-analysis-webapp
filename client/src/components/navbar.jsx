import React, { Component } from 'react';
import {Link} from "react-router-dom";
import M from "materialize-css";

export default class NavBar extends Component {
  componentDidMount() {
    M.AutoInit();
  }  
  
  render() { 
        return ( 
          <nav>
            <div className="nav-wrapper blue">
              <span className="brand-logo right">Sentiment Analysis</span>
              <a href="" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
              <ul id="nav-mobile" className="left hide-on-med-and-down">
                <li className="waves-effect"><Link to ="/">Search</Link></li>
                <li className="waves-effect"><Link to ="/chart">Chart</Link></li>
              </ul>
            </div>

            <ul className="sidenav sidenav-close" id="mobile-demo">
              <li><Link to ="/">Search</Link></li>
              <li><Link to ="/chart">Chart</Link></li>
            </ul>
          </nav>
        );
    }
}