import React, { FC, useEffect, useState } from 'react'

import { Outlet } from 'react-router-dom'

import { useAppDispatch } from '../../redux/store'
import { GlobalLoader } from '../../components/GlobalLoader/GlobalLoader'
import { getUserTC } from '../../redux/features/auth/authSlice'
import { Header } from './Header/Header'

import styles from './Layout.module.scss'

const Layout: FC = () => {
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        await dispatch(getUserTC())
      } catch (e) {
        console.log(e)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])

  return isLoading ? (
    <GlobalLoader />
  ) : (
    <div className={styles.layout}>
      <Header />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}

export { Layout }
