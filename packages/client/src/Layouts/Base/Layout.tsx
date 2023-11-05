import React, { FC, useEffect, useState } from 'react'

import { Outlet } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../redux/store'
import { GlobalLoader } from '../../components/GlobalLoader/GlobalLoader'
import { getUserTC } from '../../redux/features/auth/authSlice'
import { Header } from './Header/Header'

import styles from './Layout.module.scss'
import { FullscreenButton } from '../../components/FullscreenButton/FullscreenButton'

const Layout: FC = () => {
  const dispatch = useAppDispatch()
  const loadingStatus = useAppSelector(state => state.auth.loadingStatus)
  const [isLoading, setIsLoading] = useState(false)

  const isRequested = loadingStatus !== 'idle'

  useEffect(() => {
    const getUser = async () => {
      try {
        await dispatch(getUserTC())
      } catch (e) {
        console.log(e)
      } finally {
        setIsLoading(false)
      }
    }
    if (!isRequested) {
      setIsLoading(true)
      getUser()
    }
  }, [isRequested])

  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}/api`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])

  return isLoading || !isRequested ? (
    <GlobalLoader />
  ) : (
    <div className={styles.layout}>
      <Header />
      <div className={styles.content}>
        <Outlet />
      </div>
      <FullscreenButton />
    </div>
  )
}

export { Layout }
