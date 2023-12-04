import React, { FC } from 'react'
import { Gap } from '@alfalab/core-components/gap/cssm'
import { Typography } from '@alfalab/core-components/typography/cssm'
import { Button } from '@alfalab/core-components/button/cssm'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from '../../constants/routes'

import styles from './Root.module.scss'
import { withUserCheck } from '../../HOC/withUserCheck'
import { PropsWithUser } from '../../types'

const RootPage: FC<PropsWithUser> = () => {
  const navigate = useNavigate()

  const onStartGameBtnClick = () => navigate(RoutePath.Game)

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <Typography.Title tag="h1" color="negative" view="xlarge">
          FIRE RUNNER
        </Typography.Title>
        <Gap size="xs" />
        <Typography.Title tag="h2" view="small">
          «Огненный бегун» — это захватывающая аркада, где игроку предстоит
          управлять бегущим персонажем, который уворачивается от огненного дождя
          и преодолевает разнообразные препятствия на пути для сохранения своей
          жизни. Управление осуществляется с помощью кнопок клавиатуры
          W/Space/↑, A/←, S/↓, D/→, поддерживается геймпад или сенсорный ввод.
        </Typography.Title>
        <Gap size="s" />

        <Button
          onClick={onStartGameBtnClick}
          view="accent"
          type="submit"
          size="xs">
          Start
        </Button>
      </div>
    </div>
  )
}

export const Root = withUserCheck(RootPage)
