import { FC, useState, FormEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { consoleLogger } from '../../utils/consoleError'

import { withUserCheck } from '../../HOC/withUserCheck'
import { PropsWithUser } from '../../types'

import { ForumAPI, TopicDTO } from '../../api/ForumAPI'

import { ActionButton } from '@alfalab/core-components/action-button'
import { ArrowBackHeavyMIcon } from '@alfalab/icons-glyph/ArrowBackHeavyMIcon'
import { CommentPlusMIcon } from '@alfalab/icons-glyph/CommentPlusMIcon'
import { useAppSelector } from '../../redux/store'
import { ForumsTable } from './components/table/ForumsTable'
import { ForumsModal } from './components/modal/ForumsModal'

import styles from './Forum.module.scss'

export const ForumPage: FC<PropsWithUser> = () => {
  const navigate = useNavigate()
  const user = useAppSelector(state => state.auth.user)
  const [openModal, setOpenModal] = useState(false)
  const [topics, setTopics] = useState<TopicDTO[]>([])
  const [titleValue, setTitleValue] = useState('')
  const [firstMessageValue, setFirstMessageValue] = useState('')
  const [action, setAction] = useState('')

  const fetchData = async () => {
    try {
      setTopics(await ForumAPI.getTopics())
    } catch (error) {
      consoleLogger(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleOpen = () => setOpenModal(true)

  const handleClose = () => setOpenModal(false)

  const handleSendNewTopic = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await ForumAPI.postTopic({
        id: Math.floor(Math.random() * 10),
        id_author: user?.id as number,
        created_at: Math.floor(Math.random() * 1000).toString(),
        title: titleValue,
        content: firstMessageValue,
      })
      await fetchData()
      handleClose()
      setTitleValue('')
      setFirstMessageValue('')
    } catch (error) {
      consoleLogger(error)
    }
  }

  const handleOpenModalNewTopic = () => {
    setAction('newTopic')
    handleOpen()
  }

  const onSubmit = (event: FormEvent<Element>) => {
    if (action === 'newTopic') {
      handleSendNewTopic(event)
    } else if (action === 'editTopic') {
      handleClose()
      setTitleValue('')
      setFirstMessageValue('')
    } else {
      console.log('wrong way')
    }
  }

  return (
    <section className={styles.forum}>
      <div className={styles.buttons}>
        <ActionButton
          className={styles.new}
          iconWrapperClassName={styles.new}
          icon={<CommentPlusMIcon />}
          view="primary"
          onClick={handleOpenModalNewTopic}
        />
        <ActionButton
          className={styles.back}
          onClick={() => navigate(-1)}
          icon={<ArrowBackHeavyMIcon />}
          view="primary"
        />
      </div>
      <ForumsTable data={topics} />
      <ForumsModal
        openModal={openModal}
        handleClose={handleClose}
        onSubmit={onSubmit}
        titleValue={titleValue}
        setTitleValue={setTitleValue}
        firstMessageValue={firstMessageValue}
        setFirstMessageValue={setFirstMessageValue}
      />
    </section>
  )
}

export const Forum = withUserCheck(ForumPage)
