import React, { useEffect, ReactNode, FC } from 'react'
import { BsMoonFill, BsSun } from 'react-icons/bs'
import styles from './Navbar.module.scss'
import { useAppDispatch, useAppSelector } from '../../../redux/store'

import { setTheme } from '../../../redux/features/auth/authSlice'
interface NavbarProps {
  children: ReactNode
}

type Props = {
  onClick: () => void
  theme: string
}

const ThemeSwtcher: FC<Props> = ({ onClick, theme }) => {
  return (
    <button className={styles.switchThemeBtn} onClick={onClick}>
      {theme === 'light' && (
        <>
          <BsSun />
          light theme
        </>
      )}
      {theme === 'dark' && (
        <>
          <BsMoonFill />
          dark theme
        </>
      )}
    </button>
  )
}

const Navbar = ({ children }: NavbarProps) => {
  const dispatch = useAppDispatch()
  const theme = useAppSelector(state => state.auth.theme)
  const user = useAppSelector(state => state.auth.user)

  const toggleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))
  }

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className={styles.root}>
      {/* тут можно лого какое-нибудь прикрепить */}
      <div className={styles.links}>
        {user && <ThemeSwtcher theme={theme} onClick={toggleTheme} />}
        {children}
      </div>
    </div>
  )
}

export { Navbar }
