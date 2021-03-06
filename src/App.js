import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {NavbarComponent} from "./components";
import {Home,Success} from "./pages";

export default class App extends Component {
  render() {
    return (
      <Router>
          <NavbarComponent/>
          <main>
            <Switch>
              <Route path="/" component={Home} exact/>
              <Route path="/sukses" component={Success} exact/>
            </Switch>
          </main>
      </Router>
    )
  }
}
