import { PasswordInput } from '@alfalab/core-components/password-input/cssm'
import { PhoneInput } from '@alfalab/core-components/phone-input/cssm'
import { Input } from '@alfalab/core-components/input'
import { Controller } from 'react-hook-form'
import { useAppSelector } from '../../../redux/store'

import { ProfileFieldProps } from '../types'

export const ProfileField = ({ control, label, name }: ProfileFieldProps) => {
  const theme = useAppSelector(state => state.auth.theme)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          {...field}
          value={field.value ?? ''}
          label={label}
          block
          colors={theme === 'light' ? 'default' : 'inverted'}
        />
      )}
    />
  )
}

export const PhoneField = ({ control, label, name }: ProfileFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <PhoneInput {...field} label={label} block />}
    />
  )
}

export const PasswordField = ({ control, label, name }: ProfileFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <PasswordInput {...field} label={label} block />}
    />
  )
}
