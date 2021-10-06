import React, { useContext, useReducer, useState } from 'react';
import {
  makeStyles,
  Typography,
  Modal,
  Paper,
  Card,
  Button,
  Grid,
  Divider,
  TextField
} from '@material-ui/core';
import { AiOutlineGoogle } from 'react-icons/ai';
import { TimeToLeave } from '@material-ui/icons';
import useAuth from 'customHooks/useAuth';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw'
  },
  paper: {
    padding: '2rem 3rem',
    maxWidth: '400px',
    width: '90%'
  },
  form: {
    textAlign: 'center'
  },
  googleAuthBtn: {
    background: '#0e63f4',
    width: '100%',
    whiteSpace: 'nowrap',
    color: '#fff',
    '& > :first-child': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10
    },
    '&:hover': {
      background: '#124fd5'
    }
  },
  inputFields: {
    width: '100%',
    '& > label': {
      color: 'rgba(0,0,0,0.5)'
    }
  },
  switchTxt: {
    fontWeight: 500,
    cursor: 'pointer',
    textDecoration: 'underline'
  }
}));

/**
 *    maintaining open state
 *    formType for login or signUp
 *    Changing form type locally to switch between login and signup
 *    handle submit action on basis of formType
 */

const guestContext = React.createContext();

export const useGuest = () => {
  return useContext(guestContext);
};

export const GuestProvider = ({ children }) => {
  const guest = useAuthModal();

  return (
    <guestContext.Provider value={guest}>{children}</guestContext.Provider>
  );
};

export const useAuthModal = () => {
  const [open, setOpen] = useState(false);
  const [formType, setFormType] = useState('login');

  const handleCloseModal = () => {
    setOpen(false);
  };

  const toggleFormType = () => {
    const type = formType === 'login' ? 'signup' : 'login';
    setFormType(type);
  };

  return {
    open,
    setOpen,
    formType,
    setFormType,
    handleCloseModal,
    toggleFormType
  };
};

const GoogleAuthBtn = () => {
  const classes = useStyles();
  const auth = useAuth();
  return (
    <Button className={classes.googleAuthBtn} onClick={auth.googleSignIn}>
      <AiOutlineGoogle />
      Sign In with Google
    </Button>
  );
};
const reducer = (state, action) => {
  const { type, payload } = action;
  const updatedState = { ...state };
  updatedState[type] = payload;
  return updatedState;
};
const AuthModal = () => {
  const { open, handleCloseModal, formType, toggleFormType } = useGuest();
  const auth = useAuth();
  const classes = useStyles();
  const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };
  const [formData, dispatch] = useReducer(reducer, initialFormData);
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: name,
      payload: value
    });
  };
  const formFields = [
    {
      type: 'text',
      label: 'First Name',
      page: 'signup',
      name: 'firstName'
    },
    {
      type: 'text',
      label: 'Last Name',
      page: 'signup',
      name: 'lastName'
    },
    {
      type: 'email',
      label: 'Email',
      name: 'email'
    },
    {
      type: 'password',
      label: 'Password',
      name: 'password'
    }
  ];
  const formTexts = {
    login: {
      title: 'Login',
      bottomText: 'New User? ',
      navTxt: 'Sign Up'
    },
    signup: {
      title: 'Sign Up',
      bottomText: 'Already a User? ',
      navTxt: 'Login'
    }
  };
  const { title, bottomText, navTxt } = formTexts[formType];
  const { enqueueSnackbar } = useSnackbar();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    auth.setLoading(true);
    if (formType === 'login') {
      auth.login(formData, () => {
        handleCloseModal();
      });
    } else {
      auth.signUp(formData, () => {
        handleCloseModal();
      });
    }
  };
  return (
    <div>
      <Modal open={open} onClose={handleCloseModal} className={classes.modal}>
        <Card className={classes.paper}>
          <Grid
            container
            className={classes.form}
            direction="column"
            spacing={3}
          >
            <Grid item xs={12}>
              <Typography variant="h3">{title}</Typography>
            </Grid>
            <Grid item>
              <GoogleAuthBtn />
            </Grid>
            <Grid item>
              <Divider />
            </Grid>
            {formFields.map(({ type, label, page, name }) => {
              const toShow = page === formType || !page;
              return (
                toShow && (
                  <Grid item>
                    <TextField
                      className={classes.inputFields}
                      placeholder={label}
                      label={label}
                      variant="outlined"
                      color="secondary"
                      type={type}
                      name={name}
                      value={formData[name]}
                      onChange={handleFormChange}
                    />
                  </Grid>
                )
              );
            })}
            <Grid item>
              <Typography variant="subtitle1">
                {bottomText}
                <span className={classes.switchTxt} onClick={toggleFormType}>
                  {navTxt}
                </span>
              </Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleFormSubmit}>
                {title}
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Modal>
    </div>
  );
};

export default AuthModal;
