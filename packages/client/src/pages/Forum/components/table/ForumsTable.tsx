import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { Table } from '@alfalab/core-components/table'
import { Typography } from '@alfalab/core-components/typography'
import { Space } from '@alfalab/core-components/space'
import { Indicator } from '@alfalab/core-components/indicator'
import { ButtonDesktop } from '@alfalab/core-components/button/desktop'

import { RoutePath } from '../../../../constants/routes'
import { ITopic } from '../../temporary/data'
import styles from './ForumsTable.module.scss'

export type TableProps = {
  data: ITopic[]
  handleOpenModalEditTopic: (e: { stopPropagation: () => void }) => void
  handleDeleteTopic: (e: { stopPropagation: () => void }) => void
}

export const ForumsTable = ({
  data,
  handleOpenModalEditTopic,
  handleDeleteTopic,
}: TableProps) => {
  const navigate = useNavigate()
  const [perPage, setPerPage] = useState(5)
  const [page, setPage] = useState(0)
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

  return (
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
        {currentPageData.map((row: ITopic) => (
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
  )
}
