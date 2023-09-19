import { Input } from '@alfalab/core-components/input'
import { Space } from '@alfalab/core-components/space'
import { Button } from '@alfalab/core-components/button/cssm'
import { PhoneInput } from '@alfalab/core-components/phone-input/cssm'
import { Typography } from '@alfalab/core-components/typography/cssm'
import { Controller, FieldValues, useForm } from 'react-hook-form'

import styles from '../profile.module.scss'
import { ProfileFieldProps, ProfileFormProps } from '../types'

const ProfileField = ({ control, label, name }: ProfileFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <Input {...field} label={label} block />}
    />
  )
}

const PhoneField = ({ control, label, name }: ProfileFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <PhoneInput {...field} label={label} block />}
    />
  )
}

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
