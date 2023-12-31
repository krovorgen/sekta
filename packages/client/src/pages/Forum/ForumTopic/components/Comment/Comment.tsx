import { useEffect, useState } from 'react'
import { consoleLogger } from '../../../../../utils/consoleError'
import { UserApi } from '../../../../../api/UserAPI'
import { User } from '../../../../../types'
import { CommentProps } from '../../../../../types/forum'

import { Gap } from '@alfalab/core-components/gap'
import { Comment } from '@alfalab/core-components/comment'

import styles from './Comment.module.scss'

export const TopicsComment = ({ id, text, id_author, date }: CommentProps) => {
  const [author, setAuthor] = useState<User>()
  useEffect(() => {
    const fetchData = async () => {
      try {
        setAuthor(await UserApi.getUserByID(id_author))
      } catch (error) {
        consoleLogger(error)
      }
    }
    fetchData()
  }, [])
  return (
    <div key={id}>
      <Comment className={styles.text}>{text}</Comment>
      <div>
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
