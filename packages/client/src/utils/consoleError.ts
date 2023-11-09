import { HTTPError } from 'ky'

export const consoleLogger = async (error: unknown) => {
  if (error instanceof HTTPError) {
    const responseBody = await error.response.json()
    console.log(responseBody.reason)
  }
}
