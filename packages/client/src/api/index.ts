import ky from 'ky'

export let apiUrl = 'http://localhost:3001/api/v2'

const isDirect = process.env.VITE_DIRECT_URL

if (isDirect === 'true') {
  apiUrl = 'https://ya-praktikum.tech/api/v2'
}

export const apiInstance = ky.create({
  prefixUrl: apiUrl,
  credentials: 'include',
})
