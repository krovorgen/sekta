import React from 'react'

import styles from './Layout.module.scss'

const Content = ({ children }) => {
  return <div className={styles.content}>{children}</div>
}

export { Content }
