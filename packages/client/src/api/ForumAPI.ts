import { topics, comments } from '../pages/Forum/temporary/data'

import { BaseAPI } from './BaseApi'

export type TopicDTO = {
  id: string
  created_at: string
  id_author: string
  title: string
  content: string
}

export type CommentDTO = {
  id: string
  id_topic: string
  id_parent?: string | null
  id_author: string
  created_at: string
  content: string
}

export type UserByIdDTO = {
  id: number
  first_name?: string
  second_name?: string
  display_name?: string
  phone?: string
  login?: string
  avatar?: string | null
  email?: string
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

class Forum extends BaseAPI {
  getTopics() /*: Promise<unknown> */ {
    // return this.http.get('forum/topic').json()
    const tempArr = [...topics] // Костыль, что бы в useMemo попадал гарантированно новый объект, так то при фетче этого быть не должно
    return tempArr
  }

  postTopic(
    data: TopicDTO // поменять на sendTopicDTO
  ) /* : Promise<unknown> */ {
    topics.unshift(data)
    // return this.http.post(`forum/topic`, { json: data }).json()
  }

  getTopicById(id: string) /* : Promise<unknown> */ {
    let temp = {}
    topics.map(elem => {
      if (id === elem.id) {
        temp = elem
      }
    })
    return temp
    // return this.http.get(`forum/topic/${id}`).json()
  }

  getCommentsByTopicsId(id_topic: string) /* : Promise<unknown> */ {
    const temp: CommentDTO[] = []
    comments.map(elem => {
      if (id_topic === elem.id_topic) {
        temp.push(elem)
      }
    })
    return temp
    // return this.http.get(`forum/comment/?id_topic=${id_topic}`).json()
  }

  postCommentsToTopic(
    id_topic: string,
    data: CommentDTO // нужно заменить на sendCommentDTO
  ) /* : Promise<unknown> */ {
    comments.push(data)
    // return this.http
    //   .post(`forum/comment/?id_topic=${id_topic}`, { json: data })
    //   .json()
  }

  getUserByID(id_author: string): Promise<UserByIdDTO> {
    return this.http.get(`user/${id_author}`).json()
  }

  create = undefined
  read = undefined
  update = undefined
  delete = undefined
}

export const ForumAPI = new Forum()
