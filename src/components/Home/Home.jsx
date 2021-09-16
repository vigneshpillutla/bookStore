import React, { useState, useEffect } from 'react';
import useAuth from 'customHooks/useAuth';
import { Link, useHistory } from 'react-router-dom';
import { Grid, makeStyles, Typography, Button } from '@material-ui/core';
import BookReader from '../../media/bookReader1.svg';
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
      <Grid container className={classes.heroGrid}>
        <Grid item xs={1} md={2}></Grid>
        <Grid
          container
          item
          xs={10}
          md={10}
          classes={{ item: classes.heroGridItem }}
        >
          <Grid item container sm={12} md={6} direction="column" spacing={5}>
            <Grid item data-aos="fade-right">
              <Typography variant="h2">Find your book</Typography>
              <Typography variant="h2">& lose yourself</Typography>
              <Typography
                variant="subtitle1"
                component="p"
                className={classes.subtitleStyle}
              >
                Read all your favourite fan fictions, romance novels or your
                academic books. Pen down your creative ideas all in here.
              </Typography>
            </Grid>
            <Grid item data-aos="fade-right">
              <Button variant="contained" color="secondary" size="large">
                Explore
              </Button>
            </Grid>
          </Grid>
          <Grid item sm={12} md={6} data-aos="fade-left">
            <img className={classes.heroImage} src={BookReader} alt="" />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
