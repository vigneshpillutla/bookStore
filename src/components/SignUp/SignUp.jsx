import "../../stylesheets/SignUp.css"

import useAuth from 'customHooks/useAuth';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SignUpPage = () => {
  const auth = useAuth();
  const history = useHistory();
  const defaultForm = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };
  const [formData, setFormData] = useState(defaultForm);
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      let newFormData = { ...prev };
      newFormData[name] = value;
      return newFormData;
    });
  };
  const onSignUp = (e) => {
    e.preventDefault();
    auth.signUp(formData, () => {
      setFormData(defaultForm);
      history.replace('/');
    });
  };
  const handleGoogle = () => {
    auth.googleSignIn();
  };
  return (
    <div className="signup-card">
      <div className="heading-2">Sign Up for Free</div>
      <form>
        <input
        className="simple-textbox form-input"
          type="text"
          name="firstName"
          id="firstname"
          autoComplete="off"
          placeholder="Enter your first name"
          value={formData.firstName}
          onChange={handleFormChange}
        />
        <input
        className="simple-textbox form-input"
          type="text"
          name="lastName"
          id="lastName"
          autoComplete="off"
          placeholder="Enter your last name"
          value={formData.lastName}
          onChange={handleFormChange}
        />
        <input
        className="simple-textbox form-input"
          type="email"
          name="email"
          id="email"
          autoComplete="off"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleFormChange}
        />
        <input
        className="simple-textbox form-input"
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleFormChange}
        />
        <button className="highlighted-btn signup-btn" onClick={onSignUp}>Sign Up</button>
      </form>
      <button className="border-btn google-signup-btn" onClick={handleGoogle}>Sign in with Google</button>
    </div>
  );
};

export default SignUpPage;
