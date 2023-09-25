import React, { ComponentType, useEffect } from 'react'
import { useAppSelector } from '../redux/store'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from '../constants/routes'

import { User } from '../types'

type WithUserType = { user: User }

export const withUserCheck = <P extends WithUserType>(
  WrappedComponent: ComponentType<P>,
  isUserRequired = true
) => {
  return (props: Omit<P, keyof WithUserType>) => {
    const user = useAppSelector(state => state.auth.user)
    const navigate = useNavigate()

    useEffect(() => {
      if (user === null && isUserRequired) {
        navigate(`/${RoutePath.Login}`)
      }
      if (user && !isUserRequired) {
        navigate('/')
      }
    }, [user])

    if (user === null && isUserRequired) {
      return null
    }

    if (user && !isUserRequired) {
      return <WrappedComponent {...(props as P)} user={user} />
    }
    return <WrappedComponent {...(props as P)} />
  }
}
