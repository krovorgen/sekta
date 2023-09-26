import ky from 'ky'

export const apiInstance = ky.create({
  prefixUrl: 'https://ya-praktikum.tech/api/v2',
  credentials: 'include',
})
