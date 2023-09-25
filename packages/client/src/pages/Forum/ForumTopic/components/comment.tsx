import styles from './comment.module.scss'

import { Gap } from '@alfalab/core-components/gap'
import { Comment } from '@alfalab/core-components/comment'
import { ButtonDesktop } from '@alfalab/core-components/button/desktop'

export type CommentProps = {
  id: number
  text: string
  author: string
  date: string
}

export const TopicsComment = ({ id, text, author, date }: CommentProps) => {
  return (
    <div key={id}>
      <Comment className={styles.text}>{text}</Comment>
      <div className={styles.info}>
        <ButtonDesktop className={styles.reply} view="ghost">
          Ответить
        </ButtonDesktop>
        <div>
          <span className={styles.author}>{author}</span>
          <span className={styles.author}>{date}</span>
        </div>
      </div>
      <Gap size="s" />
    </div>
  )
}
