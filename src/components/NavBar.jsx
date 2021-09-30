import useAuth from 'customHooks/useAuth';
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  InputBase,
  Tabs,
  Tab,
  Button,
  TextField,
  IconButton
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { alpha, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AuthModal from './AuthModal/AuthModal';
import { useGuest } from './AuthModal/AuthModal';
import BookLibrary from '../common/bookUtil';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    position: 'sticky'
  },
  search: {
    flexGrow: 1,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(5),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  autoComplete: {
    width: '100%'
  },
  inputRoot: {
    width: '100%',
    color: 'inherit',
    margin: 0
  },
  inputInput: {
    flexGrow: 1,
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  },
  appLogo: {
    background: '#5CB5DB',
    padding: '5px',
    marginRight: theme.spacing(2)
  },
  navTabRoot: {
    width: '25%',
    minWidth: '25%'
  },
  tabList: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      flexGrow: 1
    }
  },
  authBtns: {
    whiteSpace: 'nowrap',
    '& > *': {
      margin: theme.spacing(2)
    }
  },
  accActions: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    background: theme.palette.secondary.dark
  },
  outline: {
    border: 0
  }
}));

const NavBar = () => {
  const { isLoggedIn } = useAuth();
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState('');
  const [allBooks, setAllBooks] = useState([]);
  const { setOpen, setFormType } = useGuest();
  const [activePage, setActivePage] = useState(0);
  const library = new BookLibrary();
  const history = useHistory();
  useEffect(() => {
    library.getAllBooks((books) => setAllBooks(books));
  }, []);
  const handleSearch = () => {
    console.log('clicked', searchValue);
    if (!!searchValue) {
      history.push(`/explore?bookKeyword=${searchValue}`);
    }
  };
  const handlePageChange = (event, value) => {
    setActivePage(value);
  };

  const handleActionButton = (type) => {
    setOpen(true);
    setFormType(type);
  };
  const PageNavigation = () => {
    const navTabs = ['Home', 'Explore', 'About', 'Contacts'];
    return (
      <Tabs
        indicatorColor="secondary"
        value={activePage}
        onChange={handlePageChange}
        className={classes.tabList}
      >
        {navTabs.map((name) => (
          <Tab
            label={name}
            classes={{
              root: classes.navTabRoot
            }}
          />
        ))}
      </Tabs>
    );
  };
  const UserButtons = () => {
    return isLoggedIn() ? (
      <div className={clsx(classes.accActions, classes.authBtns)}>
        <IconButton component="span">
          <ShoppingCartOutlinedIcon />
        </IconButton>
        <Avatar className={classes.avatar}>VP</Avatar>
      </div>
    ) : (
      <div className={classes.authBtns}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleActionButton('login')}
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleActionButton('signup')}
        >
          SignUp
        </Button>
      </div>
    );
  };
  return (
    <>
      <AppBar
        classes={{
          root: classes.appBar
        }}
      >
        <Toolbar>
          <Link to="/">
            <Avatar className={classes.appLogo}>L</Avatar>
          </Link>
          <div className={classes.search}>
            <Link to={`/explore?bookKeyword=${searchValue}`}>
              <div className={classes.searchIcon} onClick={handleSearch}>
                <SearchIcon />
              </div>
            </Link>
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              limitTags={2}
              options={allBooks.map((book) => book.name)}
              className={classes.autoComplete}
              inputValue={searchValue}
              onInputChange={(e, v) => setSearchValue(v)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search.."
                  margin="normal"
                  variant="outlined"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  InputProps={{
                    ...params.InputProps,
                    classes: {
                      notchedOutline: classes.outline
                    }
                  }}
                />
              )}
            />
          </div>
          <PageNavigation />
          <UserButtons />
        </Toolbar>
      </AppBar>
      <AuthModal />
    </>
  );
};

export default NavBar;
