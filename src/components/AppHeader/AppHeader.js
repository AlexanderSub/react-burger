import React from 'react'
import AppHeaderStyles from './AppHeader.module.css'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink } from 'react-router-dom'
import { URL_PROFILE, URL_MAIN, URL_FEED } from '../../utils/constants'

const AppHeader = () => {
  return (
    <header className={`${AppHeaderStyles.header} pt-4 pb-4`}>
      <nav className={AppHeaderStyles.nav}>
        <ul className={AppHeaderStyles.list}>
          <li className={AppHeaderStyles.navItem}>
            <NavLink exact to={URL_MAIN} className={AppHeaderStyles.button} activeClassName={AppHeaderStyles.active}>
              <BurgerIcon type="secondary"/>
              <p className={`text text_type_main-default text_color_inactive ml-2`}>Конструктор</p>
            </NavLink>
          </li>
          <li className={AppHeaderStyles.navItem}>
            <NavLink exact to={URL_FEED} className={AppHeaderStyles.button} activeClassName={AppHeaderStyles.active}>
              <ListIcon type="secondary"/>
              <p className={`text text_type_main-default text_color_inactive ml-2`}>Лента заказов</p>
            </NavLink>
          </li>
          <li className={AppHeaderStyles.navItem}>
            <NavLink to={URL_MAIN}>
              <Logo />
            </NavLink>
          </li>
          <li className={AppHeaderStyles.navItem}>
            <NavLink to={URL_PROFILE} className={AppHeaderStyles.button} activeClassName={AppHeaderStyles.active}>
              <ProfileIcon type="secondary"/>
              <p className={`text text_type_main-default text_color_inactive ml-2`}>Личный кабинет</p>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader