import { useState, FC } from 'react'
import { Gap } from '@alfalab/core-components/gap/cssm'
import { Notification } from '@alfalab/core-components/notification'
import { FieldValues } from 'react-hook-form'

import { withUserCheck } from '../../HOC/withUserCheck'
import { PropsWithUser } from '../../types'
import { Avatar } from './forms/AvatarForm'
import { InfoForm } from './forms/InfoForm'
import { PasswordForm } from './forms/PasswordForm'
import { FetchMethods, fetchSekta } from '../../utils/fetch'
import styles from './Settings.module.scss'
import { ProfileNotification } from './types'
import { useAppSelector } from '../../redux/store'
import { useAppDispatch } from '../../redux/store'
import { getUserTC } from '../../redux/features/auth/authSlice'

const notificationInitState: ProfileNotification = {
  isVisible: false,
  badge: 'positive',
  title: 'Success!',
}

const SettingsPage: FC<PropsWithUser> = () => {
  const user = useAppSelector(state => state.auth.user)
  const [notification, setNotification] = useState<ProfileNotification>(
    notificationInitState
  )
  const dispatch = useAppDispatch()

  const getUser = () => dispatch(getUserTC())

  const hideNotification = () => {
    setNotification(notificationInitState)
  }

  const onSubmit = async (data: FieldValues, path: string) => {
    const response = await fetchSekta(path, FetchMethods.PUT, data)

    if (response?.ok) {
      setNotification(prev => ({ ...prev, isVisible: true }))
      getUser()
    } else if (response && !response.ok) {
      const result = await response.json()
      setNotification({
        isVisible: true,
        badge: 'negative',
        title: result.reason,
      })
    } else {
      setNotification({
        isVisible: true,
        badge: 'negative',
        title: 'Error!',
      })
    }
  }

  const initials = user ? `${user.first_name[0]}${user.second_name[0]}` : 'XX'

  return (
    <div className={styles.pageContainer}>
      <div className={styles.content}>
        <div className={styles.contentPart}>
          {user && <InfoForm onSubmit={onSubmit} user={user} />}
        </div>
        <div className={styles.contentPart}>
          <Avatar avatar={user?.avatar} initials={initials} getUser={getUser} />
          <Gap size="m" />
          <PasswordForm onSubmit={onSubmit} />
        </div>
      </div>
      <Notification
        badge={notification.badge}
        title={notification.title}
        visible={notification.isVisible}
        onClose={hideNotification}
        onCloseTimeout={hideNotification}
      />
    </div>
  )
}

export const Settings = withUserCheck(SettingsPage)
