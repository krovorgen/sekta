import React, { ReactNode } from 'react'

import styles from './Navbar.module.scss'

interface NavbarProps {
  children: ReactNode
}

const Navbar = ({ children }: NavbarProps) => {
  return (
    <div className={styles.root}>
      {/* тут можно лого какое-нибудь прикрепить */}
      <div className={styles.links}>{children}</div>
    </div>
  )
}

export { Navbar }
