import {REGISTER_REQUEST, REGISTER_FAILED, REGISTER_SUCCESS, LOGIN_REQUEST, LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT_REQUEST, LOGOUT_FAILED, LOGOUT_SUCCESS } from '../actions/auth'

const initialState = {
  name: '',
  email: '',
  authorized: false,
  request: false,
  failed: false
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
    default: {
      return state
    }
  }
}