import { checkResponse, deleteCookie, setCookie } from '../../utils/utils'
import { loginRequest, logoutRequest, registerUserRequest } from '../api'

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

export function registerUser(form) {
  return function(dispatch) {
    dispatch({
      type: REGISTER_REQUEST
    })
    registerUserRequest(form)
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
      } else {
        dispatch({
          type: REGISTER_FAILED
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

export function loginUser(form) {
  return function(dispatch) {
    dispatch({
      type: LOGIN_REQUEST
    })
    loginRequest(form)
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
      } else {
        dispatch({
          type: LOGIN_FAILED
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
    logoutRequest()
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        deleteCookie('accessToken')
        deleteCookie('refreshToken')
        dispatch({
          type: LOGOUT_SUCCESS,
        })
      } else {
        dispatch({
          type: LOGOUT_FAILED
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