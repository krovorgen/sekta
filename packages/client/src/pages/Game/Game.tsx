import './Game.scss'
import React, { FC, useEffect, useRef, useState } from 'react'
import { withUserCheck } from '../../HOC/withUserCheck'
import { PropsWithUser } from '../../types'
import { GAME_OPTIONS } from '../../constants/game'
import GameEngine, { GameStateProps } from '../../game/GameEngine'
import { GameOver } from './GameOver'

const GameState = {
  startPreview: 'start',
  game: 'game',
  endPreview: 'end',
}

const GamePage: FC<PropsWithUser> = () => {
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
        },
      })
    }
  }, [gameState])

  return (
    <div className="game-wrapper">
      {gameState === GameState.startPreview && (
        <div className="timer-wrapper">
          <div className="timer">
            <div className="timer-body">
              <div className="timer-counter">
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
          className="game-canvas"
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
