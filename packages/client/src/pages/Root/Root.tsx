import React, { FC } from 'react'
import { Gap } from '@alfalab/core-components/gap/cssm'
import { Typography } from '@alfalab/core-components/typography/cssm'
import { Button } from '@alfalab/core-components/button/cssm'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from '../../constants/routes'

import styles from './Root.module.scss'
import { withUserCheck } from '../../HOC/withUserCheck'
import { PropsWithUser } from '../../types'

const RootPage: FC<PropsWithUser> = ({ user }) => {
  const navigate = useNavigate()
  const onStartGameBtnClick = () => navigate(RoutePath.Game)

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <Typography.Title tag="h1" color="negative" view="xlarge">
          FIER RUNNER
        </Typography.Title>
        <Gap size="xs" />
        <Typography.Title tag="h2" color="static-primary-dark" view="small">
          Описание игры Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Etiam at sapien risus. Nulla blandit ullamcorper turpis ut rhoncus.
          Cras gravida nibh id mauris rutrum ornare. Mauris efficitur arcu
          ipsum, et imperdiet justo dignissim in. Duis et elementum purus, et
          suscipit magna. Maecenas et tempus nulla. Sed rhoncus erat sit amet
          lorem accumsan tempor
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
