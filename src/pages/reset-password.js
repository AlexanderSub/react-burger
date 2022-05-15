import React, { useCallback, useState } from "react";
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import {Link, useNavigate} from 'react-router-dom'
import AppStyles from '../components/App/App.module.css'
import { URL_LOGIN, URL_MAIN } from '../utils/utils'

const Reset = () => {
  const [form, setValue] = useState({password: '', code: ''})
  const inputRef = React.useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }

  const onChange = e => {
    setValue({...form, [e.target.name]: e.target.value})
  }

  const navigate = useNavigate()
  const goToPage = useCallback(
    (url) => {
      navigate({ pathname: url });
    },
    [navigate]
  );

  return (
    <div className={AppStyles.login}>
      <div className={AppStyles.card}>
        <h4 className={`text text_type_main-medium mb-6`}>Восстановление пароля</h4>
        <div className={`${AppStyles.input} mb-6`}>
          <Input
            type={'password'}
            placeholder={'Введите новый пароль'}
            onChange={onChange}
            icon={'ShowIcon'}
            value={form.password}
            name={'password'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <div className={`${AppStyles.input} mb-6`}>
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={onChange}
            value={form.code}
            name={'code'}
            size={'default'}
          />
        </div>
        <div className={'mb-20'}>
          <Button onClick={() => goToPage(URL_MAIN)} type="primary" size="medium">Сохранить</Button>
        </div>
        
        <span className={'text text_type_main-default text_color_inactive'}>
          Вспомнили пароль?
          <Link to={URL_LOGIN} className={AppStyles.linkText}> Войти</Link>
        </span>
      </div>
    </div>
  )
}

export default Reset