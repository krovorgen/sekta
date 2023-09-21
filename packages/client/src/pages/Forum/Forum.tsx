import { FC, useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './Forum.module.scss'
import { data } from './temporary/data'

import { ActionButton } from '@alfalab/core-components/action-button'

import { ArrowBackHeavyMIcon } from '@alfalab/icons-glyph/ArrowBackHeavyMIcon'
import { CommentPlusMIcon } from '@alfalab/icons-glyph/CommentPlusMIcon'

import { ForumsTable } from './components/table/ForumsTable'
import { ForumsModal } from './components/modal/ForumsModal'

const date = new Date()

export const Forum: FC = () => {
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false)
  const [topics, setTopics] = useState(data)
  const [titleValue, setTitleValue] = useState('')
  const [firstMessageValue, setFirstMessageValue] = useState('')
  const [action, setAction] = useState('')

  const handleOpen = () => setOpenModal(true)

  const handleClose = () => setOpenModal(false)

  const handleSendNewTopic = (e: FormEvent) => {
    e.preventDefault()
    console.log(titleValue, firstMessageValue)
    const topicArr = [
      {
        id: Math.floor(Math.random() * 10),
        date: `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`,
        title: titleValue,
        firstMessage: firstMessageValue,
        qty: 1,
        unrd: undefined,
        remove: true,
        edit: true,
      },
      ...topics,
    ]
    setTopics(topicArr)
    data.unshift({
      id: Math.floor(Math.random() * 10),
      date: `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`,
      title: titleValue,
      firstMessage: firstMessageValue,
      qty: 1,
      unrd: undefined,
      remove: true,
      edit: true,
    })
    handleClose()
    setTitleValue('')
    setFirstMessageValue('')
  }

  const handleOpenModalNewTopic = () => {
    setAction('newTopic')
    handleOpen()
  }

  const handleOpenModalEditTopic = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    setAction('editTopic')
    handleOpen()
    // тут нужно заполнить модалку текстом из топика
    setTitleValue('some title')
    setFirstMessageValue('some first message')
  }

  const handleDeleteTopic = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    console.log('handleDeleteTopic')
  }

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

  const handleOpen = () => setOpenModal(true)

  const handleClose = () => setOpenModal(false)

  const handleSendNewTopic = (e: FormEvent) => {
    e.preventDefault()
    console.log(titleValue, firstMessageValue)
    const topicArr = [
      {
        id: Math.floor(Math.random() * 10),
        date: `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`,
        title: titleValue,
        firstMessage: firstMessageValue,
        qty: 1,
        unrd: undefined,
        remove: true,
        edit: true,
      },
      ...topics,
    ]
    setTopics(topicArr)
    data.unshift({
      id: Math.floor(Math.random() * 10),
      date: `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`,
      title: titleValue,
      firstMessage: firstMessageValue,
      qty: 1,
      unrd: undefined,
      remove: true,
      edit: true,
    })
    handleClose()
    setTitleValue('')
    setFirstMessageValue('')
  }

  const handleOpenModalNewTopic = () => {
    setAction('newTopic')
    handleOpen()
  }

  const handleOpenModalEditTopic = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    setAction('editTopic')
    handleOpen()
    // тут нужно заполнить модалку текстом из топика
    setTitleValue('some title')
    setFirstMessageValue('some first message')
  }

  const handleDeleteTopic = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    console.log('handleDeleteTopic')
  }

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
        handleOpenModalEditTopic={handleOpenModalEditTopic}
        handleDeleteTopic={handleDeleteTopic}
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
