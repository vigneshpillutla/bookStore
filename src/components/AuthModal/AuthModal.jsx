import React, { useContext, useState } from 'react';
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
  console.log(auth);
  return (
    <Button className={classes.googleAuthBtn} onClick={auth.googleSignIn}>
      <AiOutlineGoogle />
      Sign In with Google
    </Button>
  );
};
const AuthModal = () => {
  const { open, handleCloseModal, formType, toggleFormType } = useGuest();
  const auth = useAuth();
  const classes = useStyles();
  const formFields = [
    {
      type: 'text',
      label: 'First Name',
      page: 'signup'
    },
    {
      type: 'text',
      label: 'Last Name',
      page: 'signup'
    },
    {
      type: 'email',
      label: 'Email'
    },
    {
      type: 'password',
      label: 'Password'
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
            {formFields.map(({ type, label, page }) => {
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
              <Button variant="contained">{title}</Button>
            </Grid>
          </Grid>
        </Card>
      </Modal>
    </div>
  );
};

export default AuthModal;
