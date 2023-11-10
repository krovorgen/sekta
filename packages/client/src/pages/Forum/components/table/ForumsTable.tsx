import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { Table } from '@alfalab/core-components/table'
import { Typography } from '@alfalab/core-components/typography'
import { Space } from '@alfalab/core-components/space'

import { RoutePath } from '../../../../constants/routes'
import { getTopicDTO } from '../../../../types/forum'

export type TableProps = { data: getTopicDTO[] }

export const ForumsTable = ({ data }: TableProps) => {
  const navigate = useNavigate()
  const [perPage, setPerPage] = useState(5)
  const [page, setPage] = useState(0)
  const handlePerPageChange = (value: number) => {
    setPage(0)
    setPerPage(value)
  }

  const handlePageChange = (pageIndex: number) => setPage(pageIndex)

  const pagesCount = Math.ceil(data.length / perPage)
  const rows = useMemo(() => data, [data])
  const currentPageData = useMemo(() => {
    return rows.slice(page * perPage).slice(0, perPage)
  }, [rows, page, perPage])

  const handleRoute = (id: string) => {
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
      </Table.THead>
      <Table.TBody>
        {currentPageData.map((row: getTopicDTO) => (
          <Table.TRow key={row.id} onClick={() => handleRoute(row.id)}>
            <Table.TCell>
              <Typography.Text view="primary-small" tag="div">
                {row.created_at}
              </Typography.Text>
            </Table.TCell>

            <Table.TCell>
              <Space size={2}>
                <Typography.Text view="primary-small" tag="div">
                  {row.title}
                </Typography.Text>
                <Typography.Text view="primary-small" color="secondary">
                  {row.content}
                </Typography.Text>
              </Space>
            </Table.TCell>
          </Table.TRow>
        ))}
      </Table.TBody>
    </Table>
  )
}
