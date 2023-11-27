import ky from 'ky'
import { KyInstance } from 'ky/distribution/types/ky'

import {
  getTopicDTO,
  getCommentDTO,
  sendTopicDTO,
  sendCommentDTO,
} from '../types/forum'

export const sektaUrl = 'http://130.193.42.147:3001/api/'

export const sektaApiInstance = ky.create({
  prefixUrl: sektaUrl,
  credentials: 'include',
})

class Forum {
  protected http: KyInstance = sektaApiInstance

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
