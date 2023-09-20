import React from 'react'
import cn from 'classnames'
import { NavLink } from 'react-router-dom'

import styles from './NavbarLink.module.scss'

const NavbarLink = ({ children, icon, to, ...props }) => {
  return (
    <NavLink
      {...props}
      to={to}
      className={({ isActive }) =>
        isActive ? cn(styles.navbarlink, styles.active) : styles.navbarlink
      }>
      {icon && <span className="icon">{icon}</span>}
      {children}
    </NavLink>
  )
}

export { NavbarLink }
