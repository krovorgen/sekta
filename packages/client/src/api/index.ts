import ky from 'ky'

export const apiUrl = 'https://fire-runner.ya-praktikum.tech/api/'

export const proxyRoutePrefix = 'v2'

export const redirect_uri = 'https://fire-runner.ya-praktikum.tech/signin'

export const apiInstance = ky.create({
  prefixUrl: apiUrl,
  credentials: 'include',
})
