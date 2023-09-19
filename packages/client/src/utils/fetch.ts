type FetchMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

const baseUrl = 'https://ya-praktikum.tech/api/v2'

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
