import type express from 'express'
import { Theme } from './db'

export async function getThemeInstance(id: number) {
  const [themeInstance] = await Theme.findOrCreate({ where: { userId: id } })

  return themeInstance?.dataValues
}

async function loadProfile(req: express.Request) {
  const response = await fetch('https://ya-praktikum.tech/api/v2/auth/user', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      cookie: req.headers['cookie'] as string,
    },
    credentials: 'include',
  })

  if (!response.ok) return null

  const data = await response.json()

  return data
}

export async function loadState(req: express.Request) {
  const initialState = {
    auth: {
      user: null,
      loadingStatus: 'idle',
      theme: 'light',
    },
  }

  try {
    const user = await loadProfile(req)

    if (user) {
      const themeInstance = await getThemeInstance(user.id)

      if (themeInstance?.theme) initialState.auth.theme = themeInstance.theme
    }

    initialState.auth.user = user
    initialState.auth.loadingStatus = user ? 'loaded' : 'error'
  } catch (e) {
    console.error(e)
  }

  return initialState
}
