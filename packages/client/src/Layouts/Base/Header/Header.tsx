import React, { FC } from 'react'
import { NavbarLink } from '../navbar-link/NavbarLink'
import { RoutePath } from '../../../constants/routes'
import { Navbar } from '../navbar/Navbar'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import { logoutTC } from '../../../redux/features/auth/authSlice'

export const Header: FC = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.auth.user)
  const isOnline = window.navigator.onLine

  const onLogout = async () => {
    await dispatch(logoutTC())
  }

  return (
    <Navbar>
      {user && isOnline ? (
        <>
          <NavbarLink to="/">Игра</NavbarLink>
          <NavbarLink to={RoutePath.Settings}>Профиль</NavbarLink>
          <NavbarLink to={RoutePath.Forum}>Форум</NavbarLink>
          <NavbarLink to={RoutePath.Leaderboards}>Таблица лидеров</NavbarLink>
          <NavbarLink onClick={onLogout}>Выйти</NavbarLink>
        </>
      ) : (
        <>
          <NavbarLink to={RoutePath.Login}>Логин</NavbarLink>
          <NavbarLink to={RoutePath.Registration}>Регистрация</NavbarLink>
        </>
      )}
    </Navbar>
  )
}
