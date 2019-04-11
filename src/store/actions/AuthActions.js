import axios from 'axios';
import setAuthToken from '../../services/SetAuthToken';
import { LOGIN, GET_USER, LOGIN_SUCCESS, GET_ERRORS } from '../types/AuthTypes';

//register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/newuser', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.responce.data
      })
    );
};

// export const POST_AUTHENTICATE_USER = 'POST_AUTHENTICATE_USER';
// export const POST_AUTHENTICATE_USER_SUCCESS =
//   'POSTPOST_AUTHENTICATE_USER_SUCCESS';
// export const POST_AUTHENTICATE_USER_FAILURE = 'POST_AUTHENTICATE_USER_FAILURE';

// export const SAVE_AUTH_DATA = 'SAVE_AUTH_DATA';
// export const REMOVE_AUTH_DATA = 'REMOVE_AUTH_DATA';

// /**
//  * Redux action for user authentication action
//  * @param   {string}            username  Username
//  * @param   {string}            password  Password
//  * @return  {FlashReduxAction}            Redux action
//  */
// export const authenticateUser = (
//   username: string,
//   password: string
// ): FlashReduxAction => ({
//   type: POST_AUTHENTICATE_USER,
//   payload: { username, password }
// });

// /**
//  * Redux action for user authentication success action
//  * @param   {string}            token   Auth token
//  * @return  {FlashReduxAction}          Redux action
//  */
// export const authenticateUserSuccess = (token: string): FlashReduxAction => ({
//   type: POST_AUTHENTICATE_USER_SUCCESS,
//   payload: { token }
// });

// /**
//  * Redux action for user authentication failure action
//  * @param   {string}            error   Reason for the failure
//  * @return  {FlashReduxAction}          Redux action
//  */
// export const authenticateUserFailure = (error: any): FlashReduxAction => ({
//   type: POST_AUTHENTICATE_USER,
//   payload: { error }
// });

// /**
//  * Redux action for storing auth data
//  * @param   {any}            authData  Username
//  * @return  {FlashReduxAction}            Redux action
//  */
// export const saveAuthData = (authData: any): FlashReduxAction => ({
//   type: SAVE_AUTH_DATA,
//   payload: { authData }
// });

// /**
//  * Redux action for removing auth data
//  * @return  {FlashReduxAction}            Redux action
//  */
// export const removeAuthData = (): FlashReduxAction => ({
//   type: REMOVE_AUTH_DATA,
//   payload: {}
// });

// export const login = data => ({
//   type: LOGIN,
//   payload: { data }
// });

export const login = data => (dispatch, history) => {
  axios
    .post('/auth/signin', data)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res
      })
    )
    .then(res => {
      // save to local storage
      const { token } = res.data;
      // set token to ls
      localStorage.setItem('token', token);
      // set token to auth header
      setAuthToken(token);
    })
    .then(res => history.push('/'))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.responce.data
      });
    });
  // payload:
};

//check token and load user
export const loadUser = () => (dispatch, getState) => {
  //user loading
  dispatch({ type: LOGIN });

  //get token from local storage
  const token = getState().auth.token;
  // const token =

  //Headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  // if token add to headers
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }

  axios
    .get('/userapi/me', config)
    .then(res =>
      dispatch({
        type: GET_USER,
        payload: res.data
      })
    )
    .catch(err => {
      console.log(err);
    });
};

// export const login = data => dispatch => axios.post('/auth/signin', data);

// export function login(data) {
//   return dispatch => axios.post('api/auth', data);
// }
