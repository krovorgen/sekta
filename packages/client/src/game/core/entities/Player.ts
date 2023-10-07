import { GAME_OPTIONS, GAME_RESOURCES } from '../../../constants/game'
import Entity from '../Entity'
import AnimatedSprite from '../utils/AnimatedSprite'
import Resources from '../utils/Resources'

const {
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
  PLAYER_SPEED,
  PLAYER_LEFT_OFFSET,
  PLAYER_JUMP_MULTIPLIER,
  PLAYER_JUMP_DURATION,
  PLAYER_JUMP_BLOCKTIME,
} = GAME_OPTIONS

export default class Player extends Entity {
  isDead = false
  isJump = false
  lastJump = 0
  moveSpeed = PLAYER_SPEED
  spriteRun?: AnimatedSprite

  constructor(resources: Resources) {
    super({
      position: {
        x: PLAYER_LEFT_OFFSET,
        y:
          GAME_OPTIONS.CANVAS_HEIGHT -
          GAME_OPTIONS.FLOOR_HEIGHT -
          PLAYER_HEIGHT,
      },
      offset: { dx: 0, dy: 0 },
      size: { width: PLAYER_WIDTH, height: PLAYER_HEIGHT },
    })
    this.spriteRun = new AnimatedSprite({
      resource: resources.get(GAME_RESOURCES.PLAYER_RUN),
      mapPoint: { x: 0, y: 0 },
      frameSize: { height: 100, width: 100 },
      resultSize: { height: 100, width: 100 },
      speed: 25,
    })
  }

  public jump() {
    if (
      !this.isJump && // блокировка частого прыжка
      Date.now() - this.lastJump > PLAYER_JUMP_BLOCKTIME
    ) {
      this.isJump = true
      this.lastJump = Date.now()
    }
  }
  public up() {
    this.offset.dy -= this.moveSpeed
  }
  public down() {
    this.offset.dy += this.moveSpeed
  }
  public left() {
    this.offset.dx -= this.moveSpeed
  }
  public right() {
    this.offset.dx += this.moveSpeed
  }

  public update(dt: number) {
    // прыжок игрока
    if (
      this.isJump && // длительность прыжка
      Date.now() - this.lastJump < PLAYER_JUMP_DURATION
    ) {
      this.offset.dy -= GAME_OPTIONS.GRAVITY_VALUE * PLAYER_JUMP_MULTIPLIER
    }
    // гравитация игрока
    this.offset.dy += GAME_OPTIONS.GRAVITY_VALUE
    // сила трения
    this.offset.dx -= this.offset.dx * GAME_OPTIONS.FRICTION_FORCE
    // движение игрока
    this.position.x += this.offset.dx * dt
    this.position.y += this.offset.dy * dt
    // органичение зоны движения игрока
    if (this.position.x + this.size.width > GAME_OPTIONS.CANVAS_WIDTH) {
      this.position.x = GAME_OPTIONS.CANVAS_WIDTH - this.size.width
      this.offset.dx = 0
    }
    if (this.position.x < 0) {
      this.position.x = 0
      this.offset.dx = 0
    }
    if (
      this.position.y + this.size.height >
      GAME_OPTIONS.CANVAS_HEIGHT - GAME_OPTIONS.FLOOR_HEIGHT
    ) {
      this.position.y =
        GAME_OPTIONS.CANVAS_HEIGHT -
        GAME_OPTIONS.FLOOR_HEIGHT -
        this.size.height
      this.offset.dy = 0
      this.isJump = false
    }
    if (this.position.y < 0) {
      this.position.y = 0
      this.offset.dy = 0
    }

    // воспроизведение анимации
    this.spriteRun?.update(dt)
  }

  public draw(ctx: CanvasRenderingContext2D) {
    if (this.spriteRun) {
      this.spriteRun.render(ctx, this)
    } else {
      ctx.beginPath()
      ctx.rect(
        this.position.x,
        this.position.y,
        this.size.width,
        this.size.height
      )
      ctx.fillStyle = this.isDead ? 'red' : 'green'
      ctx.fill()
      ctx.closePath()
    }
  }
}
