import { useCallback, useState } from "react"
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import {Link, Redirect, useHistory, useLocation} from 'react-router-dom'
import AppStyles from '../components/App/App.module.css'
import { useDispatch, useSelector } from "react-redux"
import { register } from "../services/actions/auth"

const Register = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const history = useHistory()

  const [form, setValue] = useState({email: '', password: '', name: ''})
  const isAuthorized = useSelector(state => state.auth.authorized)
  
  const goToPage = useCallback(
    (url) => {
        history.replace({ pathname: url });
    },
    [history]
  )

  const onChange = e => {
    setValue({...form, [e.target.name]: e.target.value})
  }

  const registerHandler = useCallback(
    e => {
      e.preventDefault()
      dispatch(register(form))
      goToPage('/')
    },
    [dispatch, form]
  )

  if (isAuthorized) {
    const { from } = location.state || { from: { pathname: '/' } }
    return (
      <Redirect 
        to={ from }
      />
    )
  } else {
    return (
      <div className={AppStyles.login}>
        <form onSubmit={registerHandler} className={AppStyles.card}>
          <h4 className={`text text_type_main-medium mb-6`}>Регистрация</h4>
          <div className={`${AppStyles.input} mb-6`}>
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={onChange}
              value={form.name}
              name={'name'}
              error={false}
              errorText={'Ошибка'}
              size={'default'}
            />
          </div>
          <div className={`${AppStyles.input} mb-6`}>
            <Input
              type={'email'}
              placeholder={'E-mail'}
              onChange={onChange}
              value={form.email}
              name={'email'}
              error={false}
              errorText={'Ошибка'}
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
              error={false}
              errorText={'Ошибка'}
              size={'default'}
            />
          </div>
          <div className={'mb-20'}>
            <Button
              type="primary"
              size="medium"
              disabled={form.name.length === 0 || form.email.length === 0 || form.password.length === 0}
            >
              Зарегистрироваться
            </Button>
          </div>
          
          <span className={'text text_type_main-default text_color_inactive'}>
          Уже зарегистрированы?
            <Link to={'/login'} className={AppStyles.linkText}> Войти</Link>
          </span>
        </form>
      </div>
    )
  }

  
}

export default Register