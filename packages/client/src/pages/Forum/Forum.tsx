import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { RoutePath } from '../../constants/routes'

import { Table } from '@alfalab/core-components/table'
import { Typography } from '@alfalab/core-components/typography'
import { Space } from '@alfalab/core-components/space'
import { ButtonDesktop } from '@alfalab/core-components/button/desktop'

const data: {
  id: number
  date: string
  title: string
  lastMessage?: string
  qty?: number
  unrd?: number
  remove?: string
  edit?: string
}[] = [
  {
    id: 28,
    date: '30.06.2022',
    title: 'Мутная тема',
    qty: 21000000,
    unrd: 1700,
    remove: 'Удалить',
    edit: 'Редактировать',
  },
  {
    id: 12,
    date: '30.06.2022',
    title: 'баги',
    lastMessage: 'Ваше приложение один сплошной баг, бугагашеньки',
    qty: 10002030,
    unrd: 1700,
    edit: 'Редактировать',
  },
  {
    id: 5,
    date: '30.06.2022',
    title: 'Нововведения',
    lastMessage: 'Вся ваша радость, благодаря нововведениям',
    qty: 3000069,
    unrd: 1700,
    remove: 'Удалить',
  },
]

Array(100)
  .fill('')
  .forEach((_, i) =>
    data.push({
      id: (i + 1) * 100,
      date: '20.10.2021',
      title: `Топик #${i + 1}`,
      qty: 1000000 + (i + 1) * 10000,
    })
  )

export const Forum: FC = () => {
  const navigate = useNavigate()

  const [perPage, setPerPage] = React.useState(5)
  const [page, setPage] = React.useState(0)

  const handlePerPageChange = (value: number) => {
    setPage(0)
    setPerPage(value)
  }

  const handlePageChange = (pageIndex: number) => setPage(pageIndex)

  const pagesCount = Math.ceil(data.length / perPage)

  const currentPageData = React.useMemo(() => {
    return data.slice(page * perPage).slice(0, perPage)
  }, [data, page, perPage])

  const handleRoute = (
    id: number,
    element: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => {
    console.log(`clicked, in ${element} ${id}`)
    navigate(`/${RoutePath.Forum}/${id}`)
  }

  return (
    <div style={{ margin: '40px 50px 40px' }}>
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
            width={268}>
            Сообщений/непрочитанных
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
                  {row.qty} {row.unrd ? `/ ${row.unrd}` : ''}
                </div>
              </Table.TCell>

              <Table.TCell>
                {row.edit ? (
                  <ButtonDesktop
                    view="accent"
                    size="xs"
                    style={{ margin: '5px', padding: '5px' }}>
                    {row.edit}
                  </ButtonDesktop>
                ) : (
                  ''
                )}
                {row.remove ? (
                  <ButtonDesktop
                    view="accent"
                    size="xs"
                    style={{ margin: '5px', padding: '5px' }}>
                    {row.remove}
                  </ButtonDesktop>
                ) : (
                  ''
                )}
              </Table.TCell>
            </Table.TRow>
          ))}
        </Table.TBody>
      </Table>
    </div>
  )
}
