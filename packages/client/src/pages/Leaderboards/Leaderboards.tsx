import React, { FC, useState, useMemo } from 'react'
import { withUserCheck } from '../../HOC/withUserCheck'

import { IPlayer, data } from './temporary/data'

import { Table } from '@alfalab/core-components/table'
import { Typography } from '@alfalab/core-components/typography'
import { Space } from '@alfalab/core-components/space'

import styles from './Leaderboards.module.scss'

const timeFormatter = (time: number) => {
  const milliseconds = Math.floor((time % 1000) / 100)
  const seconds = Math.floor((time / 1000) % 60)
  const minutes = Math.floor((time / (1000 * 60)) % 60)
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24)

  const formattedHours = hours ? `${hours < 10 ? '0' + hours : hours} h ` : ''
  const formattedMinutes = minutes
    ? `${minutes < 10 ? '0' + minutes : minutes} m `
    : ''
  const formattedSeconds = seconds
    ? `${seconds < 10 ? '0' + seconds : seconds} s `
    : ''
  const formattedMilliSeconds = milliseconds
    ? `${milliseconds < 10 ? '0' + milliseconds : milliseconds} ms `
    : ''

  return (
    formattedHours + formattedMinutes + formattedSeconds + formattedMilliSeconds
  )
}

const LeaderboardsPage: FC = () => {
  const [perPage, setPerPage] = useState(5)
  const [page, setPage] = useState(0)
  const handlePerPageChange = (value: number) => {
    setPage(0)
    setPerPage(value)
  }

  const handlePageChange = (pageIndex: number) => setPage(pageIndex)

  const pagesCount = Math.ceil(data.length / perPage)

  const ratedData = useMemo(() => {
    data.sort((a, b) => b.time - a.time)
    data.forEach(elem => {
      elem.place = data.indexOf(elem) + 1
    })
    return data
  }, [data])

  const currentPageData = useMemo(() => {
    return ratedData.slice(page * perPage).slice(0, perPage)
  }, [ratedData, page, perPage])

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
            possiblePerPage={[5, 25, 50, 100]}
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
          {currentPageData.map((row: IPlayer) => (
            <Table.TRow key={row.id}>
              <Table.TCell>
                <Typography.Text view="primary-small" tag="div">
                  {row.place}
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
