import './Game.scss'
import React, { FC, useEffect, useRef } from 'react'
import { withUserCheck } from '../../HOC/withUserCheck'
import { PropsWithUser } from '../../types'
import { GAME_OPTIONS } from '../../constants/game'
import GameEngine from '../../game/GameEngine'

const GamePage: FC<PropsWithUser> = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    new GameEngine({
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
