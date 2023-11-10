export type CommentProps = {
  id: string
  text: string
  id_author: string
  date: string
}

export type getTopicDTO = {
  id: string
  createdAt: string
  updatedAt: string
  id_author: string
  title: string
  content: string
}

export type getCommentDTO = {
  id: string
  id_topic: string
  id_parent?: string | null
  id_author: string
  createdAt: string
  updatedAt: string
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
