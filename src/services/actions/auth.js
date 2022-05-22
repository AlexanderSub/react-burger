import { checkResponse, deleteCookie, forgotPassword, getUser, loginUser, logoutUser, refreshToken, registerUser, resetPassword, setCookie, updateUser } from '../../utils/utils'

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

//Регистрация в системе
const registerRequest = () => ({
  type: REGISTER_REQUEST
})

const registerSuccess = (res) => ({
  type: REGISTER_SUCCESS,
  auth: {
    name: res.user.name,
    email: res.user.email
  }
})

const registerFailed = () => ({
  type: REGISTER_FAILED
})

export function register(form) {
  return function(dispatch) {
    dispatch(registerRequest())
    registerUser(form)
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        let accessToken = res.accessToken.split('Bearer ')[1]
        setCookie('accessToken', accessToken)
        localStorage.setItem('refreshToken', res.refreshToken)
        dispatch(registerSuccess(res))
      }
    })
    .catch((err) => {
      console.log(err)
      dispatch(registerFailed())
    })
  }
}

//Вход в систему
const loginRequest = () => ({
  type: LOGIN_REQUEST
})

const loginSuccess = (res) => ({
  type: LOGIN_SUCCESS,
  auth: {
    name: res.user.name,
    email: res.user.email
  }
})

const loginFailed = () => ({
  type: LOGIN_FAILED
})

export function loginUserRequest(form) {
  return function(dispatch) {
    dispatch(loginRequest())
    loginUser(form)
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        let accessToken = res.accessToken.split('Bearer ')[1]
        setCookie('accessToken', accessToken)
        localStorage.setItem('refreshToken', res.refreshToken)
        dispatch(loginSuccess(res))
      }
    })
    .catch((err) => {
      console.log(err)
      dispatch(loginFailed())
    })
  }
}

//Выход из системы
const logoutRequest = () => ({
  type: LOGOUT_REQUEST
})

const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS
})

const logoutFailed = () => ({
  type: LOGOUT_FAILED
})

export function logout() {
  return function(dispatch) {
    dispatch(logoutRequest())
    logoutUser()
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        deleteCookie('accessToken')
        localStorage.removeItem('refreshToken')
        dispatch(logoutSuccess())
      }
    })
    .catch((err) => {
      console.log(err)
      dispatch(logoutFailed())
    })
  }
}

//Запрос сброса пароля
const forgotPasswordRequest = () => ({
  type: FORGOT_PASSWORD_REQUEST
})

const forgotPasswordSuccess = () => ({
  type: FORGOT_PASSWORD_SUCCESS,
})

const forgotPasswordFailed = () => ({
  type: FORGOT_PASSWORD_FAILED
})

export function forgotPasswordUser(form) {
  return function(dispatch) {
    dispatch(forgotPasswordRequest())
    forgotPassword(form)
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        dispatch(forgotPasswordSuccess())
      }
    })
    .catch((err) => {
      console.log(err)
      dispatch(forgotPasswordFailed())
    })
  }
}

//Сброс пароля
const resetPasswordRequest = () => ({
  type: RESET_PASSWORD_REQUEST
})

const resetPasswordSuccess = () => ({
  type: RESET_PASSWORD_SUCCESS,
})

const resetPasswordFailed = () => ({
  type: RESET_PASSWORD_FAILED
})

export function resetPasswordUser(form) {
  return function(dispatch) {
    dispatch(resetPasswordRequest())
    resetPassword(form)
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        dispatch(resetPasswordSuccess())
      }
    })
    .catch((err) => {
      console.log(err)
      dispatch(resetPasswordFailed())
    })
  }
}

// Получение данных о пользователе
const getUserRequest = () => ({
  type: GET_USER_REQUEST
})

const getUserSuccess = (res) => ({
  type: GET_USER_SUCCESS,
  auth: {
    name: res.user.name,
    email: res.user.email
  }
})

const getUserFailed = () => ({
  type: GET_USER_FAILED
})

export function getUserData() {
  return function(dispatch) {
    dispatch(getUserRequest())
    getUser()
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        dispatch(getUserSuccess(res))
      } else {
        dispatch(updateToken())
        .then(() => {
          dispatch(getUserData())
        })
      }
    })
    .catch((err) => {
      console.log(err)
      dispatch(getUserFailed())
    })
  }
}

//Обновление токена
const updateTokenRequest = () => ({
  type: UPDATE_TOKEN_REQUEST
})

const updateTokenSuccess = () => ({
  type: UPDATE_TOKEN_SUCCESS
})

const updateTokenFailed = () => ({
  type: UPDATE_TOKEN_FAILED
})

export function updateToken() {
  return function(dispatch) {
    dispatch(updateTokenRequest())
    refreshToken()
    .then(checkResponse)
    .then(res => {
      console.log(res)
      if (res && res.success) {
        let accessToken = res.accessToken.split('Bearer ')[1]
        setCookie('accessToken', accessToken)
        localStorage.setItem('refreshToken', res.refreshToken)
        dispatch(updateTokenSuccess)
      }
    })
    .catch((err) => {
      console.log(err)
      dispatch(updateTokenFailed())
    })
  }
}

// Обновление данных о пользователе
const updateUserRequest = () => ({
  type: UPDATE_USER_REQUEST
})

const updateUserSuccess = (res) => ({
  type: UPDATE_USER_SUCCESS,
  auth: {
    name: res.user.name,
    email: res.user.email
  }
})

const updateUserFailed = () => ({
  type: UPDATE_USER_FAILED
})

export function updateUserData(name, email) {
  return function(dispatch) {
    dispatch(updateUserRequest())
    updateUser(name, email)
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        dispatch(updateUserSuccess(res))
      }
    })
    .catch((err) => {
      console.log(err)
      dispatch(updateUserFailed())
    })
  }
}