import 'jest-canvas-mock'
import { GAME_OPTIONS } from '../constants/game'
import GameEngine, { GameState } from './GameEngine'
import Trap from './core/entities/Trap'

describe('GameEngine', () => {
  let canvas: HTMLCanvasElement | null
  let gameStateEndCallback
  let gameEngine: GameEngine

  beforeEach(() => {
    canvas = document.createElement('canvas') as HTMLCanvasElement
    canvas.id = 'gameCanvas'
    document.body.appendChild(canvas)

    gameStateEndCallback = jest.fn()

    // Создаем экземпляр GameEngine внутри теста
    gameEngine = new GameEngine({
      canvas,
      gameStateEndCallback,
      disableResources: true,
      lastScope: null,
    })
  })

  afterEach(() => {
    // Очищаем экземпляр GameEngine после каждого теста
    canvas?.remove()
    // gameEngine = null
  })

  it('should initialize with the READY game state', () => {
    expect(gameEngine?.gameState).toBe(GameState.READY)
  })

  it('should reset the game state to READY', () => {
    gameEngine.gameState = GameState.END
    gameEngine.reset()
    expect(gameEngine.gameState).toBe(GameState.READY)
  })

  it('should update game entities', () => {
    const initialFireballsCount: number | bigint = gameEngine?.fireballs
      ?.length as number | bigint
    const initialTrapsCount: number | bigint = gameEngine?.traps?.length as
      | number
      | bigint
    gameEngine.gameTime = 9000
    gameEngine.lastTrap = 3000

    gameEngine['updateEntities'](0.9)
    // Проверяем, что количество огненных шаров и ловушек увеличилось
    expect(gameEngine?.fireballs?.length).toBeGreaterThan(initialFireballsCount)
    expect(gameEngine?.traps?.length).toBeGreaterThan(initialTrapsCount)
  })

  it('should check collisions correctly', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const player = gameEngine.player
    if (!player) fail('player is undefined')

    // Создаем Trap, который находится в точке, где должно произойти столкновение
    const trap = new Trap()
    trap.position.x = player.position.x // Устанавливаем координаты так, чтобы было столкновение
    trap.position.y = player.position.y

    // Добавляем Trap и игрока в игровой движок
    gameEngine.traps?.push(trap)
    gameEngine.player = player

    // Проверяем, что в начале игры gameState равен READY
    expect(gameEngine?.gameState).toBe(GameState.READY)

    // Вызываем checkCollisions, чтобы обнаружить столкновение
    gameEngine['checkCollisions']()

    // Проверяем, что gameState переходит в состояние END после столкновения
    expect(gameEngine?.gameState).toBe(GameState.END)

    // Проверяем, что игрок умирает (isDead становится true) после столкновения
    expect(player?.isDead).toBe(true)
  })

  it('should handle game over state', () => {
    const gameStateEndCallback = gameEngine?.gameStateEndCallback
    jest.useFakeTimers()

    gameEngine['gameOver']()

    // Проверяем, что игра переходит в состояние END
    expect(gameEngine?.gameState).toBe(GameState.END)

    // Проверяем, что колбэк gameStateEndCallback вызывается через setTimeout
    jest.advanceTimersByTime(500)
    expect(gameStateEndCallback).toHaveBeenCalled()

    jest.useRealTimers()
  })

  it('should render game elements correctly', () => {
    // Мокаем методы отрисовки игровых элементов
    const context: CanvasRenderingContext2D | undefined = gameEngine?.context
    if (context) context.clearRect = jest.fn()
    if (!gameEngine.player) fail('player is undefined')
    if (!gameEngine.floor) fail('floor is undefined')
    gameEngine.floor.draw = jest.fn()
    gameEngine.player.draw = jest.fn()
    gameEngine.traps?.forEach(trap => (trap.draw = jest.fn()))
    if (gameEngine)
      gameEngine.fireballs?.forEach(fireball => (fireball.draw = jest.fn()))

    gameEngine['render']()

    // Проверяем, что методы отрисовки были вызваны с правильными параметрами
    expect(context?.clearRect).toHaveBeenCalledWith(
      0,
      0,
      GAME_OPTIONS.CANVAS_WIDTH,
      GAME_OPTIONS.CANVAS_HEIGHT
    )
    expect(gameEngine?.floor?.draw).toHaveBeenCalledWith(context)
    expect(gameEngine?.player?.draw).toHaveBeenCalledWith(context)
    gameEngine?.traps?.forEach(trap => {
      expect(trap.draw).toHaveBeenCalledWith(context)
    })
    gameEngine?.fireballs?.forEach(fireball => {
      expect(fireball.draw).toHaveBeenCalledWith(context)
    })
    // Проверяем, что текущее время и счет отображаются корректно
    expect(context?.fillText).toHaveBeenCalledWith(
      expect.stringContaining('Time:'),
      expect.any(Number),
      expect.any(Number)
    )
  })
})
