import { GAME_OPTIONS } from '../../../constants/game'
import Entity from '../Entity'

export default class Player extends Entity {
  isDead = false
  isJump = false
  lastJump = 0
  speed = 50

  constructor() {
    super({
      position: {
        x: 50,
        y: GAME_OPTIONS.CANVAS_HEIGHT - GAME_OPTIONS.FLOOR_HEIGHT - 100,
      },
      offset: { dx: 0, dy: 0 },
      size: { width: 50, height: 100 },
    })
  }

  public jump(dt: number) {
    if (Date.now() - this.lastJump > 1000) {
      this.isJump = false
      this.offset.dy = 0
    }
    if (!this.isJump) {
      this.isJump = true
      this.lastJump = Date.now()
      this.offset.dy = -50 * dt
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
