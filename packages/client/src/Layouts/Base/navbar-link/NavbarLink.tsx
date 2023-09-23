import React, { ReactNode } from 'react'
import cn from 'classnames'
import { NavLink } from 'react-router-dom'

import styles from './NavbarLink.module.scss'

interface NavbarLinkProps extends React.PropsWithChildren {
  to: string
  icon?: ReactNode
}

const NavbarLink = ({ children, icon, to, ...props }: NavbarLinkProps) => {
  return (
    <NavLink
      {...props}
      to={to}
      className={({ isActive }) =>
        cn(styles.navbarlink, {
          [styles.active]: isActive,
        })
      }>
      {icon && <span className="icon">{icon}</span>}
      {children}
    </NavLink>
  )
}

export { NavbarLink }
