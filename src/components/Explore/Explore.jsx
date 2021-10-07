import React, { useState, useEffect, useRef, useReducer } from 'react';
import {
  makeStyles,
  Grid,
  Typography,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button
} from '@material-ui/core';
import { Rating, Pagination } from '@material-ui/lab';
import clsx from 'clsx';
import BookLibrary from 'common/bookUtil';
import { BookCard } from '../Home/BookShowCase';
import { useLocation } from 'react-router';
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '2rem',
    height: '100%'
  },
  filters: {
    border: '2px solid #c4c4c4',
    borderRadius: '1rem',
    background: '#fafafa'
  },
  filterItem: {
    '& > :first-child': {
      marginBottom: '0.75rem'
    }
  },
  typographyBottomReset: {
    marginBottom: 0
  },
  ratingSelect: {
    display: 'flex',
    alignItems: 'center',
    gap: 4
  },
  rangeColorSecondary: {
    color: '#FF7A7C'
  },
  customThumb: {
    height: 12,
    width: 12
  },
  customTrack: {
    height: 3
  },
  priceDisplay: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between'
  },
  checkBox: {
    color: '#C4C4C4'
  },
  formControl: {
    '& > .MuiCheckbox-colorSecondary.Mui-checked': {
      color: '#FF7A7C'
    }
  },
  apply: {
    color: theme.palette.secondary.contrastText
  },
  bookDisplay: {
    marginLeft: '4rem'
  }
}));

const STATE_ACTIONS = {
  RATING: 'rating',
  PRICE: 'range',
  GENRE_CHECKED: 'genreChecked',
  BOOKS: 'books',
  PAGE: 'currentPage'
};

const GenreChecklist = ({ genreChecked, dispatch }) => {
  const classes = useStyles();
  const handleChange = (event) => {
    const { name, checked } = event.target;
    dispatch({
      type: STATE_ACTIONS.GENRE_CHECKED,
      payload: {
        ...genreChecked,
        [name]: checked
      }
    });
  };
  return (
    <FormGroup>
      {Object.keys(genreChecked).map((genre) => (
        <FormControlLabel
          control={
            <Checkbox
              checked={genreChecked[genre]}
              onChange={handleChange}
              name={genre}
              className={classes.checkBox}
              classes={{
                checked: classes.checkBoxChecked
              }}
            />
          }
          label={genre}
          className={classes.formControl}
        />
      ))}
    </FormGroup>
  );
};
const reducer = (state, action) => {
  const { type, payload } = action;
  let updatedState = {
    ...state,
    [type]: payload
  };
  return updatedState;
};
const Explore = () => {
  const classes = useStyles();
  const library = new BookLibrary();
  const initialState = {
    rating: 3.5,
    range: [0, 1500],
    genreChecked: {},
    books: [],
    currentPage: 1
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [allBooks, setAllBooks] = useState([]);
  const pageSize = 16;
  const params = new URLSearchParams(useLocation().search);
  let query = [];
  if (params.has('genres')) {
    query = params.getAll('genres');
  }

  useEffect(() => {
    library.getCoreGenres((coreGenres) => {
      let checkedGenre = {};
      coreGenres.forEach(
        (genre) => (checkedGenre[genre] = query.includes(genre))
      );
      dispatch({
        type: STATE_ACTIONS.GENRE_CHECKED,
        payload: checkedGenre
      });
      const filters = getFilters(checkedGenre);
      library.getBooksByFilter((books) => {
        setAllBooks(books);
      }, filters);
    });
  }, []);
  useEffect(() => {
    dispatch({
      type: STATE_ACTIONS.BOOKS,
      payload: allBooks.slice(0, pageSize)
    });
    dispatch({
      type: STATE_ACTIONS.PAGE,
      payload: 1
    });
  }, [allBooks]);
  useEffect(() => {
    const startOffset = state.currentPage * pageSize;
    dispatch({
      type: STATE_ACTIONS.BOOKS,
      payload: allBooks.slice(startOffset, startOffset + pageSize)
    });
  }, [state.currentPage]);
  const handleRatingChange = (e, newRating) => {
    dispatch({
      type: STATE_ACTIONS.RATING,
      payload: newRating
    });
  };
  const handlePageChange = (e, newPage) => {
    dispatch({
      type: STATE_ACTIONS.PAGE,
      payload: newPage
    });
  };
  const getFilters = (localGenreChecked) => {
    let filters = [];
    Object.keys(localGenreChecked).forEach((genre) => {
      if (localGenreChecked[genre]) {
        filters.push(['genres', genre]);
      }
    });
    const [minPrice, maxPrice] = state.range;
    filters.push(['minPrice', minPrice]);
    filters.push(['maxPrice', maxPrice]);
    filters.push(['minRating', state.rating]);
    if (params.has('bookKeyword')) {
      filters.push(['bookKeyword', params.get('bookKeyword')]);
    }
    return filters;
  };

  const handleFilter = () => {
    const filters = getFilters(state.genreChecked);
    library.getBooksByFilter((books) => {
      setAllBooks(books);
    }, filters);
  };
  return (
    <Grid container className={classes.root}>
      <Grid item xs={1}></Grid>
      <Grid
        item
        container
        xs={2}
        className={classes.filters}
        direction="column"
        spacing={5}
      >
        <Grid item className={classes.filterItem}>
          <Typography variant="h6">Rating</Typography>
          <div className={classes.ratingSelect}>
            <Rating
              value={state.rating}
              precision={0.5}
              onChange={handleRatingChange}
            />
            <Typography variant="subtitle2">& up</Typography>
          </div>
        </Grid>
        <Grid item className={clsx(classes.filterItem)}>
          <Typography variant="h6">Price</Typography>
          <Slider
            value={state.range}
            onChange={(e, v) =>
              dispatch({
                type: STATE_ACTIONS.PRICE,
                payload: v
              })
            }
            min={0}
            max={1500}
            color="secondary"
            classes={{
              colorSecondary: classes.rangeColorSecondary,
              thumb: classes.customThumb,
              rail: classes.customTrack,
              track: classes.customTrack
            }}
            className={classes.rangeSlider}
          />
          <div className={classes.priceDisplay}>
            <Typography variant="subtitle2">₹{state.range[0]}</Typography>
            <Typography variant="subtitle2">₹{state.range[1]}</Typography>
          </div>
        </Grid>
        <Grid item className={classes.filterItem}>
          <Typography variant="h6">Genres</Typography>
          <GenreChecklist
            genreChecked={state.genreChecked}
            dispatch={dispatch}
          />
        </Grid>
        <Grid item className={classes.filterItem}>
          <Button color="secondary" variant="contained">
            <Typography
              variant="subtitle1"
              className={classes.apply}
              onClick={handleFilter}
            >
              Apply
            </Typography>
          </Button>
        </Grid>
      </Grid>
      <Grid item container xs={8} className={classes.bookDisplay} spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4">Explore</Typography>
        </Grid>
        {state.books?.map(({ bookId, bookCover }) => (
          <Grid item xs={3}>
            <BookCard bookId={bookId} bookCover={bookCover} />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Pagination
            count={Math.floor(allBooks.length / pageSize)}
            variant="outlined"
            color="secondary"
            page={state.page}
            onChange={handlePageChange}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Explore;
