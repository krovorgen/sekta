import { ChangeEvent } from 'react'
import { Attach } from '@alfalab/core-components/attach'
import { Typography } from '@alfalab/core-components/typography/cssm'

import styles from '../profile.module.scss'
import { AvatarFormProps } from '../types'

const resourcesUrl = 'https://ya-praktikum.tech/api/v2/resources'
const apiUrl = 'https://ya-praktikum.tech/api/v2/user/profile/avatar'

export const Avatar = ({ avatar, initials, setUser }: AvatarFormProps) => {
  const handleUpload = async (
    _e: ChangeEvent<HTMLInputElement>,
    payload: { files: File[] }
  ) => {
    const formData = new FormData()

    formData.append('avatar', payload.files[0])

    const response = await fetch(apiUrl, {
      method: 'PUT',
      body: formData,
      credentials: 'include',
    })
    const result = await response.json()

    setUser(result)
  }

  return (
    <section className={`${styles.box} ${styles.avatar}`}>
      <Typography.Text view="primary-large"> Avatar</Typography.Text>

      {avatar ? (
        <img src={`${resourcesUrl}${avatar}`} className={styles.avatarImg} />
      ) : (
        <div className={styles.noAvatar}>{initials}</div>
      )}

      <Attach
        onChange={handleUpload}
        fileClassName={styles.fileInfo}
        noFileClassName={styles.fileInfo}
        buttonProps={{ view: 'accent' }}
        buttonContent="Upload avatar"
      />
    </section>
  )
}
