import React from "react";

import NavItemStyles from './NavItem.module.css'

const NavItem = ({className, children, text}) => {
  return (
    <li className={`${NavItemStyles.navItem} pl-5 pr-5`}>
      {children}
      <p className={`${className} text text_type_main-default ml-2`}>{text}</p>
    </li>
  )
}

export default NavItem