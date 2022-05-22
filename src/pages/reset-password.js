import React, { useCallback, useEffect, useState } from "react";
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Redirect, useHistory } from 'react-router-dom'
import AppStyles from '../components/App/App.module.css'
import { URL_LOGIN } from '../utils/constants'
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordUser } from "../services/actions/auth";

const Reset = () => {
  const dispatch = useDispatch()
  const [form, setValue] = useState({password: '', token: ''})
  const isPasswordForgotten = useSelector(state => state.auth.isPasswordForgotten)
  const isPasswordReset = useSelector(state => state.auth.isPasswordReset)
  const isAuthorized = useSelector(state => state.auth.authorized)

  const onChange = e => {
    setValue({...form, [e.target.name]: e.target.value})
  }

  useEffect(() => {
    if (isPasswordReset) {
      goToPage(URL_LOGIN)
    }
  })

  const resetPassword = useCallback(
    e => {
      e.preventDefault()
      dispatch(resetPasswordUser(form))
    },
    [dispatch, form]
  )

  const history = useHistory()
  const goToPage = useCallback(
    (url) => {
        history.replace({ pathname: url });
    },
    [history]
  )

  if (isAuthorized) {
    return (
      <Redirect 
        to={{
          pathname: '/'
        }}
      />
    )
  }

  if (!isPasswordForgotten) {
    return (
      <Redirect 
        to={{
          pathname: '/'
        }}
      />
    );
  }
  
  return (
    <div className={AppStyles.login}>
      <form onSubmit={resetPassword} className={AppStyles.card}>
        <h4 className={`text text_type_main-medium mb-6`}>Восстановление пароля</h4>
        <div className={`${AppStyles.input} mb-6`}>
          <PasswordInput
            type={'password'}
            placeholder={'Введите новый пароль'}
            onChange={onChange}
            icon={'ShowIcon'}
            value={form.password}
            name={'password'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <div className={`${AppStyles.input} mb-6`}>
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={onChange}
            value={form.token}
            name={'token'}
            size={'default'}
          />
        </div>
        <div className={'mb-20'}>
          <Button
            type="primary"
            size="medium"
            disabled={form.password.length === 0 || form.token.length === 0}
          >
            Сохранить
          </Button>
        </div>
        
        <span className={'text text_type_main-default text_color_inactive'}>
          Вспомнили пароль?
          <Link to={URL_LOGIN} className={AppStyles.linkText}> Войти</Link>
        </span>
      </form>
    </div>
  )
}

export default Reset