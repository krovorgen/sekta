import { BaseAPI } from './BaseApi'
import { User } from '../types'

export type SignInDTO = {
  login: string
  password: string
}

export type SignUpDTO = {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

class Auth extends BaseAPI {
  signIn(data: SignInDTO): Promise<unknown> {
    return this.http.post('auth/signin', { json: data })
  }

  signUp(data: SignUpDTO): Promise<unknown> {
    return this.http.post('auth/signup', { json: data })
  }

  read(): Promise<User> {
    return this.http.get('auth/user').json()
  }

  logout(): Promise<unknown> {
    return this.http.post('auth/logout')
  }

  create = undefined
  update = undefined
  delete = undefined
}

export const AuthApi = new Auth()
