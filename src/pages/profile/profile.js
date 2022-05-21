import React, { useState } from "react";
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import AppStyles from '../../components/App/App.module.css'
import ProfileStyles from './profile.module.css'
import { NavLink } from "react-router-dom"
import { URL_PROFILE, URL_ORDERS } from '../../utils/constants'
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, updateUser } from "../../services/actions/auth";

const Profile = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  let [name, setName] = useState(auth.authorized ? auth.name : '')
  const [email, setEmail] = useState(auth.authorized ? auth.email : '')
  const [password, setPassword] = useState('')

  const [editName, setEditName] = useState(false)
  const [editEmail, setEditEmail] = useState(false)
  const [editPassword, setEditPassword] = useState(false)

  const logout = () => {
    dispatch(
      logoutUser()
    )
  }

  const update = (name, email, password) => {
    dispatch(
      updateUser(name, email, password)
    )
    setEditName(false)
    setEditEmail(false)
    setEditPassword(false)
  }

  const cancelChanges = () => {
    setName(auth.name)
    setEmail(auth.email)
    setPassword('')
    setEditName(false)
    setEditEmail(false)
    setEditPassword(false)
  }

  return (
    <section className={`${ProfileStyles.profile} mt-30`}>
      <div className={`${ProfileStyles.leftContainer} mr-15`}>
        <NavLink 
          to={URL_PROFILE} 
          className={`${ProfileStyles.link} text text_type_main-medium text_color_inactive`}
          activeClassName={ProfileStyles.active}
        >
          Профиль
        </NavLink>
        <NavLink 
          to={URL_ORDERS} 
          className={`${ProfileStyles.link} text text_type_main-medium text_color_inactive`}
          activeClassName={ProfileStyles.active}
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
            onChange={(e) => setName(e.target.value)}
            icon={ editName ? 'CloseIcon' : 'EditIcon'}
            value={name}
            name={'name'}
            error={false}
            onIconClick={() => setEditName(!editName)}
            errorText={'Ошибка'}
            size={'default'}
            className={'mb-6'}
            disabled={editName === false}
          />
        </div>
        <div className={`${AppStyles.input} mb-6`}>
          <Input
            type={'email'}
            placeholder={'Логин'}
            onChange={(e) => setEmail(e.target.value)}
            icon={ editEmail ? 'CloseIcon' : 'EditIcon'}
            value={email}
            name={'email'}
            error={false}
            onIconClick={() => setEditEmail(!editEmail)}
            errorText={'Ошибка'}
            size={'default'}
            disabled={editEmail === false}
          />
        </div>
        <div className={`${AppStyles.input} mb-6`}>
          <Input
            type={'password'}
            placeholder={'Пароль'}
            onChange={(e) => setPassword(e.target.value)}
            icon={ editPassword ? 'CloseIcon' : 'EditIcon'}
            value={password}
            name={'password'}
            error={false}
            onIconClick={() => setEditPassword(!editPassword)}
            errorText={'Ошибка'}
            size={'default'}
            disabled={editPassword === false}
          />
        </div>
        {(editName || editEmail || editPassword) && <div className={ProfileStyles.buttons}>
          <Button type="secondary" size="medium" onClick={() => {cancelChanges()}}>
            Отмена
          </Button>
          <Button type="primary" size="medium" onClick={() => {update(name, email, password)}}>
            Сохранить
          </Button>
        </div>}
      </div>
    </section>
  )
}

export default Profile