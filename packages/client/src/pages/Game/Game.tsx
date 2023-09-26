import './Game.scss'
import React, { FC, useEffect, useRef } from 'react'
import { withUserCheck } from '../../HOC/withUserCheck'
import { PropsWithUser } from '../../types'
import { GAME_OPTIONS } from '../../constants/game'
import GameEngine from '../../game/GameEngine'

const GamePage: FC<PropsWithUser> = () => {
  let gameEngine: GameEngine | null = null
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  useEffect(() => {
    if (gameEngine) return
    const canvas = canvasRef.current
    gameEngine = new GameEngine({
      canvas: canvas as HTMLCanvasElement,
      gameStateEndCallback: () => {
        alert('Game over!')
        document.location.reload()
      },
    })
  }, [])
  return (
    <div className="game-wrapper">
      <canvas
        ref={canvasRef}
        className="game-canvas"
        width={GAME_OPTIONS.CANVAS_WIDTH}
        height={GAME_OPTIONS.CANVAS_HEIGHT}
      />
    </div>
  )
}

export const Game = withUserCheck(GamePage)
