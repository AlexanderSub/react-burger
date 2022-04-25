import React from 'react'
import NavBarStyles from './NavBar.module.css'
import NavItem from '../NavItem/NavItem'
import { BurgerIcon, MenuIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const NavBar = () => {
  return (
    <nav className={NavBarStyles.nav}>
      <ul className={NavBarStyles.list}>
        <NavItem text={'Конструктор'}>
          <BurgerIcon type="primary"/>
        </NavItem>
        <NavItem text={'Лента заказов'} className={`text_color_inactive`}>
          <MenuIcon type="secondary"/>
        </NavItem>
      </ul>
    </nav>
  )
}

export default NavBar