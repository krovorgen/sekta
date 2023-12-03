import ky from 'ky'

const isDev = () => process.env.NODE_ENV === 'development'

export const apiUrl = !isDev()
  ? 'https://fire-runner.ya-praktikum.tech/api/'
  : 'http://localhost:3001/api/'

export const proxyRoutePrefix = 'v2'

export const redirect_uri = !isDev()
  ? 'https://fire-runner.ya-praktikum.tech'
  : 'http://localhost:3001/signin'

export const apiInstance = ky.create({
  prefixUrl: apiUrl,
  credentials: 'include',
})
