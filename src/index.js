import "./stylesheets/index.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import ProvideAuth from "components/ProvideAuth";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <ProvideAuth>
      <Router>
        <Switch>
          <Route path='/' component={App} />
        </Switch>
      </Router>
    </ProvideAuth>
  </React.StrictMode>,
  document.getElementById("root")
);
