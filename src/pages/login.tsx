import { ChangeEvent, useCallback, useState } from "react";
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Redirect, useLocation } from 'react-router-dom'
import AppStyles from '../components/App/App.module.css'
import { useDispatch, useSelector } from '../services/hooks'
import { loginUserRequest } from "../services/actions/auth";
import { TLocationState } from "../services/types/data";

const Login = () => {
  const dispatch = useDispatch()
  const location = useLocation<TLocationState>()
  const isAuthorized = useSelector(state => state.auth.authorized)

  const [form, setValue] = useState({email: '', password: ''})

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({...form, [e.target.name]: e.target.value})
  }

  const login = useCallback(
    e => {
      e.preventDefault()
      dispatch(loginUserRequest(form))
    },
    [dispatch, form]
  )

  if (isAuthorized) {
    let { from } = location.state || { from: { pathname: '/' } }
    return (
      <Redirect 
        to={ location.state?.from || '/' }
      />
    )
  } else {
    return (
      <div className={AppStyles.login}>
        <form onSubmit={login} className={AppStyles.card}>
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
              size={'default'}
            />
          </div>
          <div className={'mb-20'}>
            <Button type='primary' size="medium" disabled={form.password.length === 0 || form.email.length === 0}>Войти</Button>
          </div>
          
          <span className={'text text_type_main-default text_color_inactive mb-4'}>
            Вы - новый пользователь? 
            <Link to={'/register'} className={AppStyles.linkText}> Зарегистрироваться</Link>
          </span>
          <span className={'text text_type_main-default text_color_inactive'}>
            Забыли пароль?
            <Link to='/forgot-password' className={AppStyles.linkText}> Восстановить пароль</Link>
          </span>
        </form>
      </div>
    )
  }
}

export default Login