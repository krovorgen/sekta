import { GAME_OPTIONS } from '../../../constants/game'
import Entity from '../Entity'

export default class Floor extends Entity {
  constructor() {
    super({
      position: {
        x: 0,
        y: GAME_OPTIONS.CANVAS_HEIGHT - GAME_OPTIONS.FLOOR_HEIGHT,
      },
      offset: { dx: 0, dy: 0 },
      size: {
        width: GAME_OPTIONS.CANVAS_WIDTH,
        height: GAME_OPTIONS.FLOOR_HEIGHT,
      },
    })
  }

  public draw(ctx: CanvasRenderingContext2D) {
    // ctx.beginPath()
    // ctx.rect(
    //   this.position.x,
    //   this.position.y,
    //   this.size.width,
    //   this.size.height
    // )
    // ctx.fillStyle = 'green'
    // ctx.stroke()
    // ctx.closePath()

    ctx.lineWidth = 3
    ctx.strokeStyle = 'red'
    ctx.strokeRect(
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    )
  }
}
