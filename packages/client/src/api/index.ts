import ky from 'ky'

export let apiUrl = 'https://130.193.42.147:3001/api/v2'

export const isDirect =
  process.env.SERVER_RUNNING === 'false' &&
  process.env.NODE_ENV !== 'production'

if (isDirect) {
  apiUrl = 'https://ya-praktikum.tech/api/v2'
}

export const apiInstance = ky.create({
  prefixUrl: apiUrl,
  credentials: 'include',
})
