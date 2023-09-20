import { Typography } from '@alfalab/core-components/typography/cssm'
import { Button } from '@alfalab/core-components/button/cssm'
import { Space } from '@alfalab/core-components/space'
import { FieldValues, useForm } from 'react-hook-form'

import styles from '../settings.module.scss'
import { ProfileFormProps } from '../types'
import { PasswordField } from './fields'

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
