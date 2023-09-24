import React, { FC, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthLayout } from '../../Layouts/AuthLayout/AuthLayout'
import { RoutePath } from '../../constants/routes'
import { Input } from '@alfalab/core-components/input/cssm'
import { Gap } from '@alfalab/core-components/gap/cssm'
import { PasswordInput } from '@alfalab/core-components/password-input/cssm'
import { Button } from '@alfalab/core-components/button/cssm'
import { PhoneInput } from '@alfalab/core-components/phone-input/cssm'
import { Link as LinkUI } from '@alfalab/core-components/link/cssm'
import { Typography } from '@alfalab/core-components/typography/cssm'
import { withUserCheck } from '../../HOC/withUserCheck'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { AuthApi, SignUpDTO } from '../../api/AuthAPI'
import { useAppDispatch } from '../../redux/store'
import { getUserTC } from '../../redux/features/auth/authSlice'
import { HTTPError } from 'ky'

const RegistrationPage: FC = () => {
  const { handleSubmit, control } = useForm<SignUpDTO>()
  const dispatch = useAppDispatch()

  const [passwordVisible, setPasswordVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const changeVisibilityPassword = useCallback(() => {
    setPasswordVisible(v => !v)
  }, [])

  const onSubmit: SubmitHandler<SignUpDTO> = useCallback(async data => {
    setIsLoading(true)
    try {
      await AuthApi.signUp(data)
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
    <AuthLayout title="Registration">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="first_name"
          control={control}
          render={({ field }) => (
            <Input label="first name" block size="s" {...field} />
          )}
        />
        <Gap size="s" />
        <Controller
          name="second_name"
          control={control}
          render={({ field }) => (
            <Input label="second name" block size="s" {...field} />
          )}
        />
        <Gap size="s" />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input label="email" block size="s" {...field} />
          )}
        />
        <Gap size="s" />
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <PhoneInput label="phone" block size="s" {...field} />
          )}
        />
        <Gap size="s" />
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
          Already have an account?{' '}
          <Link to={`/${RoutePath.Login}`}>
            <LinkUI Component="span" underline={false} view="default">
              Sign in
            </LinkUI>
          </Link>
        </Typography.Text>
        <Gap size="s" />
        <Button view="accent" type="submit" disabled={isLoading} block size="s">
          Continue
        </Button>
      </form>
    </AuthLayout>
  )
}

export const Registration = withUserCheck(RegistrationPage, false)
