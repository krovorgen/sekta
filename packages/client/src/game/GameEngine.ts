import { GAME_OPTIONS } from '../constants/game'
import Entity from './core/Entity'
import Brick from './core/entities/Brick'
import Fireball from './core/entities/Fireball'
import Floor from './core/entities/Floor'
import Player from './core/entities/Player'
import KeyControls, { KEYS } from './core/utils/controls'

export enum GameState {
  // готовность к игре
  READY = 0,
  // игра запущена
  PLAY = 1,
  // игра завершена
  END = 2,
}

export default class GameEngine {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  timestamp: number // время предыдущего обновления и отрисовки

  gameStateEndCallback: () => void
  gameState: GameState = GameState.READY // состояние игры
  gameScore = 0 // кол-во очков
  gameTime = 0 // продолжительность игры
  gameSpeed = 1 // множитель скорости игры

  floor: Floor
  player: Player
  bricks: Brick[]
  lastBrick = 0
  fireballs: Fireball[]

  constructor(props: {
    canvas: HTMLCanvasElement
    gameStateEndCallback: () => void
  }) {
    this.canvas = props.canvas
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.timestamp = performance.now()

    this.gameStateEndCallback = props.gameStateEndCallback

    this.floor = new Floor()
    this.player = new Player()
    this.bricks = []
    this.fireballs = []

    KeyControls.setControls()
    this.mainLoop()
  }

  private mainLoop = (): void => {
    const now = performance.now()
    const dt = (now - this.timestamp) / 1000.0

    this.update(dt)
    this.render()

    this.timestamp = now
    window.requestAnimationFrame(this.mainLoop)
  }

  private update(dt: number): void {
    if (this.gameState == GameState.END) {
      return
    }
    this.gameTime += dt

    this.handleInput(dt * this.gameSpeed)
    this.updateEntities(dt * this.gameSpeed)

    this.checkCollisions()
  }

  private handleInput(dt: number): void {
    if (KeyControls.isKeyDown(KEYS.UP)) {
      this.player.offset.dy -= this.player.speed * dt
    }
    if (KeyControls.isKeyDown(KEYS.DOWN)) {
      this.player.offset.dy += this.player.speed * dt
    }
    if (KeyControls.isKeyDown(KEYS.LEFT)) {
      this.player.offset.dx -= this.player.speed * dt
    }
    if (KeyControls.isKeyDown(KEYS.RIGHT)) {
      this.player.offset.dx += this.player.speed * dt
    }
    if (KeyControls.isKeyDown(KEYS.SPACE)) {
      this.player.jump()
    }
  }

  private updateEntities(dt: number): void {
    // с увеличением времени игры увеличиваетя кол-во попаданий в условие ниже
    // формула: 1 - 0.999^gameTime
    if (Math.random() < 1 - Math.pow(0.999, this.gameTime)) {
      this.fireballs.push(new Fireball())
      this.gameSpeed += GAME_OPTIONS.SPEED_STEP
    }
    // появление препятствия с заданной периодичностью
    if (Date.now() - this.lastBrick > GAME_OPTIONS.BRICK_TIME) {
      this.bricks.push(new Brick())
      this.lastBrick = Date.now()
    }
    // движение игрока
    this.player.update(dt)
    // движение препятствий
    for (const brick of this.bricks) brick.update(dt)
    // движение огненного дождя
    for (const fireball of this.fireballs) fireball.update(dt)
  }

  private checkCollisions(): void {
    // появление/удаление препятствий
    const brickIndexesForDelete: number[] = []
    for (const brick of this.bricks) {
      // проверка на столкновение игрока с камнями
      if (Entity.isCollide(this.player, brick)) {
        this.gameOver()
      }
      // проверка выхода камння за пределы экрана
      if (Entity.isOutside(brick)) {
        brickIndexesForDelete.push(this.bricks.indexOf(brick))
        this.gameScore++
      }
    }
    for (const indexForDelete of brickIndexesForDelete)
      this.bricks.splice(indexForDelete, 1)
    // появление/удаление огненного дождя
    const fireballIndexesForDelete: number[] = []
    for (const fireball of this.fireballs) {
      // проверка на столкновение игрока с огненным дождем
      if (Entity.isCollide(this.player, fireball)) {
        this.gameOver()
      }
      // проверка выхода огненного дождя за пределы экрана
      if (Entity.isOutside(fireball)) {
        brickIndexesForDelete.push(this.fireballs.indexOf(fireball))
      }
    }
    for (const indexForDelete of fireballIndexesForDelete)
      this.fireballs.splice(indexForDelete, 1)
  }

  private gameOver(): void {
    if (this.gameState == GameState.END) return

    this.player.isDead = true
    this.gameState = GameState.END
    this.gameStateEndCallback()
  }

  private render(): void {
    this.context.clearRect(
      0,
      0,
      GAME_OPTIONS.CANVAS_WIDTH,
      GAME_OPTIONS.CANVAS_HEIGHT
    )
    this.floor.draw(this.context)
    this.player.draw(this.context)
    for (const brick of this.bricks) brick.draw(this.context)
    for (const fireballs of this.fireballs) fireballs.draw(this.context)
  }

  private reset(): void {
    this.gameState = GameState.READY
    this.gameScore = 0
    this.gameTime = 0
    this.gameSpeed = 1
  }
}
