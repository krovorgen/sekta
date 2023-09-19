import { Space } from '@alfalab/core-components/space'
import { PasswordInput } from '@alfalab/core-components/password-input/cssm'
import { Button } from '@alfalab/core-components/button/cssm'
import { Typography } from '@alfalab/core-components/typography/cssm'
import { Controller, FieldValues, useForm } from 'react-hook-form'

import styles from '../profile.module.scss'
import { ProfileFormProps, ProfileFieldProps } from '../types'

const PasswordField = ({ control, label, name }: ProfileFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <PasswordInput {...field} label={label} block />}
    />
  )
}

export const PasswordForm = ({ onSubmit }: ProfileFormProps) => {
  const { control, handleSubmit } = useForm()

  const submit = (data: FieldValues) => onSubmit(data, '/user/password')

  return (
    <section className={styles.box}>
      <form onSubmit={handleSubmit(submit)}>
        <Space fullWidth>
          <Typography.Text view="primary-large">Password</Typography.Text>
          <PasswordField
            control={control}
            label="Old password"
            name="oldPassword"
          />
          <PasswordField
            control={control}
            label="New password"
            name="newPassword"
          />
          <PasswordField
            control={control}
            label="Repeat password"
            name="repeatPassword"
          />
          <Button view="accent" type="submit" block size="s">
            Update password
          </Button>
        </Space>
      </form>
    </section>
  )
}
