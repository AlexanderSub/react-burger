import React, { useState } from "react";
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import {Link, Redirect} from 'react-router-dom'
import AppStyles from '../components/App/App.module.css'
import { URL_REGISTER, URL_FORGOT, URL_MAIN } from '../utils/constants'
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../services/actions/auth";

const Login = () => {
  const dispatch = useDispatch()
  const isAuthorized = useSelector(state => state.auth.authorized)

  const [form, setValue] = useState({email: '', password: ''})

  const onChange = e => {
    setValue({...form, [e.target.name]: e.target.value})
  }

  const login = (form) => {
    dispatch(loginUser(form))
  }

  if (isAuthorized) {
    return (
      <Redirect 
        to={{
          pathname: '/'
        }}
      />
    )
  }

  return (
    <div className={AppStyles.login}>
      <div className={AppStyles.card}>
        <h4 className={`text text_type_main-medium mb-6`}>Вход</h4>
        <div className={`${AppStyles.input} mb-6`}>
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={onChange}
            value={form.email}
            name={'email'}
            size={'default'}
          />
        </div>
        <div className={`${AppStyles.input} mb-6`}>
          <PasswordInput
            type={'password'}
            placeholder={'Пароль'}
            onChange={onChange}
            icon={'ShowIcon'}
            value={form.password}
            name={'password'}
            size={'default'}
          />
        </div>
        <div className={'mb-20'}>
          <Button onClick={() => login(form)} type="primary" size="medium">Войти</Button>
        </div>
        
        <span className={'text text_type_main-default text_color_inactive mb-4'}>
          Вы - новый пользователь? 
          <Link to={URL_REGISTER} className={AppStyles.linkText}> Зарегистрироваться</Link>
        </span>
        <span className={'text text_type_main-default text_color_inactive'}>
          Забыли пароль?
          <Link to={URL_FORGOT} className={AppStyles.linkText}> Восстановить пароль</Link>
        </span>
      </div>
    </div>
  )
}

export default Login