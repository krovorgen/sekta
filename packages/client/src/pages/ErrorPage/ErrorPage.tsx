import { FC } from 'react'
import { useNavigate, useRouteError } from 'react-router-dom'
import { isRouteErrorResponse } from 'react-router'

import { Typography } from '@alfalab/core-components/typography/cssm'
import { Gap } from '@alfalab/core-components/gap/cssm'
import { Button } from '@alfalab/core-components/button'

import st from './ErrorPage.module.scss'

type ErrorResponse = {
  status: number
  message?: string
}

export const ErrorPage: FC = () => {
  const navigate = useNavigate()
  const error = useRouteError() as ErrorResponse

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

  return (
    <div className={st.root}>
      <div className={st.container}>
        <Typography.Title tag="h1" color="static-secondary-dark" view="xlarge">
          {error?.status}
        </Typography.Title>
        <Gap size="xs" />
        <Typography.Title tag="h2" color="static-secondary-dark" view="small">
          {errorMessage}
        </Typography.Title>
        <Gap size="xs" />
        <Button onClick={() => navigate(-1)} view="link" size="xxs">
          Вернуться
        </Button>
      </div>
    </div>
  )
}
