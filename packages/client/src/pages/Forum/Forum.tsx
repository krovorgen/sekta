import React, { FC } from 'react'
import { withUserCheck } from '../../HOC/withUserCheck'
import { PropsWithUser } from '../../types'

export const ForumPage: FC<PropsWithUser> = () => {
  return <div>Forum</div>
}

export const Forum = withUserCheck(ForumPage)
