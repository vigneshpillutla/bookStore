import React, { useState } from 'react';
import { Grid, makeStyles, Typography, Button } from '@material-ui/core';
import BookReader from '../../media/bookReader1.svg';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  heroGrid: {
    marginTop: '5rem'
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
const Hero = () => {
  const classes = useStyles();
  return (
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
              academic books. Pen down all your creative ideas in here.
            </Typography>
          </Grid>
          <Grid item data-aos="fade-right">
            <Link to="/explore">
              <Button variant="contained" color="secondary" size="large">
                Explore
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid item sm={12} md={6} data-aos="fade-left">
          <img className={classes.heroImage} src={BookReader} alt="" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Hero;
