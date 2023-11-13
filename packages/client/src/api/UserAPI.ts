import { BaseAPI } from './BaseApi'

import { User } from '../types'

class UserAPI extends BaseAPI {
  getUserByID(id_author: string): Promise<User> {
    return this.http
      .get(`user/${id_author}`, {
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

export const UserApi = new UserAPI()
