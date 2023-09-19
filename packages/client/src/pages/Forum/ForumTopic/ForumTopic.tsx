import React, { FC, FormEvent } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import styles from './ForumTopic.module.scss'
import { ReactComponent as sendIcon } from './images/send.svg'
import { ArrowBackHeavyMIcon } from '@alfalab/icons-glyph/ArrowBackHeavyMIcon'

import { data } from '../Forum'

import { ActionButton } from '@alfalab/core-components/action-button'
import { Typography } from '@alfalab/core-components/typography'
import { Gap } from '@alfalab/core-components/gap'
import { Comment } from '@alfalab/core-components/comment'
import { ButtonDesktop } from '@alfalab/core-components/button/desktop'
import { Input } from '@alfalab/core-components/input'
import { IconButton } from '@alfalab/core-components/icon-button'
import { Toast } from '@alfalab/core-components/toast'

import { ITopic } from '../Forum'

export const ForumTopic: FC = () => {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = React.useState(false)
  const [title, setTitle] = React.useState('')
  const [inputValue, setInputValue] = React.useState('')

  let topic: ITopic = {
    id: 0,
    date: '',
    title: '',
  }
  const { topicId } = useParams()

  data.forEach((elem: ITopic) => {
    if (elem.id === Number(topicId)) {
      topic = elem
    }
  })

  const toggleVisiblity = () => setIsVisible(prev => !prev)

  const onSendComment = (e: FormEvent) => {
    e.preventDefault()
    topic.comments?.push({
      id: Math.floor(Math.random() * 10),
      author: 'string;',
      date: Math.floor(Math.random() * 1000).toString(),
      text: inputValue,
    })
    // не нашел способа, как во временном исполнении мутировать исходный объект, так, что бы обновлялся текущий и соответственно рендерился
    // for (let i = 0; i <= data.length; i++) {
    //   if (data[i].id === Number(topicId)) {
    //     data[i].comments?.push({
    //       id: 1488,
    //       author: 'string;',
    //       date: 'string;',
    //       text: inputValue,
    //     })
    //     console.log(data[i].comments)
    //   }
    // }
    setTitle('Комментарий отправлен, а Вы восхитительны!')
    setInputValue('')
    toggleVisiblity()
  }

  const hideNotification = React.useCallback(() => setIsVisible(false), [])

  return (
    <section className={styles.topic}>
      {/* <div>Forum with topic id: {topicId}</div> */}
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
      {(topic.comments as []).map(
        (comment: {
          id: number
          text: string
          author: string
          date: string
        }) => (
          <div key={comment.id}>
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
        )
      )}

      <form onSubmit={onSendComment}>
        <Input
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
              icon={sendIcon} // PaperAirplaneMIcon
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
