import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import { withUserCheck } from '../../../HOC/withUserCheck'
import { PropsWithUser } from '../../../types'

export const ForumTopicPage: FC<PropsWithUser> = () => {
  const { topicId } = useParams()

  return <div>Forum with topic id: {topicId}</div>
}

export const ForumTopic = withUserCheck(ForumTopicPage)
