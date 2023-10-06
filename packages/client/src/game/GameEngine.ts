import { GAME_OPTIONS, GAME_RESOURCES } from '../constants/game'
import Entity from './core/Entity'
import Brick from './core/entities/Brick'
import Fireball from './core/entities/Fireball'
import Floor from './core/entities/Floor'
import Player from './core/entities/Player'
import AnimatedSprite from './core/utils/AnimatedSprite'
import KeyControls, { KEYS } from './core/utils/KeyControls'
import Resources, { getResourceUrls } from './core/utils/Resources'

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
  resources: Resources
  lastLoopTime = 0 // время предыдущей итерации игрового цикла

  gameStateEndCallback: () => void
  gameState: GameState = GameState.READY // состояние игры
  gameScore = 0 // кол-во очков
  gameTime = 0 // продолжительность игры
  gameSpeed = 1 // множитель скорости игры

  floor?: Floor
  player?: Player
  bricks?: Brick[]
  fireballs?: Fireball[]

  lastBrick = 0 // время последнего препятствия

  constructor(props: {
    canvas: HTMLCanvasElement
    gameStateEndCallback: () => void
  }) {
    this.canvas = props.canvas
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.gameStateEndCallback = props.gameStateEndCallback
    this.resources = new Resources()
    this.resources.load(getResourceUrls())
    // инициализация после загрузки всех ресурсов
    this.resources.onReady(this.init)
  }

  // инициализация и запуск игрового цикла
  private init = (): void => {
    this.floor = new Floor()
    this.player = new Player(
      new AnimatedSprite({
        resource: this.resources.get(GAME_RESOURCES.PLAYER_RUN),
        startPoint: { x: 0, y: 0 },
        frameSize: { height: 100, width: 100 },
        resultSize: { height: 100, width: 100 },
        speed: 25,
      })
    )
    this.bricks = []
    this.fireballs = []

    KeyControls.setControls()
    this.mainLoop()
  }

  private mainLoop = (currentTime = 0): void => {
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
    // с увеличением времени игры увеличиваетя кол-во попаданий в условие ниже
    // формула: 1 - 0.999^gameTime
    if (Math.random() < 1 - Math.pow(0.999, this.gameTime)) {
      this.fireballs!.push(
        new Fireball(
          new AnimatedSprite({
            resource: this.resources.get(GAME_RESOURCES.FIREBALL),
            startPoint: { x: 0, y: 0 },
            frameSize: { height: 512, width: 512 },
            resultSize: { height: 20 * 5, width: 20 * 5 },
            angle: 90,
            speed: 25,
          })
        )
      )
      this.gameSpeed += GAME_OPTIONS.SPEED_STEP
    }
    // появление препятствия с заданной периодичностью
    if (this.gameTime - this.lastBrick > GAME_OPTIONS.BRICK_TIME / 1000) {
      this.bricks!.push(
        new Brick(
          new AnimatedSprite({
            resource: this.resources.get(GAME_RESOURCES.SPEARS),
            startPoint: { x: 0, y: 0 },
            frameSize: { height: 50, width: 50 },
            resultSize: { height: 50, width: 50 },
          })
        )
      )
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

    setTimeout(this.gameStateEndCallback, 100)
  }

  private render(): void {
    this.context.clearRect(
      0,
      0,
      GAME_OPTIONS.CANVAS_WIDTH,
      GAME_OPTIONS.CANVAS_HEIGHT
    )
    this.floor!.draw(this.context)
    this.player!.draw(this.context)
    for (const brick of this.bricks!) brick.draw(this.context)
    for (const fireballs of this.fireballs!) fireballs.draw(this.context)
    // вывод текущего времени игры
    this.context.font = '30px Verdana'
    this.context.fillStyle = 'gray'
    this.context.textAlign = 'center'
    this.context.textBaseline = 'top'
    this.context.fillText(
      `Score: ${this.gameScore} Time: ${this.gameTime.toFixed(0)}`,
      this.canvas.width / 2,
      50
    )
  }

  public reset(): void {
    this.gameState = GameState.READY
    this.gameScore = 0
    this.gameTime = 0
    this.gameSpeed = 1
  }
}
