import React, { FC } from 'react'
import { useParams } from 'react-router-dom'

export const ForumTopic: FC = () => {
  const { topicId } = useParams()

  return <div>Forum with topic id: {topicId}</div>
}
