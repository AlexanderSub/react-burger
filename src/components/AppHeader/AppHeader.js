import React from 'react'
import AppHeaderStyles from './AppHeader.module.css'
import { Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import NavBar from '../NavBar/NavBar'
import NavItem from '../NavItem/NavItem'

const AppHeader = () => {
  return (
    <header className={`${AppHeaderStyles.header} pt-4 pb-4`}>
      <NavBar />
      <Logo />
      <NavItem text={'Личный кабинет'} className={'text_color_inactive'}>
        <ProfileIcon type="secondary"/>
      </NavItem>
    </header>
  )
}

export default AppHeader