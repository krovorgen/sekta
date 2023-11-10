import ky from 'ky'
import { KyInstance } from 'ky/distribution/types/ky'
// import { topics, comments } from '../pages/Forum/temporary/data'

import {
  getTopicDTO,
  getCommentDTO,
  sendTopicDTO,
  sendCommentDTO,
} from '../types/forum'

export const sektaUrl = 'http://localhost:3001/api/'

export const sektaApiInstance = ky.create({
  prefixUrl: sektaUrl,
  credentials: 'include',
})

class Forum {
  protected http: KyInstance = sektaApiInstance

  getTopics(): Promise<getTopicDTO[]> {
    return this.http.get('forum/topic').json()
    // const tempArr = [...topics] // Костыль, что бы в useMemo попадал гарантированно новый объект, так то при фетче этого быть не должно
    // return tempArr
  }

  postTopic(
    data: sendTopicDTO // поменять на sendTopicDTO
  ): Promise<unknown> {
    // topics.unshift(data)
    return this.http
      .post(`forum/topic`, {
        json: data,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://127.0.0.1:3000',
        },
      })
      .json()
  }

  // getTopicById(id: string) /* : Promise<unknown> */ {
  //   let temp = {}
  //   topics.map(elem => {
  //     if (id === elem.id) {
  //       temp = elem
  //     }
  //   })
  //   return temp
  //   // return this.http.get(`forum/topic/${id}`).json()
  // }

  getCommentsByTopicsId(id_topic: string): Promise<getCommentDTO[]> {
    // const temp: getCommentDTO[] = []
    // comments.map(elem => {
    //   if (id_topic === elem.id_topic) {
    //     temp.push(elem)
    //   }
    // })
    // return temp
    return this.http.get(`forum/comment/?id_topic=${id_topic}`).json()
  }

  postCommentsToTopic(
    id_topic: string,
    data: sendCommentDTO // нужно заменить на sendCommentDTO
  ): Promise<unknown> {
    // comments.push(data)
    return this.http
      .post(`forum/comment/?id_topic=${id_topic}`, {
        json: data,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://127.0.0.1:3000',
        },
      })
      .json()
  }

  create = undefined
  read = undefined
  update = undefined
  delete = undefined
}

export const ForumAPI = new Forum()
