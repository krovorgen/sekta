import { GAME_OPTIONS } from '../../../constants/game'
import Entity from '../Entity'

const PLAYER_WIDTH = 50
const PLAYER_HEIGHT = 100
const PLAYER_SPEED = 200
const PLAYER_LEFT_OFFSET = 50
const PLAYER_JUMP_MULTIPLIER = 1.8
const PLAYER_JUMP_DURATION = 500
const PLAYER_JUMP_BLOCKTIME = 1500

export default class Player extends Entity {
  isDead = false
  isJump = false
  lastJump = 0
  speed = PLAYER_SPEED

  constructor() {
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
  }

  public draw(ctx: CanvasRenderingContext2D) {
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
