import React, { useState, useEffect } from 'react';
import useAuth from 'customHooks/useAuth';
import { Link, useHistory } from 'react-router-dom';
import { Grid, makeStyles, Typography, Button } from '@material-ui/core';
import Hero from './Hero';
import BrowseGenres from './BrowseGenres';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  heroGrid: {
    marginTop: '2rem'
  },
  heroGridItem: {
    textAlign: 'center',
    alignItems: 'center'
  },
  heroImage: {
    maxHeight: '350px'
  },
  subtitleStyle: {
    textAlign: 'justify',
    opacity: 0.8,
    fontStyle: 'italic'
  }
}));

const HomePage = () => {
  const auth = useAuth();
  const history = useHistory();
  const classes = useStyles();
  const onLogout = () => {
    auth.logout(() => {
      history.push('/login');
    });
  };
  return (
    <div>
      <Hero />
      <BrowseGenres />
    </div>
  );
};

export default HomePage;
