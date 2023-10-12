import React, { FC, useState, useMemo, useEffect } from 'react'
import { HTTPError } from 'ky'
import { withUserCheck } from '../../HOC/withUserCheck'

// import { IPlayer, data } from './temporary/data'
import { LeaderboardApi } from '../../api/LeaderboardAPI'
import { Player } from '../../types/leaderboard'
import { ratingFieldName, cursor, limit } from '../../constants/leaderboard'

import { Table } from '@alfalab/core-components/table'
import { Typography } from '@alfalab/core-components/typography'
import { Space } from '@alfalab/core-components/space'

import styles from './Leaderboards.module.scss'

import { timeFormatter } from './helpers/timeFormatter'

const LeaderboardsPage: FC = () => {
  const [dataFromApi, setDataFromApi] = useState<Player[]>([])
  const [perPage, setPerPage] = useState(5)
  const [page, setPage] = useState(0)
  const handlePerPageChange = (value: number) => {
    setPage(0)
    setPerPage(value)
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = (await LeaderboardApi.getResults({
          ratingFieldName: ratingFieldName,
          cursor: cursor,
          limit: limit,
        })) as []
        const arr: Player[] = []
        results.forEach((element: { data: Player }) => {
          arr.push(element.data)
        })
        setDataFromApi(arr)
      } catch (error) {
        if (error instanceof HTTPError) {
          const responseBody = await error.response.json()
          console.log(responseBody.reason)
        }
      }
    }
    fetchData()
  }, [])

  const handlePageChange = (pageIndex: number) => setPage(pageIndex)

  const pagesCount = Math.ceil(dataFromApi.length / perPage)

  // const ratedData = useMemo(() => {
  //   data.sort((a, b) => b.time - a.time)
  //   data.forEach(elem => {
  //     elem.place = data.indexOf(elem) + 1
  //   })
  //   return data
  // }, [data])

  const currentPageData = useMemo(() => {
    return dataFromApi.slice(page * perPage).slice(0, perPage)
  }, [dataFromApi, page, perPage])

  return (
    <section className={styles.leaderboard}>
      <Table
        pagination={
          <Table.Pagination
            perPage={perPage}
            currentPageIndex={page}
            pagesCount={pagesCount}
            onPageChange={handlePageChange}
            onPerPageChange={handlePerPageChange}
            possiblePerPage={[5, 25, 50]}
          />
        }>
        <Table.THead>
          <Table.THeadCell title="Место" width={150}>
            Место
          </Table.THeadCell>
          <Table.THeadCell title="Игрок">Игрок</Table.THeadCell>
          <Table.THeadCell title="Время" textAlign="left" width={190}>
            Время
          </Table.THeadCell>
        </Table.THead>
        <Table.TBody>
          {currentPageData.map((row: Player) => (
            <Table.TRow key={row.id}>
              <Table.TCell>
                <Typography.Text view="primary-small" tag="div">
                  {currentPageData.indexOf(row) + 1}
                </Typography.Text>
              </Table.TCell>

              <Table.TCell>
                <Space size={2}>
                  <Typography.Text view="primary-small" tag="div">
                    {row.player}
                  </Typography.Text>
                </Space>
              </Table.TCell>

              <Table.TCell>
                <div>{timeFormatter(row.time)}</div>
              </Table.TCell>
            </Table.TRow>
          ))}
        </Table.TBody>
      </Table>
    </section>
  )
}

export const Leaderboards = withUserCheck(LeaderboardsPage)
