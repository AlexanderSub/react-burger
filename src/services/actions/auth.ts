import { checkResponse, deleteCookie, forgotPassword, getUser, loginUser, logoutUser, refreshToken, registerUser, resetPassword, setCookie, updateUser } from '../../utils/utils'

import { 
  REGISTER_REQUEST, 
  REGISTER_SUCCESS, 
  REGISTER_FAILED, 
  LOGIN_REQUEST, 
  LOGIN_SUCCESS, 
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  UPDATE_TOKEN_REQUEST,
  UPDATE_TOKEN_SUCCESS,
  UPDATE_TOKEN_FAILED
} from '../constants'
import { AppDispatch, AppThunk } from '../types'
import { TAuth } from '../types/data'

export interface IRegisterRequestAction {
  readonly type: typeof REGISTER_REQUEST
}
export interface IRegisterSuccessAction {
  readonly type: typeof REGISTER_SUCCESS
  readonly auth: TAuth
}
export interface IRegisterFailedAction {
  readonly type: typeof REGISTER_FAILED
}

export interface ILoginRequestAction {
  readonly type: typeof LOGIN_REQUEST
}
export interface ILoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS
  readonly auth: TAuth
}
export interface ILoginFailedAction {
  readonly type: typeof LOGIN_FAILED
}

export interface ILogoutRequestAction {
  readonly type: typeof LOGOUT_REQUEST
}
export interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT_SUCCESS
}
export interface ILogoutFailedAction {
  readonly type: typeof LOGOUT_FAILED
}

export interface IForgotPasswordRequestAction {
  readonly type: typeof FORGOT_PASSWORD_REQUEST
}
export interface IForgotPasswordSuccessAction {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS
}
export interface IForgotPasswordFailedAction {
  readonly type: typeof FORGOT_PASSWORD_FAILED
}

export interface IResetPasswordRequestAction {
  readonly type: typeof RESET_PASSWORD_REQUEST
}
export interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS
}
export interface IResetPasswordFailedAction {
  readonly type: typeof RESET_PASSWORD_FAILED
}

export interface IGetUserRequestAction {
  readonly type: typeof GET_USER_REQUEST
}
export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS
  readonly auth: TAuth
}
export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_FAILED
}

export interface IUpdateUserRequestAction {
  readonly type: typeof UPDATE_USER_REQUEST
}
export interface IUpdateUserSuccessAction {
  readonly type: typeof UPDATE_USER_SUCCESS
  readonly auth: TAuth
}
export interface IUpdateUserFailedAction {
  readonly type: typeof UPDATE_USER_FAILED
}

export interface IUpdateTokenRequestAction {
  readonly type: typeof UPDATE_TOKEN_REQUEST
}
export interface IUpdateTokenSuccessAction {
  readonly type: typeof UPDATE_TOKEN_SUCCESS
}
export interface IUpdateTokenFailedAction {
  readonly type: typeof UPDATE_TOKEN_FAILED
}

export type TAuthActions = 
  | IRegisterRequestAction
  | IRegisterSuccessAction
  | IRegisterFailedAction
  | ILoginRequestAction
  | ILoginSuccessAction
  | ILoginFailedAction
  | ILogoutRequestAction
  | ILogoutSuccessAction
  | ILogoutFailedAction
  | IForgotPasswordRequestAction
  | IForgotPasswordSuccessAction
  | IForgotPasswordFailedAction
  | IResetPasswordRequestAction
  | IResetPasswordSuccessAction
  | IResetPasswordFailedAction
  | IGetUserRequestAction
  | IGetUserSuccessAction
  | IGetUserFailedAction
  | IUpdateUserRequestAction
  | IUpdateUserSuccessAction
  | IUpdateUserFailedAction
  | IUpdateTokenRequestAction
  | IUpdateTokenSuccessAction
  | IUpdateTokenFailedAction


//Регистрация в системе
export const register: AppThunk = (form) => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: REGISTER_REQUEST
    })
    registerUser(form)
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        let accessToken = res.accessToken.split('Bearer ')[1]
        setCookie('accessToken', accessToken)
        localStorage.setItem('refreshToken', res.refreshToken)
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

//Вход в систему
export const loginUserRequest: AppThunk = (form) => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: LOGIN_REQUEST
    })
    loginUser(form)
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        let accessToken = res.accessToken.split('Bearer ')[1]
        setCookie('accessToken', accessToken)
        localStorage.setItem('refreshToken', res.refreshToken)
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

//Выход из системы
export const logout: AppThunk = () => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: LOGOUT_REQUEST
    })
    logoutUser()
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        deleteCookie('accessToken')
        localStorage.removeItem('refreshToken')
        dispatch({
          type: LOGOUT_SUCCESS
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

//Запрос сброса пароля
export const forgotPasswordUser: AppThunk = (form) => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST
    })
    forgotPassword(form)
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS
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

//Сброс пароля
export const resetPasswordUser: AppThunk = (form) => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST
    })
    resetPassword(form)
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: RESET_PASSWORD_SUCCESS
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

// Получение данных о пользователе
export const getUserData: AppThunk = () => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: GET_USER_REQUEST
    })
    getUser()
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
      dispatch({
        type: GET_USER_FAILED
      })
    })
  }
}

//Обновление токена
export const updateToken: AppThunk = () => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: UPDATE_TOKEN_REQUEST
    })
    refreshToken()
    .then(checkResponse)
    .then(res => {
      console.log(res)
      if (res && res.success) {
        let accessToken = res.accessToken.split('Bearer ')[1]
        setCookie('accessToken', accessToken)
        localStorage.setItem('refreshToken', res.refreshToken)
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

// Обновление данных о пользователе
export const updateUserData: AppThunk = (name, email) => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST
    })
    updateUser(name, email)
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