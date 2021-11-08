import React from 'react';
import {
  makeStyles,
  Grid,
  Paper,
  Card,
  Typography,
  Button
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import TrashCan from 'media/icons8-trash.svg';

import useAuth from 'customHooks/useAuth';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '3rem'
  },
  cartGrid: {
    padding: '0 2rem 0 4rem',
    maxWidth: '100%'
  },
  card: {
    padding: '1rem',
    height: 'fit-content'
  },
  cartHeading: {
    color: 'rgba(0,0,0,0.5)'
  },
  book: {
    padding: '1rem',
    height: 100,
    borderBottom: '2px solid rgba(0,0,0,0.5)'
  },
  items: {
    '& > div': {
      padding: '1rem',
      height: 'fit-content',
      borderBottom: '2px solid rgba(0,0,0,0.25)',
      display: 'flex',
      gap: '1rem'
    },
    '& > div:last-child': {
      borderBottom: 0
    }
  },
  bookThumbnail: {
    height: '10rem',
    cursor: 'pointer'
  },
  details: {
    position: 'relative',
    flexGrow: 1,
    '& > :last-child': {
      position: 'absolute',
      left: 0,
      bottom: 0
    },
    '&  img': {
      width: '2rem'
    }
  },
  checkout: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  creditInfo: {
    marginTop: '2rem',
    '& > form': {
      padding: '1rem'
    },
    '& label': {
      color: '#6b7c93',
      fontWeight: 300,
      letterSpacing: '0.025em'
    },
    '& .StripeElement': {
      margin: '0.5rem 0'
    }
  },
  actionContainer: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center'
  }
}));

// const PAGE_TYPES = {
//   CART:{
//     text:(items) => `Cart (${items.length} items)`,

//   }
// }

const Book = ({ book, type }) => {
  const classes = useStyles();
  const { removeFromCart, removeFromMyFavourites } = useAuth();
  const { bookId } = book;
  const handleRemoveFromCart = () => {
    removeFromCart(bookId);
  };

  const handleRemoveFromFavourites = () => {
    removeFromMyFavourites(bookId);
  };

  let actionButton = (
    <Button
      startIcon={<img src={TrashCan} alt="Trash Can" />}
      onClick={() => handleRemoveFromCart()}
      variant="outlined"
      color="secondary"
    >
      Remove From Cart
    </Button>
  );

  if (type === 'MY_BOOKS') {
    actionButton = (
      <Link to={`/books/read/${book.bookId}`}>
        <Button variant="contained" color="secondary">
          Read Now
        </Button>
      </Link>
    );
  }

  if (type === 'MY_FAVOURITES') {
    actionButton = (
      <div className={classes.actionContainer}>
        <Link to={`/books/read/${book.bookId}`}>
          <Button variant="contained" color="secondary">
            Read Now
          </Button>
        </Link>
        <Button
          startIcon={<img src={TrashCan} alt="Trash Can" />}
          variant="outlined"
          color="secondary"
          onClick={handleRemoveFromFavourites}
        >
          Remove From Favourites
        </Button>
      </div>
    );
  }
  return (
    <Grid item xs={12}>
      <Link to={`/books/view/${book.bookId}`}>
        <img src={book.bookCover} alt="" className={classes.bookThumbnail} />
      </Link>
      <div className={classes.details}>
        <Typography variant="h6">{book.name}</Typography>
        <Typography variant="body2">by {book.author}</Typography>
        {actionButton}
      </div>
      {type === 'CART' && (
        <div>
          <Typography variant="h6" color="secondary">
            ₹ {book.price}
          </Typography>
        </div>
      )}
    </Grid>
  );
};

export default function BookDisplay({ heading, books, type }) {
  const classes = useStyles();

  return (
    <Card elevation={3} className={classes.card}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.cartHeading}>
            {heading}
          </Typography>
        </Grid>
        <Grid item container className={classes.items}>
          {books?.map((book) => (
            <Book book={book} type={type} />
          ))}
        </Grid>
      </Grid>
    </Card>
  );
}
