import { Typography } from '@alfalab/core-components/typography/cssm'
import { Button } from '@alfalab/core-components/button/cssm'
import { Space } from '@alfalab/core-components/space'
import { FieldValues, useForm } from 'react-hook-form'
import classNames from 'classnames/bind'

import { PhoneField, ProfileField } from './fields'
import styles from '../Settings.module.scss'
import { ProfileFormProps } from '../types'

const cn = classNames.bind(styles)

export const InfoForm = ({ onSubmit, user }: ProfileFormProps) => {
  const { control, handleSubmit } = useForm<FieldValues>({ values: user })

  const submit = (data: FieldValues) => onSubmit(data, '/user/profile')

  const infoSectionClass = cn(styles.box, styles.info)

  return (
    <section className={infoSectionClass}>
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
