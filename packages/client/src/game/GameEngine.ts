import { GAME_OPTIONS } from '../constants/game'
import { GAME_RESOURCES } from '../constants/resources'
import Entity from './core/Entity'
import Background, { BACKGROUND_TYPE } from './core/entities/Background'
import Trap from './core/entities/Trap'
import Fireball from './core/entities/Fireball'
import Floor from './core/entities/Floor'
import Player from './core/entities/Player'
import KeyControls, { KEYS } from './core/utils/KeyControls'
import Resources, { TResource, getResourceUrls } from './core/utils/Resources'

import { timeFormatter } from '../utils/timeFormatter'
import Sound from './core/utils/Sound'
import TouchControls, { TOUCH_AREA } from './core/utils/TouchControls'
import GamepadControls, { GAMEPAD_ACT } from './core/utils/GamepadControls'
import { ScopeResultDTO } from '../api/LeaderboardAPI'

export enum GameState {
  // готовность к игре
  READY = 0,
  // игра запущена
  PLAY = 1,
  // игра завершена
  END = 2,
}
export type GameStateProps = {
  gameTime: number
  maxGameTime: number
}
export default class GameEngine {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  resources?: Resources
  lastLoopTime = 0 // время предыдущей итерации игрового цикла

  gameStateEndCallback: (props: GameStateProps) => void
  gameState: GameState = GameState.READY // состояние игры
  gameTime = 0 // продолжительность игры
  gameSpeed = 1 // множитель скорости игры

  floor?: Floor
  player?: Player
  traps?: Trap[]
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
  lastTrap = 0 // время последней ловушки
  maxGameTime = 0 // максимальное время игры

  backgroundSound?: Sound

  constructor(props: {
    canvas: HTMLCanvasElement
    disableResources?: boolean
    gameStateEndCallback: (props: GameStateProps) => void
    lastScope: ScopeResultDTO | null
  }) {
    this.canvas = props.canvas
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.gameStateEndCallback = props.gameStateEndCallback
    this.maxGameTime = (props.lastScope?.time ?? 0) / 1000
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
    TouchControls.setControls()
    GamepadControls.setControls()
    // рассчитать пропорцию размера холста по умолчанию
    this.canvasRatio = GAME_OPTIONS.CANVAS_HEIGHT / GAME_OPTIONS.CANVAS_WIDTH
    this.resizeCanvas()
    this.mainLoop()
  }
  private canvasRatio?: number
  public resizeCanvas() {
    const canvasOffsetPercent = GAME_OPTIONS.CANVAS_OFFSET // размер меню на экране в процентах
    const pageWidth = document.documentElement.clientWidth
    const pageHeight = document.documentElement.clientHeight
    // рассчитать максимально возможные ширину и высоту холста
    let canvasWidth = Math.round(pageWidth)
    let canvasHeight = Math.round(canvasWidth * this.canvasRatio!)
    if (canvasHeight > pageHeight - pageHeight * canvasOffsetPercent) {
      canvasHeight = Math.round(pageHeight - pageHeight * canvasOffsetPercent)
      canvasWidth = Math.round(canvasHeight / this.canvasRatio!)
    }
    // растянуть холст на весь экран с учетом пропорции и смещения
    this.canvas.width = GAME_OPTIONS.CANVAS_WIDTH = canvasWidth
    this.canvas.height = GAME_OPTIONS.CANVAS_HEIGHT = canvasHeight
  }
  public reset(): void {
    this.gameState = GameState.READY
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
    this.traps = []
    this.fireballs = []

    this.lastBackground = 0
    this.lastTrap = 0

    this.backgroundSound = new Sound({
      resource: this.resources?.get(
        GAME_RESOURCES.BACKGROUND_SOUND
      ) as TResource,
      volume: GAME_OPTIONS.BACKGROUND_SOUND_VOLUME,
      lopped: true,
    })
    this.backgroundSound.play()
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

    this.lastLoopTime = performance.now()
    setTimeout(() => {
      window.requestAnimationFrame(this.mainLoop)
    }, 1000 / GAME_OPTIONS.GAME_MAIN_FPS)
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
    GamepadControls.updateControls()
    if (
      KeyControls.isKeyDown(KEYS.UP) ||
      KeyControls.isKeyDown(KEYS.W) ||
      KeyControls.isKeyDown(KEYS.SPACE) ||
      GamepadControls.isAct(GAMEPAD_ACT.UP) ||
      TouchControls.isTouched(TOUCH_AREA.TOP)
    ) {
      this.player!.jump()
    }
    if (
      KeyControls.isKeyDown(KEYS.DOWN) ||
      KeyControls.isKeyDown(KEYS.S) ||
      GamepadControls.isAct(GAMEPAD_ACT.DOWN) ||
      TouchControls.isTouched(TOUCH_AREA.BOTTOM)
    ) {
      this.player!.down()
    }
    if (
      KeyControls.isKeyDown(KEYS.LEFT) ||
      KeyControls.isKeyDown(KEYS.A) ||
      GamepadControls.isAct(GAMEPAD_ACT.LEFT) ||
      TouchControls.isTouched(TOUCH_AREA.LEFT)
    ) {
      this.player!.left()
    }
    if (
      KeyControls.isKeyDown(KEYS.RIGHT) ||
      KeyControls.isKeyDown(KEYS.D) ||
      GamepadControls.isAct(GAMEPAD_ACT.RIGHT) ||
      TouchControls.isTouched(TOUCH_AREA.RIGHT)
    ) {
      this.player!.right()
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
    // появление ловушек с заданной периодичностью
    if (this.gameTime - this.lastTrap > GAME_OPTIONS.TRAP_TIME / 1000) {
      this.traps!.push(new Trap(this.resources))
      this.lastTrap = this.gameTime
    }
    // движение игрока
    this.player!.update(dt)
    // движение ловушек
    for (const trap of this.traps!) trap.update(dt * this.gameSpeed)
    // движение огненного дождя
    for (const fireball of this.fireballs!) fireball.update(dt * this.gameSpeed)
  }

  private checkCollisions(): void {
    // появление/удаление ловушек
    for (const trap of this.traps!) {
      // проверка на столкновение игрока с камнями
      if (Entity.isCollide(this.player!, trap)) {
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
    // удалить ловушки вышедшие за пределы экрана
    const newTraps = this.traps!.filter(trap => !Entity.isOutside(trap))
    const delTrapsCount = this.traps!.length - newTraps.length
    this.traps = newTraps
    // удалить огненный дождь вышедший за пределы экрана
    this.fireballs = this.fireballs!.filter(
      fireball => !Entity.isOutside(fireball)
    )
  }

  private stopSounds(): void {
    this.backgroundSound?.stop()
    this.player?.run_sound?.stop()
  }

  private gameOver(): void {
    if (this.gameState == GameState.END) return
    this.gameState = GameState.END
    if (this.gameTime > this.maxGameTime) this.maxGameTime = this.gameTime
    this.stopSounds()

    setTimeout(
      () =>
        this.gameStateEndCallback({
          gameTime: this.gameTime,
          maxGameTime: this.maxGameTime,
        }),
      500
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
    for (const trap of this.traps!) trap.draw(this.context)
    for (const fireballs of this.fireballs!) fireballs.draw(this.context)
    // вывод текущего времени игры
    const timeText = `Current Time: ${timeFormatter(
      this.gameTime
    )}          Max Time: ${timeFormatter(this.maxGameTime)}`
    this.context.font = '30px Verdana'
    this.context.fillStyle = 'gray'
    this.context.textAlign = 'center'
    this.context.textBaseline = 'top'
    this.context.strokeStyle = 'white'
    this.context.lineWidth = 0.75
    this.context.strokeText(timeText, this.canvas.width / 2, 15)
    this.context.fillText(timeText, this.canvas.width / 2, 15)
  }

  public destroy(): void {
    // сброс игровых объектов
    this.reset()
    // остановка игрового цикла
    this.lastLoopTime = -1
    // остановка звукового сопровождения
    this.stopSounds()
    // очистка обработчиков событий
    GamepadControls.clearControls()
    TouchControls.clearControls()
    KeyControls.clearControls()
  }
}
