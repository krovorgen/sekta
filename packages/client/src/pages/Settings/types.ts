import { FieldValues, Control } from 'react-hook-form'
import { User } from '../../types'

export type ProfileFieldProps = {
  control: Control<FieldValues, unknown>
  label: string
  name: string
}

export type ProfileFormProps = {
  onSubmit: (data: FieldValues, path: string) => void
  user?: User
}

export type ProfileNotification = {
  isVisible: boolean
  badge: 'positive' | 'negative'
  title: string
}

export type AvatarFormProps = {
  initials: string
  getUser: () => void
  avatar?: string
}
