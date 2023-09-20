import React, { FC, memo, PropsWithChildren } from 'react'

import styles from './AuthLayout.module.scss'

type Props = {
  title: string
}

export const AuthLayout: FC<PropsWithChildren<Props>> = memo(
  ({ title, children }) => {
    return (
      <section className={styles.root}>
        <div className={styles.box}>
          <h1 className={styles.title}>{title}</h1>
          {children}
        </div>
      </section>
    )
  }
)
