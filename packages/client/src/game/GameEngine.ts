import { GAME_OPTIONS } from '../constants/game'
import Entity from './core/Entity'
import Background, { BACKGROUND_TYPE } from './core/entities/Background'
import Brick from './core/entities/Brick'
import Fireball from './core/entities/Fireball'
import Floor from './core/entities/Floor'
import Player from './core/entities/Player'
import KeyControls, { KEYS } from './core/utils/KeyControls'
import Resources, { getResourceUrls } from './core/utils/Resources'

import { timeFormatter } from '../utils/timeFormatter'

export enum GameState {
  // готовность к игре
  READY = 0,
  // игра запущена
  PLAY = 1,
  // игра завершена
  END = 2,
}
export type GameStateProps = {
  gameScore: number
  gameTime: number
}
export default class GameEngine {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  resources?: Resources
  lastLoopTime = 0 // время предыдущей итерации игрового цикла

  gameStateEndCallback: (props: GameStateProps) => void
  gameState: GameState = GameState.READY // состояние игры
  gameScore = 0 // кол-во очков
  gameTime = 0 // продолжительность игры
  gameSpeed = 1 // множитель скорости игры

  floor?: Floor
  player?: Player
  bricks?: Brick[]
  fireballs?: Fireball[]

  backgroundIndex = 0
  backgroundList: BACKGROUND_TYPE[] = [
    BACKGROUND_TYPE.CITY_DAY,
    BACKGROUND_TYPE.CITY_NIGHT,
    BACKGROUND_TYPE.FOREST_NIGHT,
    BACKGROUND_TYPE.FOREST_DAY,
  ]
  currentBackground?: Background
  prevBackground?: Background

  lastBackground = 0 // время последнего изменения фона
  lastBrick = 0 // время последнего препятствия

  constructor(props: {
    canvas: HTMLCanvasElement
    disableResources?: boolean
    gameStateEndCallback: (props: GameStateProps) => void
  }) {
    this.canvas = props.canvas
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.gameStateEndCallback = props.gameStateEndCallback
    if (props.disableResources) {
      this.init()
      return
    }
    this.resources = new Resources() // хранилище ресурсов
    this.resources.load(getResourceUrls())
    // инициализация после загрузки всех ресурсов
    this.resources.onReady(this.init)
  }

  // инициализация и запуск игрового цикла
  public init = (): void => {
    this.reset()
    KeyControls.setControls()
    this.mainLoop()
  }
  public reset(): void {
    this.gameState = GameState.READY
    this.gameScore = 0
    this.gameTime = 0
    this.gameSpeed = 1

    this.backgroundIndex = 0
    this.currentBackground = new Background(
      this.backgroundList[this.backgroundIndex],
      this.resources
    )
    this.prevBackground = undefined
    this.floor = new Floor()
    this.player = new Player(this.resources)
    this.bricks = []
    this.fireballs = []

    this.lastBackground = 0
    this.lastBrick = 0
  }

  private mainLoop = (currentTime = 0): void => {
    if (this.lastLoopTime === -1) {
      // остановка игрового цикла
      this.lastLoopTime = 0
      return
    }
    const deltaTime = currentTime - this.lastLoopTime
    const minDeltaTime = 1000 / GAME_OPTIONS.GAME_MIN_FPS

    // если с предыдущего кадра прошло слишком много времени
    // то обновление и отрисовка не производится (например, браузер был НЕ активен)
    if (deltaTime < minDeltaTime) {
      this.update(deltaTime / 1000)
      this.render()
    }

    this.lastLoopTime = currentTime
    window.requestAnimationFrame(this.mainLoop)
  }

  private update(dt: number): void {
    if (this.gameState == GameState.END) {
      return
    }
    this.gameTime += dt

    this.handleInput()
    this.updateEntities(dt)

    this.checkCollisions()
  }

  private handleInput(): void {
    if (KeyControls.isKeyDown(KEYS.UP)) {
      this.player!.up()
    }
    if (KeyControls.isKeyDown(KEYS.DOWN)) {
      this.player!.down()
    }
    if (KeyControls.isKeyDown(KEYS.LEFT)) {
      this.player!.left()
    }
    if (KeyControls.isKeyDown(KEYS.RIGHT)) {
      this.player!.right()
    }
    if (KeyControls.isKeyDown(KEYS.SPACE)) {
      this.player!.jump()
    }
  }

  private updateEntities(dt: number): void {
    // обновить движение/переход бесшовного фона
    this.currentBackground!.update(dt)
    this.prevBackground?.update(dt)
    // изменение фона с заданной периодичностью
    if (
      this.gameTime - this.lastBackground >
      GAME_OPTIONS.BACKGROUND_TIME / 1000
    ) {
      this.backgroundIndex++
      this.prevBackground = this.currentBackground
      this.prevBackground!.fading = true // эффект исчезания старого фона
      this.currentBackground = new Background( // применить отображение следующего фона
        this.backgroundList[this.backgroundIndex % this.backgroundList.length],
        this.resources
      )
      this.lastBackground = this.gameTime
    }
    // с увеличением времени игры увеличиваетя кол-во попаданий в условие ниже
    // формула: 1 - 0.999^gameTime
    if (Math.random() < 1 - Math.pow(0.999, this.gameTime)) {
      this.fireballs!.push(new Fireball(this.resources))
      this.gameSpeed += GAME_OPTIONS.SPEED_STEP
    }
    // появление препятствия с заданной периодичностью
    if (this.gameTime - this.lastBrick > GAME_OPTIONS.BRICK_TIME / 1000) {
      this.bricks!.push(new Brick(this.resources))
      this.lastBrick = this.gameTime
    }
    // движение игрока
    this.player!.update(dt)
    // движение препятствий
    for (const brick of this.bricks!) brick.update(dt * this.gameSpeed)
    // движение огненного дождя
    for (const fireball of this.fireballs!) fireball.update(dt * this.gameSpeed)
  }

  private checkCollisions(): void {
    // появление/удаление препятствий
    for (const brick of this.bricks!) {
      // проверка на столкновение игрока с камнями
      if (Entity.isCollide(this.player!, brick)) {
        this.player!.isDead = true
        this.gameOver()
        break
      }
    }
    // появление/удаление огненного дождя
    for (const fireball of this.fireballs!) {
      // проверка на столкновение игрока с огненным дождем
      if (Entity.isCollide(this.player!, fireball)) {
        this.player!.isDead = true
        this.gameOver()
        break
      }
    }
    // удалить камни вышедшие за пределы экрана
    const newBricks = this.bricks!.filter(brick => !Entity.isOutside(brick))
    const delBricksCount = this.bricks!.length - newBricks.length
    this.gameScore += delBricksCount
    this.bricks = newBricks
    // удалить огненный дождь вышедший за пределы экрана
    this.fireballs = this.fireballs!.filter(
      fireball => !Entity.isOutside(fireball)
    )
  }

  private gameOver(): void {
    if (this.gameState == GameState.END) return
    this.gameState = GameState.END

    setTimeout(
      () =>
        this.gameStateEndCallback({
          gameScore: this.gameScore,
          gameTime: this.gameTime,
        }),
      100
    )
  }

  private render(): void {
    this.context.clearRect(
      0,
      0,
      GAME_OPTIONS.CANVAS_WIDTH,
      GAME_OPTIONS.CANVAS_HEIGHT
    )
    this.floor!.draw(this.context)
    this.currentBackground!.draw(this.context)
    this.prevBackground?.draw(this.context)
    this.player!.draw(this.context)
    for (const brick of this.bricks!) brick.draw(this.context)
    for (const fireballs of this.fireballs!) fireballs.draw(this.context)
    // вывод текущего времени игры
    this.context.font = '30px Verdana'
    this.context.fillStyle = 'gray'
    this.context.textAlign = 'center'
    this.context.textBaseline = 'top'
    this.context.fillText(
      `Time: ${timeFormatter(Math.trunc(this.gameTime * 1000))}`,
      this.canvas.width / 2,
      150
    )
  }

  public destroy(): void {
    // сброс игровых объектов
    this.reset()
    // остановка игрового цикла
    this.lastLoopTime = -1
    // очистка обработчиков событий
    KeyControls.clearControls()
  }
}
