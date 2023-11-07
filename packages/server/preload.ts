import type express from 'express'

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
    },
  }

  try {
    const user = await loadProfile(req)
    initialState.auth.user = user
    initialState.auth.loadingStatus = user ? 'loaded' : 'error'
  } catch (e) {
    console.error(e)
  }

  return initialState
}
