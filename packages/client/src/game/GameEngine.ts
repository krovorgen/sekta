import { GAME_OPTIONS } from '../constants/game'
import Entity from './core/Entity'
import Brick from './core/entities/Brick'
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
    this.bricks = [new Brick()]

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
      // ...
      return
    }
    this.gameTime += dt

    this.handleInput(dt)
    this.updateEntities(dt)

    // с увеличением времени игры увеличиваетя кол-во попаданий в условие ниже
    // формула: 1 - 0.993^gameTime
    if (Math.random() < 1 - Math.pow(0.993, this.gameTime)) {
      //enemies.push({});
      //speed++;
    }

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
      this.player.jump(dt)
    }
  }

  private updateEntities(dt: number): void {
    this.player.position.x += this.player.offset.dx * dt
    this.player.position.y += this.player.offset.dy * dt
    for (const brick of this.bricks) {
      brick.position.x += brick.offset.dx * dt
      brick.position.y += brick.offset.dy * dt
    }
  }

  private checkCollisions(): void {
    for (const brick of this.bricks) {
      // проверка на столкновение игрока с камнями
      if (Entity.isCollide(this.player, brick)) {
        this.player.isDead = true
        this.gameState = GameState.END
        setTimeout(this.gameStateEndCallback, 100)
      }
    }
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
  }

  private reset(): void {
    this.gameState = GameState.READY
    this.gameScore = 0
    this.gameTime = 0
    this.gameSpeed = 1
  }
}
