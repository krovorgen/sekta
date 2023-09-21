import React, { ReactNode } from 'react'

import styles from './Layout.module.scss'

interface ContentProps {
  children: ReactNode
}

const Content = ({ children }: ContentProps) => {
  return <div className={styles.content}>{children}</div>
}

export { Content }
