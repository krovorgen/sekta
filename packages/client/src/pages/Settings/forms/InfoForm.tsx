import { Typography } from '@alfalab/core-components/typography/cssm'
import { Button } from '@alfalab/core-components/button/cssm'
import { Space } from '@alfalab/core-components/space'
import { FieldValues, useForm } from 'react-hook-form'

import { PhoneField, ProfileField } from './fields'
import styles from '../settings.module.scss'
import { ProfileFormProps } from '../types'

export const InfoForm = ({ onSubmit }: ProfileFormProps) => {
  const { control, handleSubmit } = useForm()

  const submit = (data: FieldValues) => onSubmit(data, '/user/profile')

  return (
    <section className={`${styles.box} ${styles.info}`}>
      <form onSubmit={handleSubmit(submit)}>
        <Space fullWidth>
          <Typography.Text view="primary-large"> Profile info</Typography.Text>
          <ProfileField
            control={control}
            label="First name"
            name="first_name"
          />

          <ProfileField
            control={control}
            label="Second name"
            name="second_name"
          />

          <ProfileField control={control} label="Email" name="email" />

          <ProfileField
            control={control}
            label="Display name"
            name="display_name"
          />

          <PhoneField control={control} label="Phone" name="phone" />

          <ProfileField control={control} label="Login" name="login" />

          <Button view="accent" type="submit">
            Update
          </Button>
        </Space>
      </form>
    </section>
  )
}
