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

export const Login: FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)

  const changeVisibilityPassword = useCallback(() => {
    setPasswordVisible(v => !v)
  }, [])
  return (
    <AuthLayout title="Login">
      <form>
        <Input label="login" name="login" block size="s" />
        <Gap size="s" />
        <PasswordInput
          label="password"
          name="password"
          block
          size="s"
          autoComplete="on"
          passwordVisible={passwordVisible}
          onPasswordVisibleChange={changeVisibilityPassword}
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
        <Button view="accent" type="submit" block size="s">
          Continue
        </Button>
      </form>
    </AuthLayout>
  )
}
