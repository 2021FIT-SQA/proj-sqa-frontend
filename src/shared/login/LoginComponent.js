import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from 'redux/actions/auth.action';
import './LoginComponent.styles.css';

const Login = ({ login, isAuthenticated }) => {

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login({ username, password });
  };

  if(isAuthenticated) {
    return <Redirect to='/admin' />
  }

  return (
    <Fragment>
      <div class="container" id="container">
        <div class="form-container sign-in-container">
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
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);