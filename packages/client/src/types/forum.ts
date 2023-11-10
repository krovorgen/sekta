export type CommentProps = {
  id: string
  text: string
  id_author: string
  date: string
}

export type getTopicDTO = {
  id: string
  created_at: string
  id_author: string
  title: string
  content: string
}

export type getCommentDTO = {
  id: string
  id_topic: string
  id_parent?: string | null
  id_author: string
  created_at: string
  content: string
}

export type sendTopicDTO = {
  id_author: string
  title: string
  content: string
}

export type sendCommentDTO = {
  id_topic: string
  id_parent: string | null
  id_author: string
  content: string
}
