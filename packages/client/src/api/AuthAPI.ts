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

export type ThemeResponse = {
  theme: string
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

  async getTheme(id: number, currentTheme: string): Promise<string> {
    try {
      const theme: ThemeResponse = await this.http
        .extend({
          prefixUrl: `http://localhost:${__SERVER_PORT__}/api`,
        })
        .post('theme', { json: { id } })
        .json()

      return theme?.theme ?? currentTheme
    } catch (e) {
      return currentTheme
    }
  }

  async read(currentTheme: string): Promise<{ user: User; theme: string }> {
    const user: User = await this.http.get('auth/user').json()

    const theme: string = await this.getTheme(user.id, currentTheme)

    return { user, theme }
  }

  updateTheme(params: { id: number; theme: string }): Promise<ThemeResponse> {
    return this.http
      .extend({
        prefixUrl: `http://localhost:${__SERVER_PORT__}/api`,
      })
      .post('theme/update', { json: params })
      .json()
  }

  logout(): Promise<unknown> {
    return this.http.post('auth/logout')
  }

  create = undefined
  update = undefined
  delete = undefined
}

export const AuthApi = new Auth()
