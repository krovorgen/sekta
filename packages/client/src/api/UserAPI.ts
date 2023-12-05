import { BaseAPI } from './BaseApi'

import { User } from '../types'
import { proxyRoutePrefix } from './index'

class UserAPI extends BaseAPI {
  getUserByID(id_author: string): Promise<User> {
    return this.http.get(`${proxyRoutePrefix}/user/${id_author}`).json()
  }

  create = undefined
  read = undefined
  update = undefined
  delete = undefined
}

export const UserApi = new UserAPI()
