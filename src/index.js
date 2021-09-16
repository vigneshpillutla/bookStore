import './stylesheets/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import ProvideAuth from 'components/ProvideAuth';
import { ThemeProvider } from '@material-ui/core';
import LightTheme from './theme/LightTheme.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={LightTheme}>
      <ProvideAuth>
        <Router>
          <Switch>
            <Route path="/" component={App} />
          </Switch>
        </Router>
      </ProvideAuth>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
