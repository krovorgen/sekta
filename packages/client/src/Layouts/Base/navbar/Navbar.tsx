import React from 'react'

import styles from './Navbar.module.scss'

const Navbar = ({ children }) => {
  return (
    <div className={styles.root}>
      {/* тут можно лого какое-нибудь прикрепить */}
      <div className={styles.links}>{children}</div>
    </div>
  )
}

export { Navbar }
