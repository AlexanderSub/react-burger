import {REGISTER_REQUEST, REGISTER_FAILED, REGISTER_SUCCESS, LOGIN_REQUEST, LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT_REQUEST, LOGOUT_FAILED, LOGOUT_SUCCESS, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_FAILED, FORGOT_PASSWORD_SUCCESS, RESET_PASSWORD_REQUEST, RESET_PASSWORD_FAILED, RESET_PASSWORD_SUCCESS, GET_USER_SUCCESS, GET_USER_FAILED, GET_USER_REQUEST } from '../actions/auth'

const initialState = {
  name: '',
  email: '',
  authorized: false,
  request: false,
  failed: false,
  isPasswordForgotten: false,
  isPasswordReset: false,
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        request: true
      }
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        failed: true,
        request: false
      }
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        request: false,
        failed: false,
        authorized: true,
        name: action.auth.name,
        email: action.auth.email
      }
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        request: true
      }
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        failed: true,
        request: false
      }
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        request: false,
        failed: false,
        authorized: true,
        name: action.auth.name,
        email: action.auth.email
      }
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        request: true
      }
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        failed: true,
        request: false
      }
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        request: false,
        failed: false,
        authorized: false,
        name: '',
        email: ''
      }
    }
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        request: true
      }
    }
    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        failed: true,
        request: false
      }
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        isPasswordForgotten: true,
        request: false,
        failed: false,
      }
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        request: true
      }
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        failed: true,
        request: false
      }
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        isPasswordReset: true,
        request: false,
        failed: false,
      }
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        request: true
      }
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        failed: true,
        request: false
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        request: false,
        failed: false,
      }
    }
    default: {
      return state
    }
  }
}