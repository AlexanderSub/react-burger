import React, { useCallback, useState } from "react";
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import AppStyles from '../components/App/App.module.css'
import { URL_REGISTER, URL_FORGOT, URL_MAIN } from '../utils/utils'
import { useAuth } from "../services/auth";

const Login = () => {
  const navigate = useNavigate()
  const goToPage = useCallback(
    (url) => {
      navigate({ pathname: url });
    },
    [navigate]
  )

  let auth = useAuth()
  const [form, setValue] = useState({email: '', password: ''})
  
  //Проверить надо или нет
  const inputRef = React.useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }


  const onChange = e => {
    setValue({...form, [e.target.name]: e.target.value})
  }

  let login = useCallback(
    e => {
      e.preventDefault()
      auth.signIn(form)
    },
    [auth, form]
  )

  if (auth.user) {
    return (
      <Navigate replace to={{
          pathname: '/'
        }}
      />
    )
  }

  return (
    <div className={AppStyles.login}>
      <form className={AppStyles.card}>
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
          <Input
            type={'password'}
            placeholder={'Пароль'}
            onChange={onChange}
            icon={'ShowIcon'}
            value={form.password}
            name={'password'}
            ref={inputRef}
            onIconClick={onIconClick}
            size={'default'}
          />
        </div>
        <div className={'mb-20'}>
          <Button onClick={login} type="primary" size="medium">Войти</Button>
        </div>
        
        <span className={'text text_type_main-default text_color_inactive mb-4'}>
          Вы - новый пользователь? 
          <Link to={URL_REGISTER} className={AppStyles.linkText}> Зарегистрироваться</Link>
        </span>
        <span className={'text text_type_main-default text_color_inactive'}>
          Забыли пароль?
          <Link to={URL_FORGOT} className={AppStyles.linkText}> Восстановить пароль</Link>
        </span>
      </form>
    </div>
  )
}

export default Login