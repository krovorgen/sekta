import { FieldValues, Control } from 'react-hook-form'
import { User } from '../../types/common'

export type ProfileFieldProps = {
  control: Control<FieldValues, unknown>
  label: string
  name: string
}

export type ProfileFormProps = {
  onSubmit: (data: FieldValues, path: string) => void
}

export type ProfileNotification = {
  isVisible: boolean
  badge: 'positive' | 'negative'
  title: string
}

export type AvatarFormProps = {
  initials: string
  setUser: (value: User) => void
  avatar?: string
}
