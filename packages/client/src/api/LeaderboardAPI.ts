import { BaseAPI } from './BaseApi'
import { TEAM_NAME } from '../constants/leaderboard'

export type AddToBoardDTO = {
  data: ScopeResultDTO
  ratingFieldName: string
  teamName: string
}

export type ExtractFromBoardDTO = {
  ratingFieldName: string
  cursor: number
  limit: number
}

export type ScopeResultDTO = {
  id: number
  time: number
  player: string
}

class Leaderboard extends BaseAPI {
  addResult(data: AddToBoardDTO): Promise<unknown> {
    return this.http.post('leaderboard', { json: data }).json()
  }

  getResults(data: ExtractFromBoardDTO): Promise<unknown> {
    return this.http.post(`leaderboard/${TEAM_NAME}`, { json: data }).json()
  }

  async findResult(
    ratingFieldName: string,
    userId: number
  ): Promise<ScopeResultDTO | null> {
    const scopeResults = await LeaderboardApi.getResults({
      ratingFieldName: ratingFieldName,
      limit: 1000000,
      cursor: 0,
    })
    const foundResult = (scopeResults as { data: ScopeResultDTO }[]).filter(
      sr => sr.data.id === userId
    )
    return foundResult.length ? foundResult[0].data : null
  }

  create = undefined
  read = undefined
  update = undefined
  delete = undefined
}

export const LeaderboardApi = new Leaderboard()
