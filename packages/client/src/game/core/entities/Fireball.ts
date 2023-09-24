import { GAME_OPTIONS } from '../../../constants/game'
import Entity from '../Entity'

const FIREBALL_WIDTH = 20
const FIREBALL_HEIGHT = 20
const FIREBALL_SPEED_MIN = 100
const FIREBALL_SPEED_RANGE = 5

export default class Fireball extends Entity {
  constructor() {
    super({
      position: {
        x: Math.random() * GAME_OPTIONS.CANVAS_WIDTH,
        y: -FIREBALL_HEIGHT,
      },
      offset: {
        dx: Math.random() * 2 - 1,
        dy: Math.random() * FIREBALL_SPEED_RANGE + FIREBALL_SPEED_MIN,
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
