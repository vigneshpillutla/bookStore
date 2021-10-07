import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import {
  makeStyles,
  Card,
  CardMedia,
  Grid,
  Typography,
  CardContent,
  Button
} from '@material-ui/core';
import { ArrowForwardIos, ArrowBackIos } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '5rem',
    marginBottom: '5rem'
  },
  cardStyle: {
    height: '100%',
    width: '70%',
    background: 'gray',
    marginRight: '20px',
    position: 'relative',
    cursor: 'pointer',
    '& > *': {
      transitionDuration: '0.3s'
    },
    '&:hover': {
      '& > :last-child': {
        opacity: 1
      }
    }
  },
  cardContainer: {
    width: 200,
    height: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  arrowStyle: {
    color: '#000',
    '&:hover': {
      color: 'gray'
    }
  },
  media: {
    height: '100%'
  },
  cardContent: {
    position: 'absolute',
    width: '100%',
    top: 0,
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.5)',
    opacity: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    '& > button': {
      whiteSpace: 'nowrap'
    }
  },
  title: {
    cursor: 'pointer',
    '&:hover': {
      color: '#2f70c4'
    }
  }
}));
export const BookCard = ({ bookCover, bookId }) => {
  const classes = useStyles();

  return (
    <div className={classes.cardContainer}>
      <Card elevation={3} className={classes.cardStyle}>
        <CardMedia image={bookCover} className={classes.media} />
        <CardContent className={classes.cardContent}>
          <Link to={`/books/view/${bookId}`}>
            <Button variant="contained" color="primary">
              View More
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};
const BookShowCase = ({ title, getData, filters, ignoreId }) => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  useEffect(() => {
    getData((books) => {
      books = books?.filter((book) => book.bookId !== ignoreId);
      setData(books);
    }, filters);
  }, [filters]);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    nextArrow: <ArrowForwardIos classes={{ root: classes.arrowStyle }} />,
    prevArrow: <ArrowBackIos classes={{ root: classes.arrowStyle }} />
  };
  if (!data) {
    return <div></div>;
  }
  return (
    <div className={classes.root} data-aos="fade-up">
      <Grid container>
        <Grid item xs={1}></Grid>
        <Grid item container xs={11} spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h4" className={classes.title}>
              {title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Slider {...settings}>
              {data.map(({ bookCover, bookId }) => (
                <BookCard bookCover={bookCover} bookId={bookId}></BookCard>
              ))}
            </Slider>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default BookShowCase;
