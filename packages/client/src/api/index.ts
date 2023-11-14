import ky from 'ky'

export let apiUrl = 'http://localhost:3001/api/v2'

const hasServer = process.env.SERVER_RUNNING

if (hasServer === 'false') {
  apiUrl = 'https://ya-praktikum.tech/api/v2'
}

export const apiInstance = ky.create({
  prefixUrl: apiUrl,
  credentials: 'include',
})
