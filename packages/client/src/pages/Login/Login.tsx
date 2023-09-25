import React, { FC, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { Input } from '@alfalab/core-components/input/cssm'
import { Button } from '@alfalab/core-components/button/cssm'
import { PasswordInput } from '@alfalab/core-components/password-input/cssm'
import { Gap } from '@alfalab/core-components/gap/cssm'
import { Typography } from '@alfalab/core-components/typography/cssm'
import { Link as LinkUI } from '@alfalab/core-components/link/cssm'
import { AuthLayout } from '../../Layouts/AuthLayout/AuthLayout'
import { RoutePath } from '../../constants/routes'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { AuthApi, SignInDTO } from '../../api/AuthAPI'
import { HTTPError } from 'ky'
import { withUserCheck } from '../../HOC/withUserCheck'
import { useAppDispatch } from '../../redux/store'
import { getUserTC } from '../../redux/features/auth/authSlice'

const LoginPage: FC = () => {
  const { handleSubmit, control } = useForm<SignInDTO>()
  const dispatch = useAppDispatch()

  const [passwordVisible, setPasswordVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const changeVisibilityPassword = () => {
    setPasswordVisible(v => !v)
  }

  const onSubmit: SubmitHandler<SignInDTO> = useCallback(async data => {
    setIsLoading(true)
    try {
      await AuthApi.signIn(data)
      dispatch(getUserTC())
    } catch (error) {
      if (error instanceof HTTPError) {
        const responseBody = await error.response.json()
        // на моменте валидаций сделай красивый вывод ошибок
        console.log(responseBody.reason)
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="login"
          control={control}
          render={({ field }) => (
            <Input label="login" block size="s" {...field} />
          )}
        />
        <Gap size="s" />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <PasswordInput
              label="password"
              block
              size="s"
              autoComplete="on"
              passwordVisible={passwordVisible}
              onPasswordVisibleChange={changeVisibilityPassword}
              {...field}
            />
          )}
        />
        <Gap size="s" />
        <Typography.Text view="primary-medium">
          Don't have an account?{' '}
          <Link to={`/${RoutePath.Registration}`}>
            <LinkUI Component="span" underline={false} view="default">
              Sign up
            </LinkUI>
          </Link>
        </Typography.Text>
        <Gap size="s" />
        <Button view="accent" type="submit" block size="s" disabled={isLoading}>
          Continue
        </Button>
      </form>
    </AuthLayout>
  )
}

export const Login = withUserCheck(LoginPage, false)
