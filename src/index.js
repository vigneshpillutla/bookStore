import './stylesheets/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import ProvideAuth from 'components/ProvideAuth';
import { ThemeProvider } from '@material-ui/core';
import LightTheme from './theme/LightTheme.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { GuestProvider } from './components/AuthModal/AuthModal.jsx';
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={LightTheme}>
      <ProvideAuth>
        <GuestProvider>
          <Router>
            <Switch>
              <Route path="/" component={App} />
            </Switch>
          </Router>
        </GuestProvider>
      </ProvideAuth>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
