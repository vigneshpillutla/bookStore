import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  Grid,
  Paper,
  Card,
  Typography,
  Button
} from '@material-ui/core';
import clsx from 'clsx';
import useAuth from 'customHooks/useAuth';
import TrashCan from 'media/icons8-trash.svg';

const useStyles = makeStyles(() => ({
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
    height: '10rem'
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
  }
}));

const Book = ({ book }) => {
  const classes = useStyles();
  const { removeFromCart } = useAuth();
  const handleRemoveFromCart = (bookId) => {
    removeFromCart(bookId);
  };
  return (
    <Grid item xs={12}>
      <img src={book.bookCover} alt="" className={classes.bookThumbnail} />
      <div className={classes.details}>
        <Typography variant="h6">{book.name}</Typography>
        <Typography variant="body2">by {book.author}</Typography>
        <Button
          startIcon={<img src={TrashCan} alt="trash-can" />}
          onClick={() => handleRemoveFromCart(book.bookId)}
        >
          Remove
        </Button>
      </div>
      <div>
        <Typography variant="h6" color="secondary">
          ₹ {book.price}
        </Typography>
      </div>
    </Grid>
  );
};
const CartItems = ({ cartItems }) => {
  const classes = useStyles();

  return (
    <Card elevation={3} className={classes.card}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.cartHeading}>
            Cart ({cartItems.length} items)
          </Typography>
        </Grid>
        <Grid item container className={classes.items}>
          {cartItems.map((book) => (
            <Book book={book} />
          ))}
        </Grid>
      </Grid>
    </Card>
  );
};

const CheckoutCard = ({ cartItems }) => {
  const classes = useStyles();
  const price = cartItems?.reduce((price, book) => {
    return price + parseInt(book.price);
  }, 0);

  return (
    <Card elevation={3} className={clsx(classes.card, classes.checkout)}>
      <Typography variant="h6">Total:</Typography>
      <Typography variant="h3">₹ {price}</Typography>
      <Button variant="contained" color="secondary" fullWidth>
        Checkout
      </Button>
    </Card>
  );
};

const Cart = () => {
  const classes = useStyles();
  const [cartItems, setCartItems] = useState([]);
  const { getCartItems, cart } = useAuth();

  useEffect(() => {
    getCartItems((data) => {
      setCartItems(data.books);
    });
  }, [JSON.stringify(cart)]);
  return (
    <div className={classes.root}>
      <Grid container className={classes.cartGrid} spacing={3}>
        <Grid item xs={8}>
          <CartItems cartItems={cartItems} />
        </Grid>
        <Grid item xs={4}>
          <CheckoutCard cartItems={cartItems} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Cart;
