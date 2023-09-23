import React, { FC, useEffect } from 'react'

import { Outlet } from 'react-router-dom'
import { RoutePath } from '../../constants/routes'

import { NavbarLink } from './navbar-link/NavbarLink'
import { Navbar } from './navbar/Navbar'

import styles from './Layout.module.scss'

const Layout: FC = () => {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])

  return (
    <div className={styles.layout}>
      <Navbar>
        <NavbarLink to="/">Игра</NavbarLink>
        <NavbarLink to={RoutePath.Settings}>Профиль</NavbarLink>
        <NavbarLink to={RoutePath.Leaderboards}>Таблица лидеров</NavbarLink>
        <NavbarLink to={RoutePath.Forum}>Форум</NavbarLink>
      </Navbar>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}

export { Layout }
