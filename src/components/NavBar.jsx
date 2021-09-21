import useAuth from 'customHooks/useAuth';
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  InputBase,
  Tabs,
  Tab,
  Button
} from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

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
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    width: '100%',
    color: 'inherit'
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
  }
}));

const NavBar = () => {
  const auth = useAuth();
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState('');
  const [activePage, setActivePage] = useState(0);
  const handlePageChange = (event, value) => {
    setActivePage(value);
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
  return (
    <AppBar
      classes={{
        root: classes.appBar
      }}
    >
      <Toolbar>
        <Avatar className={classes.appLogo}>L</Avatar>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        <PageNavigation />
        <div className={classes.authBtns}>
          <Button variant="contained" color="secondary">
            Login
          </Button>
          <Button variant="contained" color="secondary">
            SignUp
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
