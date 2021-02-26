import {
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AUTH_ERROR
} from '../constants/constants.action';
import authApi from '../../api/authApi';

// LOAD USER
export const loggedUser = () => async (dispatch) => {
    try {
      const res = await authApi.getAuth();
      dispatch({
        type: USER_LOADED,
        payload: res,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };

//LOGIN USER
export const login = ({ username, password }) => async (dispatch) => {
  const body = JSON.stringify({ username, password });
  try {
    const res = await authApi.getToken(body);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res,
    });
    dispatch(loggedUser())
  } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
      });
  }
};

// LOG OUT
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
