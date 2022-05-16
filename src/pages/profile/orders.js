import React, { useState } from "react";
import AppStyles from '../../components/App/App.module.css'
import ProfileStyles from './profile.module.css'
import { NavLink } from "react-router-dom"
import { URL_PROFILE, URL_ORDERS, URL_MAIN } from '../../utils/constants'
import { useDispatch } from "react-redux";
import { logoutUser } from "../../services/actions/auth";

const Orders = () => {
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(
      logoutUser()
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
        <p onClick={logout} className={`${ProfileStyles.link} text text_type_main-medium text_color_inactive mb-20`}>Выход</p>
        <p className={`${ProfileStyles.text} text text_type_main-medium text_color_inactive`}>В этом разделе вы можете просмотреть свою историю заказов</p>
      </div>
      <div className={ProfileStyles.middleContainer}>



      </div>
    </section>
  )
}

export default Orders