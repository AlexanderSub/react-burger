import { URL } from '../../utils/constants'
import { checkResponse, deleteCookie, forgotPasswordRequest, getCookie, setCookie } from '../../utils/utils'

export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_FAILED = 'REGISTER_FAILED'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_FAILED = 'LOGOUT_FAILED'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST'
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED'
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS'

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST'
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED'
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'

export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER_FAILED = 'GET_USER_FAILED'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST'
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED'
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'

export const UPDATE_TOKEN_REQUEST = 'UPDATE_TOKEN_REQUEST'
export const UPDATE_TOKEN_FAILED = 'UPDATE_TOKEN_FAILED'
export const UPDATE_TOKEN_SUCCESS = 'UPDATE_TOKEN_SUCCESS'

export function registerUser(form) {
  return function(dispatch) {
    dispatch({
      type: REGISTER_REQUEST
    })
    fetch(`${URL}/auth/register`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(form)
    })
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        let accessToken = res.accessToken.split('Bearer ')[1]
        setCookie('accessToken', accessToken)
        setCookie('refreshToken', res.refreshToken)
        dispatch({
          type: REGISTER_SUCCESS,
          auth: {
            name: res.user.name,
            email: res.user.email
          }
        })
      }
    })
    .catch((err) => {
      console.log(err)
      dispatch({
        type: REGISTER_FAILED
      })
    })
  }
}

export function loginUserRequest(form) {
  return function(dispatch) {
    dispatch({
      type: LOGIN_REQUEST
    })
    fetch(`${URL}/auth/login`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(form)
    })
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        let accessToken = res.accessToken.split('Bearer ')[1]
        setCookie('accessToken', accessToken)
        setCookie('refreshToken', res.refreshToken)
        dispatch({
          type: LOGIN_SUCCESS,
          auth: {
            name: res.user.name,
            email: res.user.email
          }
        })
      }
    })
    .catch((err) => {
      console.log(err)
      dispatch({
        type: LOGIN_FAILED
      })
    })
  }
}

export function logoutUser() {
  return function(dispatch) {
    dispatch({
      type: LOGOUT_REQUEST
    })
    fetch(`${URL}/auth/logout`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        'token': `${getCookie('refreshToken')}`
      })
    })
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        deleteCookie('accessToken')
        deleteCookie('refreshToken')
        dispatch({
          type: LOGOUT_SUCCESS,
        })
      }
    })
    .catch((err) => {
      console.log(err)
      dispatch({
        type: LOGOUT_FAILED
      })
    })
  }
}

export function forgotPasswordUser(form) {
  return function(dispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST
    })
    forgotPasswordRequest(form)
    // fetch(`${URL}/password-reset`, {
    //   method: 'POST',
    //   mode: 'cors',
    //   cache: 'no-cache',
    //   credentials: 'same-origin',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   redirect: 'follow',
    //   referrerPolicy: 'no-referrer',
    //   body: JSON.stringify(form)
    // })
    .then(checkResponse)
    .then(res => {
      console.log(res)
      if (res && res.success) {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
        })
      }
    })
    .catch((err) => {
      console.log(err)
      dispatch({
        type: FORGOT_PASSWORD_FAILED
      })
    })
  }
}

export function resetPasswordUser(form) {
  return function(dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST
    })
    fetch(`${URL}/password-reset/reset`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(form)
    })
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
        })
      }
    })
    .catch((err) => {
      console.log(err)
      dispatch({
        type: RESET_PASSWORD_FAILED
      })
    })
  }
}

export function getUser() {
  return function(dispatch) {
    dispatch({
      type: GET_USER_REQUEST
    })
    fetch(`${URL}/auth/user`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('accessToken')
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer'
    })
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_USER_SUCCESS,
          auth: {
            name: res.user.name,
            email: res.user.email
          }
        })
      }
    })
    .catch((err) => {
      console.log(err)
      if ((err.message === 'jwt expired') || (err.message === 'Token is invalid')) {
        dispatch(updateToken())
        .then(() => {
          dispatch(getUser())
        })
      } else {
        console.log(err);
        dispatch({
          type: GET_USER_FAILED
        })
      }
    })
  }
}

export function updateUser(name, email) {
  return function(dispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST
    })
    fetch(`${URL}/auth/user`, {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('accessToken')
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({name, email})
    })
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: UPDATE_USER_SUCCESS,
          auth: {
            name: res.user.name,
            email: res.user.email
          }
        })
      }
    })
    .catch((err) => {
      console.log(err)
      dispatch({
        type: UPDATE_USER_FAILED
      })
    })
  }
}

export function updateToken() {
  return function(dispatch) {
    dispatch({
      type: UPDATE_TOKEN_REQUEST
    })
    fetch(`${URL}/auth/token`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        'token': `${getCookie('refreshToken')}`
      })
    })
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        let accessToken = res.accessToken.split('Bearer ')[1]
        setCookie('accessToken', accessToken)
        setCookie('refreshToken', res.refreshToken)
        dispatch({
          type: UPDATE_TOKEN_SUCCESS
        })
      }
    })
    .catch((err) => {
      console.log(err)
      dispatch({
        type: UPDATE_TOKEN_FAILED
      })
    })
  }
}