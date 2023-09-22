import { baseUrl } from '../constants/urls'

export enum FetchMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const fetchSekta = async (
  url: string,
  method: FetchMethods,
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
