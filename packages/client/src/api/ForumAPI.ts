import { topics, comments } from '../pages/Forum/temporary/data'

import { BaseAPI } from './BaseApi'

import { User } from '../types'
import {
  getTopicDTO,
  getCommentDTO /* sendTopicDTO, sendCommentDTO */,
} from '../types/forum'

class Forum extends BaseAPI {
  getTopics() /*: Promise<unknown> */ {
    // return this.http.get('forum/topic').json()
    const tempArr = [...topics] // Костыль, что бы в useMemo попадал гарантированно новый объект, так то при фетче этого быть не должно
    return tempArr
  }

  postTopic(
    data: getTopicDTO // поменять на sendTopicDTO
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
    const temp: getCommentDTO[] = []
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
    data: getCommentDTO // нужно заменить на sendCommentDTO
  ) /* : Promise<unknown> */ {
    comments.push(data)
    // return this.http
    //   .post(`forum/comment/?id_topic=${id_topic}`, { json: data })
    //   .json()
  }

  getUserByID(id_author: string): Promise<User> {
    return this.http.get(`user/${id_author}`).json()
  }

  create = undefined
  read = undefined
  update = undefined
  delete = undefined
}

export const ForumAPI = new Forum()
