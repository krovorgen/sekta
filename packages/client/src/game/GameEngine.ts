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
import Particle from './core/Particle'
import Bonus, { BonusType } from './core/entities/Bonus'
import { randomElem } from './core/utils/Calculations'

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
  gameFPS = 0 // текущая частота кадров
  gameTime = 0 // продолжительность игры
  gameSpeed = GAME_OPTIONS.SPEED_INIT // множитель скорости игры

  fireImmunity = false // бонус иммунитета от огненного дождя
  lastFireImmunity = 0 // время последнего иммунитета
  speedSlowdown = false // бонус замедления скорости игры
  lastSpeedSlowdown = 0 // время последнего замедления

  floor?: Floor
  player?: Player
  traps?: Trap[]
  bonuses?: Bonus[]
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
  particles?: Particle[]

  lastBackground = 0 // время последнего изменения фона
  lastTrap = 0 // время последней ловушки
  lastBonus = 0 // время последнего бонуса
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
    // рассчитать пропорцию размера холста по умолчанию
    this.canvasRatio = GAME_OPTIONS.CANVAS_HEIGHT / GAME_OPTIONS.CANVAS_WIDTH
    this.resizeCanvas()
    // сбросить игровые настройки
    this.reset()
    // подключить события управления
    KeyControls.setControls()
    TouchControls.setControls()
    GamepadControls.setControls()
    // запустить игровой цикл
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
    this.gameSpeed = GAME_OPTIONS.SPEED_INIT

    this.backgroundIndex = 0
    this.currentBackground = new Background(
      this.backgroundList[this.backgroundIndex],
      this.resources
    )
    this.prevBackground = undefined
    this.particles = []
    this.floor = new Floor()
    this.player = new Player(this.resources)
    this.traps = []
    this.bonuses = []
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
    this.gameFPS = Math.floor(1000 / deltaTime)
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
      this.player!.slide(player => {
        // эффект частиц при быстром падении
        const particleSrcX = player.position.x + player.size.width / 2
        const particleSrcY = player.position.y + player.size.height
        for (let i = 0; i < 5; i++) {
          this.particles!.push(
            new Particle({
              color: 'red',
              position: { x: particleSrcX, y: particleSrcY },
            })
          )
          this.particles!.push(
            new Particle({
              color: 'orange',
              position: { x: particleSrcX, y: particleSrcY },
            })
          )
          this.particles!.push(
            new Particle({
              color: 'yellow',
              position: { x: particleSrcX, y: particleSrcY },
            })
          )
        }
      })
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
    this.currentBackground!.update(dt * this.gameSpeed)
    this.prevBackground?.update(dt * this.gameSpeed)
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
      const newFireball = new Fireball(this.resources)
      if (
        this.fireballs!.every(
          fb =>
            newFireball.position.x > fb.position.x + fb.size.width ||
            newFireball.position.x < fb.position.x - fb.size.width
        )
      )
        this.fireballs!.push(newFireball)
      this.gameSpeed += GAME_OPTIONS.SPEED_STEP
    }
    // появление ловушек с заданной периодичностью
    if (this.gameTime - this.lastTrap > GAME_OPTIONS.TRAP_TIME / 1000) {
      this.traps!.push(new Trap(this.resources))
      this.lastTrap = this.gameTime
    }
    // появление бонусов с заданной периодичностью
    if (this.gameTime - this.lastBonus > GAME_OPTIONS.BONUS_TIME / 1000) {
      if (randomElem([true, false]) as boolean)
        this.bonuses!.push(new Bonus(this.resources))
      this.lastBonus = this.gameTime
    }
    // движение игрока
    this.player!.update(dt)
    // движение частиц (эффекты)
    for (const particle of this.particles!) particle.update()
    // движение ловушек
    for (const trap of this.traps!) trap.update(dt * this.gameSpeed)
    // движение бонусов
    for (const bonus of this.bonuses!) bonus.update(dt * this.gameSpeed)
    // движение огненного дождя
    for (const fireball of this.fireballs!) fireball.update(dt)
    // действие/сброс бонусов
    if (this.fireImmunity) {
      // иммунитет от огненного дождя
      // TODO: включить дождь...
      if (
        this.gameTime - this.lastFireImmunity >
        GAME_OPTIONS.FIRE_IMMUNITY_DURATION / 1000
      ) {
        this.fireImmunity = false
      }
    }
    if (this.speedSlowdown) {
      // замедление скорости игры
      if (this.gameSpeed > 1.0) this.gameSpeed -= GAME_OPTIONS.SPEED_STEP * 0.5
      if (
        this.gameTime - this.lastSpeedSlowdown >
        GAME_OPTIONS.SPEED_SLOWDOWN_DURATION / 1000
      ) {
        this.speedSlowdown = false
      }
    }
  }

  private checkCollisions(): void {
    // анализ столкновений ловушек
    for (const trap of this.traps!) {
      // проверка на столкновение игрока с ловушками
      if (Entity.isCollide(this.player!, trap)) {
        this.player!.death()
        this.gameOver()
        break
      }
    }
    // анализ столкновений бонусов
    for (const bonus of this.bonuses!) {
      // проверка на столкновение игрока с бонусом
      if (Entity.isCollide(this.player!, bonus)) {
        if (bonus.bonusType == BonusType.IMMUNITY) {
          this.fireImmunity = true // включить иммунитет
          this.lastFireImmunity = this.gameTime
        } else if (bonus.bonusType == BonusType.SLOWDOWN) {
          this.speedSlowdown = true // включить замедление
          this.lastSpeedSlowdown = this.gameTime
        }
        bonus.deleted = true // исчезновение бонуса
        break
      }
    }
    // анализ столкновений огненного дождя
    for (const fireball of this.fireballs!) {
      // проверка на столкновение игрока с огненным дождем
      if (!this.fireImmunity && Entity.isCollide(this.player!, fireball)) {
        this.player!.death()
        this.gameOver()
        break
      }
    }
    // удалить частицы с истекшим временем жизни
    this.particles = this.particles!.filter(particle => particle.life > 0)
    // удалить ловушки вышедшие за пределы экрана
    this.traps = this.traps!.filter(trap => !trap.isOutside() && !trap.deleted)
    // удалить бонусы вышедшие за пределы экрана
    this.bonuses = this.bonuses!.filter(
      bonus => !bonus.isOutside() && !bonus.deleted
    )
    // удалить огненный дождь вышедший за пределы экрана
    this.fireballs = this.fireballs!.filter(
      fireball => !fireball.isOutside() && !fireball.deleted
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
    this.currentBackground!.draw(this.context)
    this.prevBackground?.draw(this.context)
    this.floor!.draw(this.context)
    for (const trap of this.traps!) trap.draw(this.context)
    for (const bonus of this.bonuses!) bonus.draw(this.context)
    this.player!.draw(this.context)
    for (const particle of this.particles!) particle.draw(this.context)
    for (const fireball of this.fireballs!)
      fireball.draw(this.context, this.fireImmunity ? 0.35 : 1.0)
    this.renderUI(this.context)
  }
  private renderUI(ctx: CanvasRenderingContext2D): void {
    ctx.save()
    // общая игровая информация
    ctx.fillStyle = 'black'
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)'
    ctx.lineJoin = 'round'
    ctx.font = '20px Arial'
    const maxTimeText =
      `Max Time: ${timeFormatter(this.maxGameTime)}` +
      (GAME_OPTIONS.GAME_DEBUG ? `    FPS: ${this.gameFPS}` : ``)
    ctx.strokeText(maxTimeText, 10, 55)
    ctx.fillText(maxTimeText, 10, 55)
    const gameTimePercent = (this.gameTime / this.maxGameTime) * 100
    const gameTimeText = `Current Time: ${timeFormatter(
      this.gameTime
    )} (${gameTimePercent.toFixed(0)}%)`
    ctx.strokeText(gameTimeText, 10, 85)
    ctx.fillText(gameTimeText, 10, 85)
    const gameSpeed = 'Speed: ' + this.gameSpeed.toFixed(1) + 'x'
    ctx.strokeText(gameSpeed, GAME_OPTIONS.CANVAS_WIDTH / 2, 55)
    ctx.fillText(gameSpeed, GAME_OPTIONS.CANVAS_WIDTH / 2, 55)
    // информация по текущим бонусам
    let bonusText = ''
    if (this.fireImmunity) {
      const bonusTimeLeft =
        GAME_OPTIONS.FIRE_IMMUNITY_DURATION / 1000 -
        (this.gameTime - this.lastFireImmunity)
      bonusText += 'Immunity: ' + timeFormatter(bonusTimeLeft) + '  '
    }
    if (this.speedSlowdown) {
      const bonusTimeLeft =
        GAME_OPTIONS.SPEED_SLOWDOWN_DURATION / 1000 -
        (this.gameTime - this.lastSpeedSlowdown)
      bonusText += 'Slowdown: ' + timeFormatter(bonusTimeLeft)
    }
    ctx.strokeText(bonusText, GAME_OPTIONS.CANVAS_WIDTH / 2, 85)
    ctx.fillText(bonusText, GAME_OPTIONS.CANVAS_WIDTH / 2, 85)
    // индикатор возможности прыжка
    const jumpReadyRatio = Math.min(
      this.player!.jumpDeltaTime() / GAME_OPTIONS.PLAYER_JUMP_BLOCKTIME,
      1.0
    )
    ctx.fillStyle = 'yellow'
    ctx.fillRect(0, 0, jumpReadyRatio * GAME_OPTIONS.CANVAS_WIDTH, 5)
    // индикатор возможности проскальзывания
    const slideReadyRatio = Math.min(
      this.player!.slideDeltaTime() / GAME_OPTIONS.PLAYER_SLIDE_BLOCKTIME,
      1.0
    )
    ctx.fillStyle = 'gold'
    ctx.fillRect(0, 5, slideReadyRatio * GAME_OPTIONS.CANVAS_WIDTH, 5)
    // подсказки по огненному дождю
    for (const fireball of this.fireballs!) {
      if (fireball.position.y < -fireball.size.height) {
        ctx.fillStyle = this.fireImmunity ? 'blue' : 'red'
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)'
        ctx.font = '15px Arial'
        ctx.strokeText(
          Math.abs(fireball.position.y + fireball.size.height).toFixed(0) + 'm',
          fireball.position.x,
          25
        )
        ctx.fillText(
          Math.abs(fireball.position.y + fireball.size.height).toFixed(0) + 'm',
          fireball.position.x,
          25
        )
      }
    }
    ctx.restore()
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
