import { baseUrl } from '../constants/urls'

export const fetchMethods = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  delete: 'DELETE',
} as const

type KeysOfFetchMehods = keyof typeof fetchMethods

type FetchMethod = typeof fetchMethods[KeysOfFetchMehods]

export const fetchSekta = async (
  url: string,
  method: FetchMethod,
  body?: unknown
) => {
  try {
    const response = await fetch(`${baseUrl}${url}`, {
      method: method,
      ...(body ? { body: JSON.stringify(body) } : {}),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return response
  } catch (e) {
    console.error(e)
  }
}
