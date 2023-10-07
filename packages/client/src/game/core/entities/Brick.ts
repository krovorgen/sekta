import { GAME_OPTIONS, GAME_RESOURCES } from '../../../constants/game'
import Entity from '../Entity'
import AnimatedSprite from '../utils/AnimatedSprite'
import Resources from '../utils/Resources'

const { BRICK_WIDTH, BRICK_HEIGHT, BRICK_SPEED } = GAME_OPTIONS

export default class Brick extends Entity {
  sprite?: AnimatedSprite

  constructor(resources?: Resources) {
    super({
      position: {
        x: GAME_OPTIONS.CANVAS_WIDTH,
        y:
          GAME_OPTIONS.CANVAS_HEIGHT - GAME_OPTIONS.FLOOR_HEIGHT - BRICK_HEIGHT,
      },
      offset: { dx: -BRICK_SPEED, dy: 0 },
      size: { width: BRICK_WIDTH, height: BRICK_HEIGHT },
    })
    if (resources) {
      this.sprite = new AnimatedSprite({
        resource: resources.get(GAME_RESOURCES.SPEARS),
        mapPoint: { x: 0, y: 0 },
        frameSize: { height: 50, width: 50 },
        resultSize: { height: 50, width: 50 },
      })
    }
  }

  public update(dt: number) {
    this.position.x += this.offset.dx * dt
    this.position.y += this.offset.dy * dt
  }

  public draw(ctx: CanvasRenderingContext2D) {
    if (this.sprite) {
      this.sprite.render(ctx, this)
    } else {
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
}
