import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent
} from '@material-ui/core';
import BookLibrary from 'common/bookUtil';
import media from '../../media';

const library = new BookLibrary();
const getFileName = (name) => {
  name = name.split(/[-/\s]/g);
  name = name.map((word) => `${word[0].toUpperCase()}${word.slice(1)}`);
  return name.join('');
};
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '10rem'
  },
  genreCard: {
    height: 250,
    cursor: 'pointer',
    position: 'relative',
    '& > *': {
      transitionDuration: '0.5s'
    },
    '& > :last-child': {
      position: 'absolute',
      top: '42.5%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      color: 'white',
      fontSize: '25px',
      padding: 0,
      opacity: 0,
      pointerEvents: 'none'
    },
    '&:hover': {
      '& > :last-child': {
        opacity: 1
      }
    }
  },
  media: {
    height: '100%',
    width: '100%',
    '&:hover': {
      boxShadow: 'inset 0 0 0 1000px rgb(0 0 0 / 50%)'
    }
  },
  browseGenres: {
    cursor: 'pointer',
    '&:hover': {
      color: '#2f70c4'
    }
  }
}));

const BrowseGenres = () => {
  const [genres, setGenres] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    library.getCoreGenres((coreGenres) => {
      setGenres(coreGenres);
      console.log(coreGenres);
      coreGenres.forEach((genre) => console.log(getFileName(genre)));
    });
  }, []);
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={1} />
        <Grid item container xs={11} spacing={4} justifyContent="center">
          <Grid item xs={12} spacing={4}>
            <Typography variant="h4" className={classes.browseGenres}>
              Browse Genres
            </Typography>
          </Grid>
          {genres.map((genre) => (
            <Grid item xs={12} sm={6} md={3} data-aos="fade-up">
              <Card elevation={3} className={classes.genreCard}>
                <CardMedia
                  className={classes.media}
                  image={media[getFileName(genre)]}
                />
                <CardContent>{genre}</CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default BrowseGenres;
