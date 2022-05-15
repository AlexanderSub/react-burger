import React, { useCallback, useState } from "react";
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import {Link, useHistory} from 'react-router-dom'
import AppStyles from '../components/App/App.module.css'
import { URL_LOGIN, URL_RESET } from '../utils/utils'

const Forgot = () => {
  const [form, setValue] = useState({email: ''})
  const inputRef = React.useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }

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

  return (
    <div className={AppStyles.login}>
      <div className={AppStyles.card}>
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
          <Button onClick={() => goToPage(URL_RESET)} type="primary" size="medium">Восстановить</Button>
        </div>
        
        <span className={'text text_type_main-default text_color_inactive'}>
          Вспомнили пароль?
          <Link to={URL_LOGIN} className={AppStyles.linkText}> Войти</Link>
        </span>
      </div>
    </div>
  )
}

export default Forgot