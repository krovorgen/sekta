import React, { FC, FormEvent, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { consoleLogger } from '../../../utils/consoleError'

import { withUserCheck } from '../../../HOC/withUserCheck'
import { PropsWithUser } from '../../../types'

import { PaperAirplaneLineMIcon } from '@alfalab/icons-glyph/PaperAirplaneLineMIcon'
import { ArrowBackHeavyMIcon } from '@alfalab/icons-glyph/ArrowBackHeavyMIcon'

import { ActionButton } from '@alfalab/core-components/action-button'
import { Typography } from '@alfalab/core-components/typography'
import { Gap } from '@alfalab/core-components/gap'
import { Input } from '@alfalab/core-components/input'
import { IconButton } from '@alfalab/core-components/icon-button'
import { Toast } from '@alfalab/core-components/toast'
import { useAppSelector } from '../../../redux/store'

import { CommentDTO, ForumAPI, TopicDTO } from '../../../api/ForumAPI'

import { TopicsComment } from './components/Comment/Comment'

import styles from './ForumTopic.module.scss'

export const ForumTopicPage: FC<PropsWithUser> = () => {
  const navigate = useNavigate()
  const user = useAppSelector(state => state.auth.user)
  const theme = useAppSelector(state => state.auth.theme)
  const [isVisible, setIsVisible] = React.useState(false)
  const [title, setTitle] = React.useState('')
  const [inputValue, setInputValue] = React.useState('')
  const [topic, setTopic] = useState<TopicDTO>()
  const [comments, setComments] = useState<CommentDTO[]>([])

  const { topicId } = useParams()
  const fetchData = async () => {
    try {
      setTopic((await ForumAPI.getTopicById(Number(topicId))) as TopicDTO)
      setComments(
        (await ForumAPI.getCommentsByTopicsId(Number(topicId))) as CommentDTO[]
      )
    } catch (error) {
      consoleLogger(error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  const toggleVisiblity = () => setIsVisible(prev => !prev)

  const onSendComment = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await ForumAPI.postCommentsToTopic(Number(topicId), {
        id: Math.floor(Math.random() * 10),
        id_topic: Number(topicId),
        id_parent: 0,
        id_author: user?.id as number,
        created_at: Math.floor(Math.random() * 1000).toString(),
        content: inputValue,
      })
      await fetchData()
      setTitle('Комментарий отправлен, а Вы восхитительны!')
      setInputValue('')
      toggleVisiblity()
    } catch (error) {
      consoleLogger(error)
      setTitle('Что то пошло не так...')
    }
  }

  const hideNotification = React.useCallback(() => setIsVisible(false), [])

  return (
    <section className={styles.topic}>
      <ActionButton
        className={styles.back}
        onClick={() => navigate(-1)}
        icon={<ArrowBackHeavyMIcon />}
        view="primary"
      />
      <Typography.TitleResponsive
        tag="h2"
        view="small"
        font="system"
        rowLimit={2}>
        {topic?.title}
      </Typography.TitleResponsive>

      <Gap size="s" />

      <Typography.Text tag="p" view="primary-medium">
        {topic?.content}
      </Typography.Text>

      {comments.map((comment: CommentDTO) => (
        <TopicsComment
          key={comment.id}
          id={comment.id}
          text={comment.content}
          id_author={comment.id_author}
          date={comment.created_at}
        />
      ))}

      <form onSubmit={onSendComment}>
        <Input
          colors={theme === 'light' ? 'default' : 'inverted'}
          value={inputValue}
          block={true}
          onChange={e => setInputValue(e.target.value)}
          label="Что вы хотите написать?"
          size="m"
          rightAddons={
            <IconButton
              className={styles.submit}
              view="secondary"
              onClick={onSendComment}
              icon={PaperAirplaneLineMIcon}
              size="s"
              dataTestId="icon"
            />
          }
        />
        <Gap size="l" />

        <Toast
          className={styles.toast}
          title={title}
          open={isVisible}
          onClose={hideNotification}
          hasCloser={false}
          autoCloseDelay={2500}
          useAnchorWidth={false}
          offset={undefined}
          getPortalContainer={undefined}
          transition={undefined}
          position={undefined}
          preventFlip={undefined}
        />
      </form>
    </section>
  )
}

export const ForumTopic = withUserCheck(ForumTopicPage)
