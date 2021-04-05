import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login, loggedUser } from 'redux/actions/auth.action';
import qs from 'query-string'
import { ADMIN } from '../../router/route-constants'
import './LoginComponent.styles.css';
import { Redirect } from "react-router-dom";

const Login = ({ login, loggedUser, isAuthenticated, history, location}) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [redirectUrl] = useState(() => {
    const url = qs.parse(location.search).redirectUrl;
    return url || ADMIN.DASHBOARD.path
  })

  const { username, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login({ username, password });
    history.replace(redirectUrl);
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.replace(redirectUrl);
      <Redirect to={redirectUrl} />
    }
  }, [history, isAuthenticated, loggedUser, redirectUrl])

  return (
    <Fragment>
      <div className="container" id="container">
        <div className="form-container sign-in-container">
          <h1>Sign In</h1>
            <div className="social-container"></div>
              <form className='form' onSubmit={(e) => onSubmit(e)}>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Username'
                    name='username'
                    value={username}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    value={password}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                  <button className="btn-login">Login</button>
                  </form>
        </div>
        <div className="overlay-container">
		      <div className="overlay">
          </div>
	      </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loggedUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login, loggedUser})(Login);