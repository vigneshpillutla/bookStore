import React, { useState, useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useAuth from 'customHooks/useAuth';
import { Link, useHistory } from 'react-router-dom';
import { Grid, makeStyles, Typography, Button } from '@material-ui/core';
import Hero from './Hero';
import BrowseGenres from './BrowseGenres';
import BookShowCase from './BookShowCase';
import BookLibrary from 'common/bookUtil';

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
  const library = new BookLibrary();
  const [data, setData] = useState([]);
  const bookShowCases = [
    {
      title: "Editor's Choice",
      getData: library.getEditorsChoice
    },
    {
      title: 'All Time Classics',
      getData: library.getBooksByFilter,
      filters: [
        ['genres', 'Classic'],
        ['genres', 'Harvard Classics']
      ]
    },
    {
      title: 'Young Readers',
      getData: library.getBooksByFilter,
      filters: [['genres', 'Young Readers']]
    }
  ];
  useEffect(() => {
    library.getEditorsChoice((books) => setData(books));
  }, []);
  return (
    <div>
      <Hero />
      <BrowseGenres />
      {bookShowCases.map((showCase) => (
        <BookShowCase {...showCase} />
      ))}
      <div>hey</div>
    </div>
  );
};

export default HomePage;
