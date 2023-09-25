import React, { FC } from 'react'
import { withUserCheck } from '../../HOC/withUserCheck'
import { PropsWithUser } from '../../types'

const SettingsPage: FC<PropsWithUser> = () => {
  return <div>Settings</div>
}

export const Settings = withUserCheck(SettingsPage)
