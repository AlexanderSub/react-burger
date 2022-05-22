import {
  REGISTER_REQUEST, 
  REGISTER_FAILED, 
  REGISTER_SUCCESS, 
  LOGIN_REQUEST, 
  LOGIN_FAILED, 
  LOGIN_SUCCESS, 
  LOGOUT_REQUEST, 
  LOGOUT_FAILED, 
  LOGOUT_SUCCESS, 
  FORGOT_PASSWORD_REQUEST, 
  FORGOT_PASSWORD_FAILED, 
  FORGOT_PASSWORD_SUCCESS, 
  RESET_PASSWORD_REQUEST, 
  RESET_PASSWORD_FAILED, 
  RESET_PASSWORD_SUCCESS, 
  GET_USER_SUCCESS, 
  GET_USER_FAILED, 
  GET_USER_REQUEST, 
  UPDATE_USER_REQUEST, 
  UPDATE_USER_FAILED, 
  UPDATE_USER_SUCCESS, 
  UPDATE_TOKEN_REQUEST, 
  UPDATE_TOKEN_FAILED, 
  UPDATE_TOKEN_SUCCESS 
} from '../actions/auth'

const initialState = {
  name: '',
  email: '',
  isAuthChecked: false,
  authorized: false,
  
  registerRequest: false,
  registerFailed: false,

  loginRequest: false,
  loginFailed: false,

  logoutRequest: false,
  logoutFailed: false,

  isPasswordForgotten: false,
  forgotPasswordRequest: false,
  forgotPasswordFailed: false,

  isPasswordReset: false,
  resetPasswordRequest: false,
  resetPasswordFailed: false,

  getUserRequest: false,
  getUserFailed: false,

  updateUserRequest: false,
  updateUserFailed: false,

  updateTokenRequest: false,
  updateTokenFailed: false,
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true
      }
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        registerFailed: true,
        registerRequest: false
      }
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        registerRequest: false,
        registerFailed: false,
        authorized: true,
        name: action.auth.name,
        email: action.auth.email
      }
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true
      }
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        loginFailed: true,
        loginRequest: false
      }
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: false,
        authorized: true,
        name: action.auth.name,
        email: action.auth.email
      }
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true
      }
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        logoutFailed: true,
        logoutRequest: false
      }
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: false,
        authorized: false,
        name: '',
        email: ''
      }
    }
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordRequest: true
      }
    }
    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotPasswordFailed: true,
        forgotPasswordRequest: false
      }
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        isPasswordForgotten: true,
        forgotPasswordRequest: false,
        forgotPasswordFailed: false,
      }
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true
      }
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetPasswordFailed: true,
        resetPasswordRequest: false
      }
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        isPasswordReset: true,
        resetPasswordRequest: false,
        resetPasswordFailed: false,
      }
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
        isAuthChecked: false,
      }
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        getUserFailed: true,
        getUserRequest: false,
        isAuthChecked: true,
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        getUserRequest: false,
        getUserFailed: false,
        isAuthChecked: true,
        authorized: true,
        name: action.auth.name,
        email: action.auth.email
      }
    }
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserRequest: true
      }
    }
    case UPDATE_USER_FAILED: {
      return {
        ...state,
        updateUserFailed: true,
        updateUserRequest: false
      }
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        updateUserRequest: false,
        updateUserFailed: false,
        name: action.auth.name,
        email: action.auth.email
      }
    }
    case UPDATE_TOKEN_REQUEST: {
      return {
        ...state,
        updateTokenRequest: true
      }
    }
    case UPDATE_TOKEN_FAILED: {
      return {
        ...state,
        updateTokenRequest: false,
        updateTokenFailed: true
      }
    }
    case UPDATE_TOKEN_SUCCESS: {
      return {
        ...state,
        updateTokenRequest: false,
        updateTokenFailed: false
      }
    }
    default: {
      return state
    }
  }
}