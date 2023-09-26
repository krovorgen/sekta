import { GAME_OPTIONS } from '../../../constants/game'
import Entity from '../Entity'

const { BRICK_WIDTH, BRICK_HEIGHT, BRICK_SPEED } = GAME_OPTIONS

export default class Brick extends Entity {
  constructor() {
    super({
      position: {
        x: GAME_OPTIONS.CANVAS_WIDTH,
        y:
          GAME_OPTIONS.CANVAS_HEIGHT - GAME_OPTIONS.FLOOR_HEIGHT - BRICK_HEIGHT,
      },
      offset: { dx: -BRICK_SPEED, dy: 0 },
      size: { width: BRICK_WIDTH, height: BRICK_HEIGHT },
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
    ctx.fillStyle = 'gray'
    ctx.fill()
    ctx.closePath()
  }
}
