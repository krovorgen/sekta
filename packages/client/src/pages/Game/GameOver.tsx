import './Game.scss'
import { FC } from 'react'
import './Game.scss'
import { Gap } from '@alfalab/core-components/gap/cssm'
import { Typography } from '@alfalab/core-components/typography/cssm'
import { Button } from '@alfalab/core-components/button/cssm'

import { GameStateProps } from '../../game/GameEngine'

import { timeFormatter } from '../../utils/timeFormatter'

type GameOverProps = {
  values: GameStateProps
  onReloadGame: () => void
}

export const GameOver: FC<GameOverProps> = ({ values, onReloadGame }) => {
  return (
    <div className="gameOverWrapper">
      <Typography.Title tag="h1" color="negative" view="xlarge">
        {`Time: ${timeFormatter(values.gameTime)}`}
      </Typography.Title>
      <Gap size="l" />
      <Button onClick={onReloadGame} view="accent" type="button" size="s">
        Play again
      </Button>
    </div>
  )
}
