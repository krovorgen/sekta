import React, { FC, useEffect } from 'react'

import { Outlet } from 'react-router-dom'
import { Content } from './Content'

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
        <NavbarLink to="/settings">Профиль</NavbarLink>
        <NavbarLink to="/leaderboards">Таблица лидеров</NavbarLink>
        <NavbarLink to="/forum">Форум</NavbarLink>
      </Navbar>
      <Content>
        <Outlet />
      </Content>
    </div>
  )
}

export { Layout }