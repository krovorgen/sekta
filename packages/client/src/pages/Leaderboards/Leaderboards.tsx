import React, { FC } from 'react'
import { withUserCheck } from '../../HOC/withUserCheck'

const LeaderboardsPage: FC = () => {
  return <div>Leaderboards</div>
}

export const Leaderboards = withUserCheck(LeaderboardsPage)
