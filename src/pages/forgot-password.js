import React, { useCallback, useState } from "react";
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Redirect, useHistory } from 'react-router-dom'
import AppStyles from '../components/App/App.module.css'
import { URL_LOGIN, URL_RESET } from '../utils/constants'
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordUser } from "../services/actions/auth";

const Forgot = () => {
  const dispatch = useDispatch()
  const [form, setValue] = useState({email: ''})
  const isAuthorized = useSelector(state => state.auth.authorized)
  const isPasswordForgotten = useSelector(state => state.auth.isPasswordForgotten)

  const history = useHistory()
  const goToPage = useCallback(
    (url) => {
        history.replace({ pathname: url });
    },
    [history]
  )

  const onChange = e => {
    setValue({...form, [e.target.name]: e.target.value})
  }

  const forgotPassword = useCallback(
    e => {
      e.preventDefault()
      dispatch(forgotPasswordUser(form))
      goToPage(URL_RESET)
    }
  )

  if (isAuthorized) {
    return (
      <Redirect 
        to={{
          pathname: '/'
        }}
      />
    )
  } else {
    return (
      <div className={AppStyles.login}>
        <form onSubmit={forgotPassword} className={AppStyles.card}>
          <h4 className={`text text_type_main-medium mb-6`}>Восстановление пароля</h4>
          <div className={`${AppStyles.input} mb-6`}>
            <Input
              type={'email'}
              placeholder={'Укажите e-mail'}
              onChange={onChange}
              value={form.email}
              name={'email'}
              size={'default'}
            />
          </div>
          <div className={'mb-20'}>
            <Button type="primary" size="medium" disabled={form.email.length === 0}>Восстановить</Button>
          </div>
          
          <span className={'text text_type_main-default text_color_inactive'}>
            Вспомнили пароль?
            <Link to={URL_LOGIN} className={AppStyles.linkText}> Войти</Link>
          </span>
        </form>
      </div>
    )
  }
}

export default Forgot