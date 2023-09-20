import { FC, useState, useMemo, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { RoutePath } from '../../constants/routes'
import styles from './Forum.module.scss'
import { data } from './temporary/data'

import { Table } from '@alfalab/core-components/table'
import { Typography } from '@alfalab/core-components/typography'
import { Space } from '@alfalab/core-components/space'
import { Indicator } from '@alfalab/core-components/indicator'
import { ButtonDesktop } from '@alfalab/core-components/button/desktop'
import { Button } from '@alfalab/core-components/button'
import { ActionButton } from '@alfalab/core-components/action-button'
import { Modal } from '@alfalab/core-components/modal'
import { Input } from '@alfalab/core-components/input'
import { Textarea } from '@alfalab/core-components/textarea'

import { ArrowBackHeavyMIcon } from '@alfalab/icons-glyph/ArrowBackHeavyMIcon'
import { CommentPlusMIcon } from '@alfalab/icons-glyph/CommentPlusMIcon'
import { Gap } from '@alfalab/core-components/gap'

const date = new Date()

export const Forum: FC = () => {
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false)
  const [perPage, setPerPage] = useState(5)
  const [page, setPage] = useState(0)
  const [titleValue, setTitleValue] = useState('')
  const [firstMessageValue, setFirstMessageValue] = useState('')
  const [action, setAction] = useState('')

  const handlePerPageChange = (value: number) => {
    setPage(0)
    setPerPage(value)
  }

  const handlePageChange = (pageIndex: number) => setPage(pageIndex)

  const pagesCount = Math.ceil(data.length / perPage)

  const currentPageData = useMemo(() => {
    return data.slice(page * perPage).slice(0, perPage)
  }, [data, page, perPage])

  const handleRoute = (
    id: number,
    element: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => {
    console.log(`clicked: ${id}`, element)
    navigate(`/${RoutePath.Forum}/${id}`)
  }

  const handleOpen = () => setOpenModal(true)

  const handleClose = () => setOpenModal(false)

  const handleSendNewTopic = (e: FormEvent) => {
    e.preventDefault()
    console.log(titleValue, firstMessageValue)
    currentPageData.unshift({
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
      <Table
        pagination={
          <Table.Pagination
            perPage={perPage}
            currentPageIndex={page}
            pagesCount={pagesCount}
            onPageChange={handlePageChange}
            onPerPageChange={handlePerPageChange}
            possiblePerPage={[5, 25, 50, 100]}
          />
        }>
        <Table.THead>
          <Table.THeadCell title="Дата">Дата</Table.THeadCell>
          <Table.THeadCell title="Заголовок">Заголовок</Table.THeadCell>
          <Table.THeadCell
            title="Сообщений/непрочитанных"
            textAlign="left"
            width={150}>
            Сообщений / непрочитанных
          </Table.THeadCell>
          <Table.THeadCell title="Действия" textAlign="left" width={268}>
            Действия
          </Table.THeadCell>
        </Table.THead>
        <Table.TBody>
          {currentPageData.map(row => (
            <Table.TRow
              key={row.id}
              onClick={element => handleRoute(row.id, element)}>
              <Table.TCell>
                <Typography.Text view="primary-small" tag="div">
                  {row.date}
                </Typography.Text>
              </Table.TCell>

              <Table.TCell>
                <Space size={2}>
                  <Typography.Text view="primary-small" tag="div">
                    {row.title}
                  </Typography.Text>
                  <Typography.Text view="primary-small" color="secondary">
                    {row.lastMessage}
                  </Typography.Text>
                </Space>
              </Table.TCell>

              <Table.TCell>
                <div>
                  <Indicator
                    height={30}
                    value={row.qty as number}
                    backgroundColor="var(--color-light-graphic-positive)"
                    color="var(--color-static-text-primary-light)"
                    border={{
                      width: 4,
                      color: 'var(--badge-icon-bg-color)',
                    }}
                  />
                  {'  '}/{'  '}
                  {row.unrd ? (
                    <Indicator
                      height={30}
                      value={row.unrd}
                      backgroundColor="var(--color-light-bg-accent)"
                      color="var(--color-static-text-primary-light)"
                      border={{
                        width: 4,
                        color: 'var(--badge-icon-bg-color)',
                      }}
                    />
                  ) : (
                    ''
                  )}
                </div>
              </Table.TCell>

              <Table.TCell>
                {row.edit && (
                  <ButtonDesktop
                    className={styles.button}
                    view="accent"
                    size="xs"
                    onClick={handleOpenModalEditTopic}>
                    Редактировать
                  </ButtonDesktop>
                )}
                {row.remove && (
                  <ButtonDesktop
                    className={styles.button}
                    view="accent"
                    size="xs"
                    onClick={handleDeleteTopic}>
                    Удалить
                  </ButtonDesktop>
                )}
              </Table.TCell>
            </Table.TRow>
          ))}
        </Table.TBody>
      </Table>

      <Modal open={openModal} onClose={handleClose} size={'l'}>
        <Modal.Header
          hasCloser={true}
          hasBackButton={false}
          sticky={true}
          title={'Что вы хотите написать?'}
        />

        <Modal.Content>
          <form onSubmit={onSubmit}>
            <Input
              value={titleValue}
              block={true}
              onChange={e => setTitleValue(e.target.value)}
              label="Заголовок"
            />
            <Gap size="s" />
            <Textarea
              value={firstMessageValue}
              block={true}
              onChange={e => setFirstMessageValue(e.target.value)}
              label="То о чем вы хотите написать"
              size="xl"
              minRows={3}
              maxLength={96}
              showCounter={true}
            />
          </form>
        </Modal.Content>

        <Modal.Footer sticky={false}>
          <Button view="primary" size="s" onClick={onSubmit}>
            Отправить
          </Button>

          <Button view="secondary" size="s" onClick={handleClose}>
            Отмена
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  )
}
