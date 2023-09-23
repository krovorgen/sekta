import { GAME_OPTIONS } from '../../../constants/game'
import Entity from '../Entity'

export default class Brick extends Entity {
  constructor() {
    super({
      position: {
        x: GAME_OPTIONS.CANVAS_WIDTH,
        y: GAME_OPTIONS.CANVAS_HEIGHT - GAME_OPTIONS.FLOOR_HEIGHT - 50,
      },
      offset: { dx: -150, dy: 0 },
      size: { width: 50, height: 50 },
    })
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
