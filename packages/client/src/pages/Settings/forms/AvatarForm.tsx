import { ChangeEvent } from 'react'
import { Attach } from '@alfalab/core-components/attach'
import { Typography } from '@alfalab/core-components/typography/cssm'
import classNames from 'classnames/bind'

import styles from '../Settings.module.scss'
import { AvatarFormProps } from '../types'
import { baseUrl, resourcesUrl } from '../../../constants/urls'
import { FetchMethods } from '../../../utils/fetch'

const cn = classNames.bind(styles)

export const Avatar = ({ avatar, initials, getUser }: AvatarFormProps) => {
  const handleUpload = async (
    _e: ChangeEvent<HTMLInputElement>,
    payload: { files: File[] }
  ) => {
    const formData = new FormData()

    formData.append('avatar', payload.files[0])

    const response = await fetch(`${baseUrl}/user/profile/avatar`, {
      method: FetchMethods.PUT,
      body: formData,
      credentials: 'include',
    })
    if (response.ok) getUser()
  }

  const avatarSectionClass = cn(styles.box, styles.avatar)

  return (
    <section className={avatarSectionClass}>
      <Typography.Text view="primary-large"> Avatar</Typography.Text>

      {avatar ? (
        <img
          src={`${resourcesUrl}${avatar}`}
          className={styles.avatarImg}
          alt="user avatar"
        />
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
