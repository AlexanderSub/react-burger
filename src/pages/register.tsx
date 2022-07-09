import { ChangeEvent, useCallback, useState } from "react"
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import {Link, Redirect, useHistory, useLocation} from 'react-router-dom'
import AppStyles from '../components/App/App.module.css'
import { useDispatch, useSelector } from '../services/hooks'
import { register } from "../services/actions/auth"
import { TLocationState } from "../services/types/data"

const Register = () => {
  const location = useLocation<TLocationState>()
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

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    return (
      <Redirect 
        to={ location.state?.from || '/' }
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
            <Input
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