import useAuth from 'customHooks/useAuth';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const LoginPage = () => {
  const auth = useAuth();
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: '/' } };
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  useEffect(() => {
    if (auth.user) {
      history.replace(from);
    }
  }, [auth.user]);
  const handleFormChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => {
      let newFormData = { ...prev };
      newFormData[name] = value;
      return newFormData;
    });
  };
  const loginUser = (e) => {
    e.preventDefault();
    auth.login(formData.email, formData.password, () => {
      history.replace(from);
    });
  };
  return (
    <form>
      <input
        type="email"
        placeholder="Enter Your Email"
        value={formData.email}
        name="email"
        onChange={handleFormChange}
      />
      <input
        type="password"
        placeholder="Enter Your Password"
        value={formData.password}
        name="password"
        onChange={handleFormChange}
      />
      <button onClick={loginUser}>Login</button>
    </form>
  );
};

export default LoginPage;
