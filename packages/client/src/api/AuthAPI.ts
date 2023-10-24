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

export type YandexSignUpDTO = {
  code: string
  redirect_uri: string
}

class Auth extends BaseAPI {
  signIn(data: SignInDTO): Promise<unknown> {
    return this.http.post('auth/signin', { json: data })
  }

  signUp(data: SignUpDTO): Promise<unknown> {
    return this.http.post('auth/signup', { json: data })
  }

  async getYandexServiceId(params: string): Promise<void> {
    const data: { service_id: string } = await this.http
      .get(`oauth/yandex/service-id?redirect_uri=${params}`)
      .json()
    window.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${data.service_id}&redirect_uri=http://localhost:3000/signin`
  }

  getYandexAccount(params: YandexSignUpDTO): Promise<unknown> {
    return this.http.post(`oauth/yandex`, { json: params })
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
