import React, { useCallback } from 'react'
import AppHeaderStyles from './AppHeader.module.css'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink, useHistory } from 'react-router-dom'
import { URL_PROFILE, URL_MAIN, URL_ORDERS } from '../../utils/utils'

const AppHeader = () => {
  const history = useHistory()
  const goToPage = useCallback(
    (url) => {
        history.replace({ pathname: url });
    },
    [history]
  ); 

  return (
    <header className={`${AppHeaderStyles.header} pt-4 pb-4`}>
      <nav className={AppHeaderStyles.nav}>
        <ul className={AppHeaderStyles.list}>
          <li className={AppHeaderStyles.navItem}>
            <button onClick={() => goToPage(URL_MAIN)} className={AppHeaderStyles.button}>
              <BurgerIcon type="primary"/>
              <p className={`text text_type_main-default ml-2`}>Конструктор</p>
            </button>
          </li>
          <li className={AppHeaderStyles.navItem}>
            <button onClick={() => goToPage(URL_ORDERS)} className={AppHeaderStyles.button}>
              <ListIcon type="secondary"/>
              <p className={`text text_type_main-default text_color_inactive ml-2`}>Лента заказов</p>
            </button>
          </li>
          <li className={AppHeaderStyles.navItem}>
            <Logo />
          </li>
          <li className={AppHeaderStyles.navItem}>
            <NavLink to={URL_PROFILE} className={AppHeaderStyles.button}>
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