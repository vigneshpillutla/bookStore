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
  IconButton,
  Card,
  Popover,
  Popper,
  Paper
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { alpha, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AuthModal from './AuthModal/AuthModal';
import { useGuest } from './AuthModal/AuthModal';
import BookLibrary from '../common/bookUtil';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
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
  },
  avatarContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  profileOptions: {
    padding: '1rem 2rem',
    position: 'fixed',
    right: 10,
    marginTop: '1rem',
    transition: 'height .35s ease-in'
  },
  popup: {
    zIndex: theme.zIndex.appBar + 1,
    right: 0,
    '& > *': {
      position: 'absolute',
      top: '4.5rem',
      right: '3rem',
      padding: '2rem'
    }
  }
}));

const NavBar = () => {
  const { isLoggedIn, user, logout, setLoading } = useAuth();
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState('');
  const [allBooks, setAllBooks] = useState([]);
  const { setOpen, setFormType } = useGuest();
  const [activePage, setActivePage] = useState(0);
  const [anchor, setAnchor] = useState(null);
  const library = new BookLibrary();
  const history = useHistory();
  const btnRef = React.useRef();
  useEffect(() => {
    setAnchor(btnRef.current);
  }, [btnRef]);
  const openNav = (e) => {
    setAnchor(btnRef.current);
  };
  const closeNav = (e) => {
    setAnchor(null);
  };
  const toggleNav = (e) => {
    setAnchor(anchor ? null : btnRef);
  };
  useEffect(() => {
    library.getAllBooks((books) => setAllBooks(books));
  }, []);
  const handleSearch = () => {
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
  const handleLogout = () => {
    setLoading(true);
    logout();
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
    const open = Boolean(anchor);
    const id = open ? 'simple-popper' : undefined;

    let initials = '';
    if (isLoggedIn()) {
      const { firstName, lastName } = user;
      initials = (firstName[0] + lastName[0]).toUpperCase();
    }
    return isLoggedIn() ? (
      <div className={clsx(classes.accActions, classes.authBtns)}>
        <IconButton component="span">
          <ShoppingCartOutlinedIcon />
        </IconButton>
        <div className={classes.avatarContainer}>
          <Avatar className={classes.avatar}>{initials}</Avatar>
          <IconButton ref={btnRef} onClick={toggleNav} aria-describedby={id}>
            <KeyboardArrowDownIcon />
          </IconButton>
          {/* <button ref={btnRef} onClick={toggleNav} aria-describedby={id}>
            toggle
          </button> */}
          <Popper
            id={id}
            open={open}
            anchorEl={anchor}
            onClose={closeNav}
            placement="right-end"
            className={classes.popup}
          >
            <Paper elevation={3}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            </Paper>
          </Popper>
        </div>
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
