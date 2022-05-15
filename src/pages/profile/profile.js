import React, { useState } from "react";
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import AppStyles from '../../components/App/App.module.css'
import ProfileStyles from './profile.module.css'
import { NavLink } from "react-router-dom"
import { URL_PROFILE, URL_ORDERS, URL_MAIN } from '../../utils/constants'
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../services/actions/auth";

const Profile = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const [name, setName] = useState(auth.authorized ? auth.name : '')
  const [email, setEmail] = useState(auth.authorized ? auth.email : '')
  const [form, setValue] = useState({email: '', password: '', name: ''})

  const logout = () => {
    dispatch(
      logoutUser()
    )
  }


  const inputRef = React.useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }

  const onChange = e => {
    setValue({...form, [e.target.name]: e.target.value})
  }

  return (
    <section className={`${ProfileStyles.profile} mt-30`}>
      <div className={`${ProfileStyles.leftContainer} mr-15`}>
        <NavLink 
          to={URL_PROFILE} 
          className={`${ProfileStyles.link} text text_type_main-medium text_color_inactive`}
          activeClassName={ProfileStyles.linkActive}
        >
          Профиль
        </NavLink>
        <NavLink 
          to={URL_ORDERS} 
          className={`${ProfileStyles.link} text text_type_main-medium text_color_inactive`}
          activeClassName={ProfileStyles.linkActive}
        >
          История заказов
        </NavLink>
        <p onClick={logout} className={`${ProfileStyles.link} text text_type_main-medium text_color_inactive mb-20`}>Выход</p>
        <p className={`${ProfileStyles.text} text text_type_main-medium text_color_inactive`}>В этом разделе вы можете изменить свои персональные данные</p>
      </div>
      <div className={ProfileStyles.middleContainer}>
        <div className={`${AppStyles.input} mb-6`}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={onChange}
            icon={'EditIcon'}
            value={name}
            name={'name'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
            className={'mb-6'}
          />
        </div>
        <div className={`${AppStyles.input} mb-6`}>
          <Input
            type={'email'}
            placeholder={'Логин'}
            onChange={onChange}
            icon={'EditIcon'}
            value={email}
            name={'email'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <div className={`${AppStyles.input}`}>
          <Input
            type={'password'}
            placeholder={'Пароль'}
            onChange={onChange}
            icon={'EditIcon'}
            value={form.password}
            name={'password'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
      </div>
    </section>
  )
}

export default Profile