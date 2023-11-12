import React, { FC, useEffect, useState } from 'react'

import { Outlet } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../redux/store'
import { GlobalLoader } from '../../components/GlobalLoader/GlobalLoader'
import {
  getUserTC,
  userLoadingStatusSelector,
} from '../../redux/features/auth/authSlice'
import { Header } from './Header/Header'
import cn from 'classnames'
import styles from './Layout.module.scss'
import { FullscreenButton } from '../../components/FullscreenButton/FullscreenButton'

const Layout: FC = () => {
  const dispatch = useAppDispatch()
  const theme = useAppSelector(state => state.auth.theme)
  const loadingStatus = useAppSelector(userLoadingStatusSelector)
  const [isLoading, setIsLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const isRequested = loadingStatus !== 'idle'

  useEffect(() => {
    const getUser = async () => {
      try {
        await dispatch(getUserTC())
      } catch (e) {
        console.error(e)
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

    setIsMounted(true)
  }, [])
  // to fix hydration error stackoverflow.com/questions/71706064
  if (!isMounted) return null

  return isLoading || !isRequested ? (
    <GlobalLoader />
  ) : (
    <div
      className={cn({
        [styles.layout_light]: theme === 'light',
        [styles.layout_dark]: theme === 'dark',
      })}>
      <Header />
      <div className={styles.content}>
        <Outlet />
      </div>
      <FullscreenButton />
    </div>
  )
}

export { Layout }
