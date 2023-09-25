import React, { FC } from 'react'

import styles from './GlobalLoader.module.scss'

export const GlobalLoader: FC = () => {
  return (
    <svg className={styles.svg} viewBox="0 0 1320 300">
      <text
        className={styles.text}
        x="50%"
        y="50%"
        dy=".35em"
        textAnchor="middle">
        SEKTA
      </text>
    </svg>
  )
}
