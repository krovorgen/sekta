import { FC } from 'react'
import { useRouteError } from 'react-router-dom'
import { isRouteErrorResponse } from 'react-router'

export const ErrorPage: FC = () => {
  const error = useRouteError()

  let errorMessage = 'Something went wrong'

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 401:
        errorMessage = "You aren't authorized to see this"
        break
      case 404:
        errorMessage = 'Page not found'
        break
      case 418:
        errorMessage = '🫖'
        break
      case 500:
        errorMessage = 'Internal Server Error'
        break
      case 503:
        errorMessage = 'Looks like our API is down'
        break
      default:
        break
    }
  } else if (error instanceof Error) {
    errorMessage = error.message
  }

  return <div>{errorMessage}</div>
}
