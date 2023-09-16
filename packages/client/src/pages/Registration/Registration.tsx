import React, { FC, useCallback, useState } from 'react'
import { AuthLayout } from '../../Layouts/AuthLayout/AuthLayout'
import { Input } from '@alfalab/core-components/input'
import { Gap } from '@alfalab/core-components/gap'
import { PasswordInput } from '@alfalab/core-components/password-input'
import { Button } from '@alfalab/core-components/button'
import { PhoneInput } from '@alfalab/core-components/phone-input'
import { Link } from 'react-router-dom'
import { Link as LinkUI } from '@alfalab/core-components/link'
import { RoutePath } from '../../constants/routes'
import { Typography } from '@alfalab/core-components/typography'

export const Registration: FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)

  const changeVisibilityPassword = useCallback(() => {
    setPasswordVisible(v => !v)
  }, [])
  return (
    <AuthLayout title="Registration">
      <form>
        <Input label="first name" name="first_name" block size="s" />
        <Gap size="s" />
        <Input label="second name" name="second_name" block size="s" />
        <Gap size="s" />
        <Input label="email" name="email" block size="s" />
        <Gap size="s" />
        <PhoneInput label="phone" name="phone" block size="s" />
        <Gap size="s" />
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
          Already have an account?{' '}
          <Link to={`/${RoutePath.Login}`}>
            <LinkUI Component="span" underline={false} view="default">
              Sign in
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
