import ky from 'ky'

export let apiUrl = 'http://localhost:3001/api/v2'

export const isDirect =
  process.env.SERVER_RUNNING === 'false' && !import.meta.env.PROD

if (isDirect) {
  apiUrl = 'https://ya-praktikum.tech/api/v2'
}

export const apiInstance = ky.create({
  prefixUrl: apiUrl,
  credentials: 'include',
})
