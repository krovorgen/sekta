import { useState, FC } from 'react'
import { Gap } from '@alfalab/core-components/gap/cssm'
import { Notification } from '@alfalab/core-components/notification'
import { FieldValues } from 'react-hook-form'

import { Avatar } from './forms/AvatarForm'
import { InfoForm } from './forms/InfoForm'
import { PasswordForm } from './forms/PasswordForm'
import { fetchSekta } from '../../utils/fetch'
import { User } from '../../types/common'
import styles from './settings.module.scss'
import { ProfileNotification } from './types'

const notificationInitState: ProfileNotification = {
  isVisible: false,
  badge: 'positive',
  title: 'Success!',
}

export const Settings: FC = () => {
  const [user, setUser] = useState<User>()
  const [notification, setNotification] = useState<ProfileNotification>(
    notificationInitState
  )

  const hideNotification = () => {
    setNotification(notificationInitState)
  }

  const onSubmit = async (data: FieldValues, path: string) => {
    const response = await fetchSekta(path, 'PUT', data)

    if (response?.ok) {
      setNotification(prev => ({ ...prev, isVisible: true }))
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

  // Временный логин, нужно решить где будем хронить данные пользователя

  // useEffect(() => {
  //   const getUser = async () => {
  //     await fetchSekta('/auth/signin', 'POST', {
  //         login: "qqaa22",
  //         password: "QQaa1234"
  //       })

  //     const response = await fetchSekta('/auth/user', 'GET')
  //     const result = await response.json();
  //     setUser(result)
  //   }

  //  getUser()

  // }, [])

  const initials = user ? `${user.first_name[0]}${user.second_name[0]}` : 'XX'

  return (
    <div className={styles.pageContainer}>
      <div className={styles.content}>
        <div className={styles.contentPart}>
          <InfoForm onSubmit={onSubmit} />
        </div>
        <div className={styles.contentPart}>
          <Avatar avatar={user?.avatar} initials={initials} setUser={setUser} />
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
