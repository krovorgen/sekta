import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { RoutePath } from '../../constants/routes'

import { Table } from '@alfalab/core-components/table'
import { Typography } from '@alfalab/core-components/typography'
import { Space } from '@alfalab/core-components/space'
import { Indicator } from '@alfalab/core-components/indicator'
import { ButtonDesktop } from '@alfalab/core-components/button/desktop'

export interface ITopic {
  id: number
  date: string
  title: string

  // Для этих свойств вместо `undefined` нужно использовать `null`.
  firstMessage?: string | null
  lastMessage?: string | null
  qty?: number | null
  unrd?: number

  remove?: string
  edit?: string

  comments?: {
    id: number
    author: string
    date: string
    text: string
  }[]
}

const data: ITopic[] = [
  {
    id: 28,
    date: '30.06.2022',
    title: 'Мутная тема',
    firstMessage: 'скинуться по пятихатке, просто так',
    qty: 1,
    unrd: undefined,
    remove: 'Удалить',
    edit: 'Редактировать',
    comments: [
      {
        id: 1,
        author: 'author',
        date: 'date',
        text: 'text text text text text text text text text text text',
      },
      {
        id: 2,
        author: 'author2',
        date: 'date2',
        text: 'text2 text text text text text text text text text text',
      },
      {
        id: 3,
        author: 'author',
        date: 'date',
        text: 'text text text text text text text text text text text',
      },
    ],
  },
  {
    id: 12,
    date: '30.06.2022',
    title: 'баги',
    firstMessage: 'В этой теме предлагается описывать баги',
    lastMessage: 'Ваше приложение один сплошной баг, бугагашеньки',
    qty: 99,
    unrd: 88,
    edit: 'Редактировать',
    comments: [
      {
        id: 4,
        author: 'author',
        date: 'date',
        text: 'Ваше приложение один сплошной баг, бугагашеньки 1',
      },
      {
        id: 5,
        author: 'author2',
        date: 'date2',
        text: 'Ваше приложение один сплошной баг, бугагашеньки 2',
      },
      {
        id: 6,
        author: 'author',
        date: 'date',
        text: 'Ваше приложение один сплошной баг, бугагашеньки 3',
      },
    ],
  },
  {
    id: 55,
    date: '30.06.2022',
    title: 'Нововведения',
    firstMessage: 'Ввели в действие вот эту вот игру',
    lastMessage: 'Вся ваша радость, благодаря нововведениям',
    qty: 130,
    unrd: 120,
    remove: 'Удалить',
    comments: [
      {
        id: 1,
        author: 'author 1',
        date: 'date',
        text: 'Вся ваша радость, благодаря нововведениям 1',
      },
      {
        id: 7,
        author: 'author2',
        date: 'date2',
        text: 'Вся ваша радость, благодаря нововведениям 2',
      },
      {
        id: 9,
        author: 'author 1',
        date: 'date',
        text: 'Вся ваша радость, благодаря нововведениям 3',
      },
    ],
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
    console.log(`clicked: ${id}`, element)
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
                  <Indicator
                    height={30}
                    value={row.qty as number}
                    backgroundColor="var(--color-light-graphic-positive)"
                    color="var(--color-static-text-primary-light)"
                    border={{
                      width: 4,
                      color: 'var(--badge-icon-bg-color)',
                    }}
                  />{' '}
                  /
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

export { data }
