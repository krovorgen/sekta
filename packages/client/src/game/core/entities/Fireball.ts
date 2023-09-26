import Entity from '../Entity'
import { GAME_OPTIONS } from '../../../constants/game'
import { randomRange } from '../utils/calculations'

const {
  FIREBALL_WIDTH,
  FIREBALL_HEIGHT,
  FIREBALL_SPEED_MIN,
  FIREBALL_SPEED_MAX,
} = GAME_OPTIONS

export default class Fireball extends Entity {
  constructor() {
    super({
      position: {
        x: randomRange(0, GAME_OPTIONS.CANVAS_WIDTH),
        y: -FIREBALL_HEIGHT,
      },
      offset: {
        dx: randomRange(-1, 1),
        dy: randomRange(FIREBALL_SPEED_MIN, FIREBALL_SPEED_MAX),
      },
      size: { width: FIREBALL_WIDTH, height: FIREBALL_HEIGHT },
    })
  }

  public update(dt: number) {
    this.position.x += this.offset.dx * dt
    this.position.y += this.offset.dy * dt
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.rect(
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    )
    ctx.fillStyle = 'red'
    ctx.fill()
    ctx.closePath()
  }
}
