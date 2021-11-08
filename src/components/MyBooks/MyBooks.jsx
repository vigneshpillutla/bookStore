import useAuth from 'customHooks/useAuth';
import React, { useEffect, useState } from 'react';
import BookDisplay from 'components/BookDisplay/BookDisplay';
import { Grid, makeStyles } from '@material-ui/core';
import BookLibrary from 'common/bookUtil';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '3rem'
  }
}));
function MyBooks() {
  const library = new BookLibrary();
  const {
    user: { myFavourites }
  } = useAuth();
  const [myBooksDetails, setMyBooksDetails] = useState([]);
  const [myFavouritesDetails, setMyFavouritesDetails] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    library.getMyBooksDetails((data) => {
      setMyBooksDetails(data.myBooksDetails);
    });

    library.getMyFavouritesDetails((data) => {
      setMyFavouritesDetails(data.myFavouritesDetails);
    });
  }, [JSON.stringify(myFavourites)]);
  const myBookHeading = `My Books (${myBooksDetails.length} books)`;
  const myFavouritesHeading = `My Favourites (${myFavouritesDetails.length} books)`;
  return (
    <Grid container className={classes.root}>
      <Grid item xs={1}></Grid>
      <Grid item container xs={10} spacing={3}>
        <Grid item xs={12}>
          <BookDisplay
            heading={myBookHeading}
            books={myBooksDetails}
            type="MY_BOOKS"
          />
        </Grid>
        <Grid item xs={12}>
          <BookDisplay
            heading={myFavouritesHeading}
            books={myFavouritesDetails}
            type="MY_FAVOURITES"
          />
        </Grid>
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
}

export default MyBooks;
