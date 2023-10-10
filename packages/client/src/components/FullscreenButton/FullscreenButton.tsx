import React from 'react'
import screenfull from 'screenfull'

import fullscreenIcon from '../../assets/icons/fullscreen.svg'

import styles from './FullscreenButton.module.scss'

export const FullscreenButton = () => {
  const toggleFullscreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle()
    }
  }

  if (!screenfull.isEnabled) return null

  return (
    <button
      onClick={toggleFullscreen}
      className={styles.fullscreen}
      type="button">
      <img
        className={styles.icon}
        src={fullscreenIcon}
        width={24}
        height={24}
        alt="fullscreen"
      />
    </button>
  )
}
