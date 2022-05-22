import React, { useState } from "react";
import ProfileStyles from './profile.module.css'
import { NavLink } from "react-router-dom"
import { URL_PROFILE, URL_ORDERS } from '../../utils/constants'
import { useDispatch } from "react-redux";
import { logout } from "../../services/actions/auth";

const Orders = () => {
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(
      logout()
    )
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
        <p onClick={logoutHandler} className={`${ProfileStyles.link} text text_type_main-medium text_color_inactive mb-20`}>Выход</p>
        <p className={`${ProfileStyles.text} text text_type_main-medium text_color_inactive`}>В этом разделе вы можете просмотреть свою историю заказов</p>
      </div>
      <div className={ProfileStyles.middleContainer}>
      </div>
    </section>
  )
}

export default Orders