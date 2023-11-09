import { FC, useState, FormEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { HTTPError } from 'ky'

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
// const date = new Date()

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
      await setTopics(await ForumAPI.getTopics())
      console.log(topics)
    } catch (error) {
      if (error instanceof HTTPError) {
        const responseBody = await error.response.json()
        console.log(responseBody.reason)
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleOpen = () => setOpenModal(true)

  const handleClose = () => setOpenModal(false)

  const handleSendNewTopic = async (e: FormEvent) => {
    e.preventDefault()
    console.log(titleValue, firstMessageValue)
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
      if (error instanceof HTTPError) {
        const responseBody = await error.response.json()
        console.log(responseBody.reason)
      }
    }
  }

  const handleOpenModalNewTopic = () => {
    setAction('newTopic')
    handleOpen()
  }

  // const handleOpenModalEditTopic = (e: { stopPropagation: () => void }) => {
  //   e.stopPropagation()
  //   setAction('editTopic')
  //   handleOpen()
  //   // тут нужно заполнить модалку текстом из топика
  //   setTitleValue('some title')
  //   setFirstMessageValue('some first message')
  // }

  // const handleDeleteTopic = (e: { stopPropagation: () => void }) => {
  //   e.stopPropagation()
  //   console.log('handleDeleteTopic')
  // }

  const onSubmit = (event: FormEvent<Element>) => {
    console.log(action)
    if (action === 'newTopic') {
      handleSendNewTopic(event)
    } else if (action === 'editTopic') {
      console.log('handleEditTopic')
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
      <ForumsTable
        data={topics}
        // handleOpenModalEditTopic={handleOpenModalEditTopic}
        // handleDeleteTopic={handleDeleteTopic}
      />
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
