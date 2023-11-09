import { useEffect, useState } from 'react'

import { Gap } from '@alfalab/core-components/gap'
import { Comment } from '@alfalab/core-components/comment'
import { ButtonDesktop } from '@alfalab/core-components/button/desktop'

import styles from './Comment.module.scss'
import { ForumAPI, UserByIdDTO } from '../../../../../api/ForumAPI'
import { HTTPError } from 'ky'

export type CommentProps = {
  id: number
  text: string
  id_author: number
  date: string
}

export const TopicsComment = ({ id, text, id_author, date }: CommentProps) => {
  const [author, setAuthor] = useState<UserByIdDTO>()
  useEffect(() => {
    const fetchData = async () => {
      try {
        setAuthor(await ForumAPI.getUserByID(id_author))
      } catch (error) {
        if (error instanceof HTTPError) {
          const responseBody = await error.response.json()
          console.log(responseBody.reason)
        }
      }
    }
    fetchData()
  }, [])
  return (
    <div key={id}>
      <Comment className={styles.text}>{text}</Comment>
      <div>
        {/* <ButtonDesktop className={styles.reply} view="ghost">
          Ответить
        </ButtonDesktop> */}
        <div className={styles.info}>
          <span className={styles.author}>
            {author?.display_name
              ? author.display_name
              : `${author?.first_name} ${author?.second_name}`}
          </span>
          <span className={styles.author}>{date}</span>
        </div>
      </div>
      <Gap size="s" />
    </div>
  )
}
