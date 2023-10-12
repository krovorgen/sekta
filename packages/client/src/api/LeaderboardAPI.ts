import { BaseAPI } from './BaseApi'
import { teamName } from '../constants/leaderboard'

export type AddToBoardDTO = {
  data: object
  ratingFieldName: string
  teamName: string
}

export type ExtractFromBoardDTO = {
  ratingFieldName: string
  cursor: number
  limit: number
}

class Leaderboard extends BaseAPI {
  addResult(data: AddToBoardDTO): Promise<unknown> {
    return this.http.post('leaderboard', { json: data }).json()
  }

  getResults(data: ExtractFromBoardDTO): Promise<unknown> {
    return this.http.post(`leaderboard/${teamName}`, { json: data }).json()
  }

  create = undefined
  read = undefined
  update = undefined
  delete = undefined
}

export const LeaderboardApi = new Leaderboard()
