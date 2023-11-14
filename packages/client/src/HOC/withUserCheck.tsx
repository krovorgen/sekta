import React, { ComponentType, useEffect } from 'react'
import { useAppSelector } from '../redux/store'
import { useNavigate, useLocation } from 'react-router-dom'
import { RoutePath } from '../constants/routes'

import { User } from '../types'
import { AuthApi } from '../api/AuthAPI'

type WithUserType = { user: User }

const hasServer = process.env.SERVER_RUNNING

const fetchServerData = async (code: string): Promise<void> => {
  await AuthApi.getYandexAccount({
    code,
    redirect_uri: 'http://localhost:3000/signin',
  })
  window.location.href = hasServer === 'true' ? 'http://localhost:3001' : '/'
}

export const withUserCheck = <P extends WithUserType>(
  WrappedComponent: ComponentType<P>,
  isUserRequired = true
) => {
  return (props: Omit<P, keyof WithUserType>) => {
    const user = useAppSelector(state => state.auth.user)
    const navigate = useNavigate()
    const location = useLocation()
    const isOnline = typeof window !== 'undefined' && window.navigator.onLine
    const searchStr = location.search
    const code = searchStr.match(/\d+/)

    useEffect(() => {
      if (user && !isUserRequired) {
        navigate('/')
        return
      }
      if (code) {
        fetchServerData(code[0])
        return
      }
      if (user === null && isUserRequired && isOnline) {
        navigate(`/${RoutePath.Login}`)
      }
    }, [user, code])

    if (!user && isUserRequired && isOnline) {
      return null
    }

    if (user && isUserRequired) {
      return <WrappedComponent {...(props as P)} user={user} />
    }
    return <WrappedComponent {...(props as P)} />
  }
}
