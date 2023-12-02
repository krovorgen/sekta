import {
  getTopicDTO,
  getCommentDTO,
  sendTopicDTO,
  sendCommentDTO,
} from '../types/forum'
import { BaseAPI } from './BaseApi'

class Forum extends BaseAPI {
  getTopics(): Promise<getTopicDTO[]> {
    return this.http.get('forum/topic').json()
  }

  postTopic(data: sendTopicDTO): Promise<unknown> {
    return this.http
      .post(`forum/topic`, {
        json: data,
      })
      .json()
  }

  getCommentsByTopicsId(id_topic: string): Promise<getCommentDTO[]> {
    return this.http.get(`forum/comment/?id_topic=${id_topic}`).json()
  }

  postCommentsToTopic(
    id_topic: string,
    data: sendCommentDTO
  ): Promise<unknown> {
    return this.http
      .post(`forum/comment/?id_topic=${id_topic}`, {
        json: data,
      })
      .json()
  }

  create = undefined
  read = undefined
  update = undefined
  delete = undefined
}

export const ForumAPI = new Forum()
