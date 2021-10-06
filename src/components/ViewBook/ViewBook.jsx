import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import BookLibrary from 'common/bookUtil';
import BookShowCase from 'components/Home/BookShowCase';
import {
  makeStyles,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Backdrop,
  CircularProgress
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '3.5em'
  },
  coverContainer: {
    display: 'flex',
    '& > img': {
      width: 200,
      height: 300
    }
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  details: {
    textAlign: 'center',
    color: 'rgba(0,0,0,0.65)'
  },
  bookTitle: {
    fontStyle: 'italic',
    color: 'rgba(0,0,0,0.7)'
  },
  bookExcerpt: {
    color: 'rgba(0,0,0,0.7)'
  },
  moreLikeThis: {
    textAlign: 'center',
    marginTop: '4rem'
  }
}));
const ViewBook = () => {
  const library = new BookLibrary();
  const { bookId } = useParams();
  const [book, setBook] = useState({});
  const [filters, setFilters] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    library.getSingleBook(bookId, (bookData) => {
      setBook(bookData);
      const filters = bookData.genres?.map((genre) => ['genres', genre]);
      setFilters(filters);
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [bookId]);
  const Description = () => {
    const { description } = book;

    const GridItem = (
      <Grid item xs={12}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Description
            </Typography>
            <Typography variant="body2" component="p">
              <i>{book.description}</i>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );

    return !!description ? GridItem : null;
  };
  const Excerpt = () => {
    const { excerpt } = book;

    const GridItem = (
      <Grid item xs={12}>
        <Card elevation={3}>
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
              className={classes.bookExcerpt}
            >
              Book Excerpt
            </Typography>
            <Typography variant="body2" component="p">
              {book.excerpt}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );

    return !!excerpt ? GridItem : null;
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={1}></Grid>
        <Grid item container xs={10}>
          <Grid item container xs={4} spacing={4}>
            <Grid
              item
              xs={12}
              className={classes.coverContainer}
              justifyContent="center"
            >
              <img src={book.bookCover} alt="bookCover" />
            </Grid>
            <Grid item xs={12} className={classes.details}>
              <Typography>Pages: {book.pages}</Typography>
              <Typography>Rating: {book.rating} / 5</Typography>
            </Grid>
            <Grid item xs={12} className={classes.actions}>
              <Button variant="outlined" color="secondary">
                Add to cart
              </Button>
              <Button variant="outlined" color="secondary">
                Read Now
              </Button>
            </Grid>
          </Grid>
          <Grid item container xs={8} spacing={4}>
            <Grid item className={classes.title} xs={12}>
              <Typography variant="h4">{book.name}</Typography>
              <Typography variant="subtitle1" className={classes.bookTitle}>
                by {book.author}
              </Typography>
            </Grid>
            <Description />
            <Excerpt />
          </Grid>
          <Grid item xs={12} className={classes.moreLikeThis}>
            <Typography variant="h4">MORE LIKE THIS</Typography>
            <BookShowCase
              getData={library.getBooksByFilter}
              filters={filters}
              ignoreId={book.bookId}
            />
          </Grid>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </div>
  );
};

export default ViewBook;
