import React, { FC } from 'react'
import { withUserCheck } from '../../HOC/withUserCheck'
import { PropsWithUser } from '../../types'

const GamePage: FC<PropsWithUser> = () => {
  return <div>Game</div>
}

export const Game = withUserCheck(GamePage)
