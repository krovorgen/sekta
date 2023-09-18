import React, { FC } from 'react'
import { useParams } from 'react-router-dom'

import styles from './ForumTopic.module.scss'

import { data } from '../Forum'

import { Typography } from '@alfalab/core-components/typography'
import { Gap } from '@alfalab/core-components/gap'
import { Comment } from '@alfalab/core-components/comment'
import { ButtonDesktop } from '@alfalab/core-components/button/desktop'

// @import '@alfalab/core-components/vars/typography.css';

import { ITopic } from '../Forum'

export const ForumTopic: FC = () => {
  let topic: ITopic = {
    id: 0,
    date: '',
    title: '',
  }
  // let comments =
  // const IS_MOBILE = document.body.clientWidth < 450
  const { topicId } = useParams()
  // console.log(useParams(), topicId, data)
  data.forEach((elem: ITopic) => {
    if (elem.id === Number(topicId)) {
      topic = elem
    }
  })

  return (
    <section className={styles.topic}>
      {/* <div>Forum with topic id: {topicId}</div> */}
      <Typography.TitleResponsive
        tag="h2"
        view="small"
        font="system"
        rowLimit={2}
        // showSkeleton={showSkeleton}
        // skeletonProps={{ width: IS_MOBILE ? ['100%', '34%'] : 420 }}
      >
        {topic.title}
      </Typography.TitleResponsive>

      <Gap size="s" />

      <Typography.Text
        tag="p"
        view="primary-medium"
        // showSkeleton={showSkeleton}
      >
        {topic.firstMessage}
      </Typography.Text>
      {/* {Object.values(topic.comments).forEach((comment) => {
        console.log(comment)

      })} */}
      {Object.values(topic.comments as object).map(comment => (
        <div>
          <Comment className={styles.text}>{comment.text}</Comment>
          <div className={styles.info}>
            <ButtonDesktop className={styles.reply} view="ghost">
              Ответить
            </ButtonDesktop>
            <div>
              <span className={styles.author}>{comment.author}</span>
              <span className={styles.author}>{comment.date}</span>
            </div>
          </div>
          <Gap size="s" />
        </div>
      ))}
    </section>
  )
}
