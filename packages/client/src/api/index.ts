import ky from 'ky'

let apiUrl = 'http://localhost:3000/api/v2'

if (import.meta.env.VITE_DIRECT_URL) {
  apiUrl = 'https://ya-praktikum.tech/api/v2'
}

export const apiInstance = ky.create({
  prefixUrl: apiUrl,
  credentials: 'include',
})
