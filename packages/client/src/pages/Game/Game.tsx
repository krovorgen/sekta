import './Game.scss'
import React, { FC, useEffect, useRef, useState } from 'react'
import { withUserCheck } from '../../HOC/withUserCheck'
import { PropsWithUser } from '../../types'
import { GAME_OPTIONS } from '../../constants/game'
import GameEngine, { GameStateProps } from '../../game/GameEngine'
import { GameOver } from './GameOver'
import { LeaderboardApi } from '../../api/LeaderboardAPI'
import { TEAM_NAME, RATING_FIELD_NAME } from '../../constants/leaderboard'

const GameState = {
  startPreview: 'start',
  game: 'game',
  endPreview: 'end',
}

const GamePage: FC<PropsWithUser> = ({ user }) => {
  const [gameState, setGameState] = useState(GameState.startPreview)
  const [gameResult, setGameResult] = useState<GameStateProps>({
    gameScore: 0,
    gameTime: 0,
  })
  let gameEngine: GameEngine | null = null
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const reloadGame = () => document.location.reload()

  useEffect(() => {
    setTimeout(() => {
      setGameState(GameState.game)
    }, 3000)

    return () => setGameState(GameState.startPreview)
  }, [])

  useEffect(() => {
    if (!gameEngine && gameState == GameState.game) {
      const canvas = canvasRef.current
      gameEngine = new GameEngine({
        canvas: canvas as HTMLCanvasElement,
        gameStateEndCallback: gameResult => {
          setGameState(GameState.endPreview)
          setGameResult(gameResult)
          const data = {
            id: user.id,
            time: Math.trunc(gameResult.gameTime * 1000),
            player: user.display_name
              ? user.display_name
              : `${user.first_name} ${user.second_name}`,
          }
          LeaderboardApi.addResult({
            data,
            ratingFieldName: RATING_FIELD_NAME,
            teamName: TEAM_NAME,
          })
        },
      })
    }
    return () => {
      if ([GameState.endPreview, GameState.game].includes(gameState)) {
        gameEngine?.destroy()
      }
    }
  }, [gameState])

  return (
    <div className="gameWrapper">
      {gameState === GameState.startPreview && (
        <div className="timerWrapper">
          <div className="timer">
            <div className="timerBody">
              <div className="timerCounter">
                <span>3</span>
                <span>2</span>
                <span>1</span>
                <span>Fire</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {gameState === GameState.game && (
        <canvas
          ref={canvasRef}
          className="gameCanvas"
          width={GAME_OPTIONS.CANVAS_WIDTH}
          height={GAME_OPTIONS.CANVAS_HEIGHT}
        />
      )}
      {gameState === GameState.endPreview && (
        <GameOver values={gameResult} onReloadGame={reloadGame} />
      )}
    </div>
  )
}

export const Game = withUserCheck(GamePage)
